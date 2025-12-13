import type { XSLTVersion, TransformResult } from './types'

export function detectXSLTVersion(xslt: string): XSLTVersion {
  const match = xslt.match(/version=["'](\d+\.\d+)["']/)
  if (match) {
    if (match[1] === '3.0') return '3.0'
    if (match[1] === '2.0') return '2.0'
  }
  return '1.0'
}

function serializeResult(node: Node | DocumentFragment | null | undefined): string {
  if (!node) {
    console.warn('serializeResult: node is null or undefined')
    return ''
  }
  
  const serializer = new XMLSerializer()
  
  try {
    if ('nodeType' in node && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      let result = ''
      const fragment = node as DocumentFragment
      fragment.childNodes.forEach(child => {
        result += serializer.serializeToString(child)
      })
      return result
    }
    return serializer.serializeToString(node)
  } catch (error) {
    console.error('Serialization error:', error)
    return ''
  }
}

async function transformWithBrowser(xml: string, xslt: string): Promise<TransformResult> {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xml, 'text/xml')
    const xsltDoc = parser.parseFromString(xslt, 'text/xml')

    const xmlError = xmlDoc.querySelector('parsererror')
    if (xmlError) {
      return {
        success: false,
        output: '',
        error: `XML Parse Error: ${xmlError.textContent}`,
        processorUsed: 'Browser XSLTProcessor'
      }
    }

    const xsltError = xsltDoc.querySelector('parsererror')
    if (xsltError) {
      return {
        success: false,
        output: '',
        error: `XSLT Parse Error: ${xsltError.textContent}`,
        processorUsed: 'Browser XSLTProcessor'
      }
    }

    const processor = new XSLTProcessor()
    processor.importStylesheet(xsltDoc)
    const result = processor.transformToFragment(xmlDoc, document)
    
    if (!result) {
      return {
        success: false,
        output: '',
        error: 'Transformation failed: result is null. This may happen if the XSLT stylesheet is invalid or empty.',
        processorUsed: 'Browser XSLTProcessor'
      }
    }
    
    const output = serializeResult(result)

    return {
      success: true,
      output,
      processorUsed: 'Browser XSLTProcessor (XSLT 1.0)'
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'Unknown error',
      processorUsed: 'Browser XSLTProcessor'
    }
  }
}

