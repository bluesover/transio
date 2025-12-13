import type { XSLTVersion, TransformResult } from './types'

export function detectXSLTVersion(xslt: string): XSLTVersion {
  const match = xslt.match(/version=["'](\d+\.\d+)["']/)
  if (match) {
    if (match[1] === '3.0') return '3.0'
    if (match[1] === '2.0') return '2.0'
  }
  return '1.0'
}

function serializeResult(node: Node | DocumentFragment | null): string {
  if (!node) {
    console.warn('serializeResult: node is null or undefined')
    return ''
  }
  
  const serializer = new XMLSerializer()
  
  try {
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
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
    const SaxonJS = await import('saxon-js')
    
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xml, 'text/xml')
    const xsltDoc = parser.parseFromString(xslt, 'text/xml')

    const xmlError = xmlDoc.querySelector('parsererror')
    if (xmlError) {
      return {
        success: false,
        output: '',
        error: `XML Parse Error: ${xmlError.textContent}`,
        processorUsed: `Saxon-JS (XSLT ${version})`
      }
    }

    const xsltError = xsltDoc.querySelector('parsererror')
    if (xsltError) {
      return {
        success: false,
        output: '',
        error: `XSLT Parse Error: ${xsltError.textContent}`,
        processorUsed: `Saxon-JS (XSLT ${version})`
      }
    }

    console.log('Attempting Saxon-JS transformation with version:', version)
    
    const result = await SaxonJS.transform({
      stylesheetNode: xsltDoc,
      sourceNode: xmlDoc,
      destination: 'serialized',
      stylesheetParams: {},
      deliverResultDocument: (uri: string) => {
        console.log('Result document URI:', uri)
        return undefined
      }
    }, 'async')

    console.log('Saxon-JS result:', result)

    if (!result || !result.principalResult) {
      return {
        success: false,
        output: '',
        error: `Saxon-JS transformation completed but returned no result. This can happen with XSLT ${version} stylesheets that don't produce output, or if Saxon-JS couldn't compile the stylesheet.`,
        processorUsed: `Saxon-JS (XSLT ${version})`
      }
    }

    return {
      success: true,
      output: result.principalResult,
      processorUsed: `Saxon-JS (XSLT ${version})`
    }
  } catch (error) {
    let errorMessage = 'Saxon-JS transformation failed'
    
    if (error instanceof Error) {
      errorMessage = error.message
      
      if (errorMessage.includes('stylesheetNode') || errorMessage.includes('not supported')) {
        errorMessage = `Saxon-JS Error: Unable to process XSLT ${version} stylesheet directly in the browser.\n\n` +
          `Limitation: Saxon-JS requires stylesheets to be pre-compiled into SEF (Saxon Executable Format) for full XSLT ${version} support. ` +
          `The browser version has limited support for direct stylesheet transformation.\n\n` +
          `Suggestions:\n` +
          `- Use XSLT 1.0 for direct browser transformation\n` +
          `- Pre-compile your XSLT ${version} stylesheet to SEF format using Saxon EE\n` +
          `- Use simpler XSLT ${version} constructs that Saxon-JS can handle\n\n` +
          `Original error: ${error.message}`
      }
    }
    
    console.error('Saxon-JS transformation error:', error)
    
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