async function transformWithSaxon(xml: string, xslt: string, version: XSLTVersion): Promise<TransformResult> {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xml, 'text/xml')
    const xsltDoc = parser.parseFromString(xslt, 'text/xml')

    const xmlError = xmlDoc.querySelector('parsererror')
    if (xmlError) {
      return {
        success: false,
        output: '',
        error: `XML Parse Error: ${xmlError.textContent}`,
        processorUsed: `Open Source XSLT ${version}`
      }
    }

    const xsltError = xsltDoc.querySelector('parsererror')
    if (xsltError) {
      return {
        success: false,
        output: '',
        error: `XSLT Parse Error: ${xsltError.textContent}`,
        processorUsed: `Open Source XSLT ${version}`
      }
    }

    console.log('Attempting XSLT transformation with version:', version)
    
    const SaxonJS = await import('saxon-js')
    
    if (!SaxonJS || typeof SaxonJS.transform !== 'function') {
      throw new Error('Saxon-JS module not properly loaded')
    }

    const transformOptions: any = {
      stylesheetNode: xsltDoc.documentElement,
      sourceNode: xmlDoc.documentElement,
      destination: 'serialized',
      stylesheetParams: {}
    }

    const result = await SaxonJS.transform(transformOptions, 'async')

    console.log('XSLT transformation result:', result)

    if (result && typeof result === 'object' && 'principalResult' in result) {
      const output = result.principalResult
      if (typeof output === 'string' && output.length > 0) {
        return {
          success: true,
          output,
          processorUsed: `Saxon-JS (XSLT ${version})`
        }
      }
    }

    return {
      success: false,
      output: '',
      error: `XSLT ${version} transformation completed but produced no output.\n\n` +
        `This can happen when:\n` +
        `- The stylesheet has no matching templates\n` +
        `- XSLT ${version} features are not fully supported in browser\n` +
        `- The output method or result structure is incompatible\n\n` +
        `Try using XSLT 1.0 for guaranteed browser compatibility.`,
      processorUsed: `Saxon-JS (XSLT ${version})`
    }
  } catch (error) {
    console.error('XSLT transformation error:', error)
    
    let errorMessage = 'XSLT transformation failed'
    
    if (error instanceof Error) {
      errorMessage = error.message
      
      if (errorMessage.includes('abstractNode') || errorMessage.includes('nodeType')) {
        errorMessage = `XSLT ${version} Browser Limitation:\n\n` +
          `The browser's XSLT processor encountered an internal error processing advanced XSLT ${version} features. ` +
          `Saxon-JS has limited support for direct stylesheet transformation in browsers.\n\n` +
          `📌 RECOMMENDED SOLUTIONS:\n\n` +
          `1. Use XSLT 1.0 (fully supported in all browsers)\n` +
          `2. Simplify XSLT ${version} features (avoid complex XPath expressions)\n` +
          `3. For production: Pre-compile stylesheets to SEF format\n\n` +
          `Technical error: ${error.message}`
      } else if (errorMessage.includes('stylesheetNode') || errorMessage.includes('sourceNode')) {
        errorMessage = `Saxon-JS Configuration Error:\n\n` +
          `Unable to initialize XSLT ${version} transformation. ` +
          `The stylesheet or source document structure is incompatible with Saxon-JS browser mode.\n\n` +
          `For XSLT ${version}/3.0 features, Saxon-JS requires:\n` +
          `- Pre-compiled SEF (Saxon Executable Format) files\n` +
          `- Server-side compilation with Saxon EE\n\n` +
          `Alternative: Use XSLT 1.0 for direct browser transformation.\n\n` +
          `Error details: ${error.message}`
      }
    }
    
    return {
      success: false,
      output: '',
      error: errorMessage,
      processorUsed: `Saxon-JS (XSLT ${version})`
    }
  }
}

export async function transformXML(
  xml: string,
  xslt: string,
  version: XSLTVersion
): Promise<TransformResult> {
  const startTime = performance.now()

  if (!xml.trim()) {
    return {
      success: false,
      output: '',
      error: 'XML input is required',
      processorUsed: 'None'
    }
  }

  if (!xslt.trim()) {
    return {
      success: false,
      output: '',
      error: 'XSLT input is required',
      processorUsed: 'None'
    }
  }

  let result: TransformResult

  if (version === '1.0') {
    result = await transformWithBrowser(xml, xslt)
  } else {
    result = await transformWithSaxon(xml, xslt, version)
  }

  const duration = performance.now() - startTime
  return { ...result, duration }
}

export function validateXML(xml: string): { valid: boolean; error?: string; line?: number } {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'text/xml')
    const error = doc.querySelector('parsererror')
    
    if (error) {
      const errorText = error.textContent || ''
      const lineMatch = errorText.match(/line (\d+)/i)
      return {
        valid: false,
        error: errorText,
        line: lineMatch ? parseInt(lineMatch[1], 10) : undefined
      }
    }
    
    return { valid: true }
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown validation error'
    }
  }
}

export function formatXML(xml: string): string {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'text/xml')
    const serializer = new XMLSerializer()
    const xmlStr = serializer.serializeToString(doc)
    
    let formatted = ''
    let indent = 0
    const tab = '  '
    
    xmlStr.split(/>\s*</).forEach((node) => {
      if (node.match(/^\/\w/)) indent--
      formatted += tab.repeat(indent) + '<' + node + '>\n'
      if (node.match(/^<?\w[^>]*[^\/]$/)) indent++
    })
    
    return formatted.substring(1, formatted.length - 2)
  } catch {
    return xml
  }
}
