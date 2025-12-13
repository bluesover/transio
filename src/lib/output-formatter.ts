export type OutputLanguage = 'xml' | 'html' | 'json' | 'text' | 'csv' | 'svg'

export function detectOutputLanguage(output: string): OutputLanguage {
  if (!output || !output.trim()) {
    return 'text'
  }

  const trimmed = output.trim()

  if (trimmed.startsWith('<!DOCTYPE html') || 
      trimmed.startsWith('<html') || 
      /<html[\s>]/i.test(trimmed) ||
      /<body[\s>]/i.test(trimmed) ||
      /<head[\s>]/i.test(trimmed)) {
    return 'html'
  }

  if (trimmed.startsWith('<svg') || /<svg[\s>]/i.test(trimmed)) {
    return 'svg'
  }

  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || 
      (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    try {
      JSON.parse(trimmed)
      return 'json'
    } catch {
    }
  }

  if (trimmed.includes(',') && 
      (trimmed.includes('\n') || trimmed.includes('\r')) &&
      !trimmed.startsWith('<')) {
    const lines = trimmed.split(/\r?\n/)
    if (lines.length > 1) {
      const firstLine = lines[0]
      const commaCount = (firstLine.match(/,/g) || []).length
      if (commaCount > 0 && commaCount === (lines[1]?.match(/,/g) || []).length) {
        return 'csv'
      }
    }
  }

  if (trimmed.startsWith('<?xml') || 
      trimmed.startsWith('<') && trimmed.includes('xmlns') ||
      (trimmed.startsWith('<') && !trimmed.match(/<(html|body|head|div|span|p|a|img|script|style)/i))) {
    return 'xml'
  }

  if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
    return 'html'
  }

  return 'text'
}

export function formatOutput(output: string, language?: OutputLanguage): string {
  if (!output || !output.trim()) {
    return output
  }

  const detectedLanguage = language || detectOutputLanguage(output)

  switch (detectedLanguage) {
    case 'xml':
    case 'svg':
      return formatXMLOutput(output)
    case 'html':
      return formatHTMLOutput(output)
    case 'json':
      return formatJSONOutput(output)
    case 'csv':
      return formatCSVOutput(output)
    case 'text':
    default:
      return output.trim()
  }
}

function formatXMLOutput(xml: string): string {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'text/xml')
    
    const error = doc.querySelector('parsererror')
    if (error) {
      return xml
    }
    
    return formatXMLNode(doc, 0)
  } catch {
    return xml
  }
}

function formatXMLNode(node: Node, depth: number): string {
  const indent = '  '.repeat(depth)
  const nextIndent = '  '.repeat(depth + 1)

  if (node.nodeType === Node.DOCUMENT_NODE) {
    const doc = node as Document
    let result = ''
    
    const xmlDeclaration = (doc as any).xmlVersion
    if (xmlDeclaration) {
      result += `<?xml version="${(doc as any).xmlVersion}"${(doc as any).xmlEncoding ? ` encoding="${(doc as any).xmlEncoding}"` : ''}?>\n`
    }
    
    doc.childNodes.forEach(child => {
      if (child.nodeType !== Node.DOCUMENT_TYPE_NODE) {
        result += formatXMLNode(child, depth)
      }
    })
    
    return result
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element
    const tagName = element.tagName
    const attributes = Array.from(element.attributes)
      .map(attr => ` ${attr.name}="${attr.value}"`)
      .join('')

    if (element.childNodes.length === 0) {
      return `${indent}<${tagName}${attributes} />\n`
    }

    if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
      const text = element.textContent?.trim() || ''
      if (text.length < 60 && !text.includes('\n')) {
        return `${indent}<${tagName}${attributes}>${text}</${tagName}>\n`
      }
    }

    let result = `${indent}<${tagName}${attributes}>\n`
    
    element.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent?.trim()
        if (text) {
          result += `${nextIndent}${text}\n`
        }
      } else {
        result += formatXMLNode(child, depth + 1)
      }
    })
    
    result += `${indent}</${tagName}>\n`
    return result
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim()
    return text ? `${indent}${text}\n` : ''
  }

  if (node.nodeType === Node.COMMENT_NODE) {
    return `${indent}<!-- ${node.textContent} -->\n`
  }

  return ''
}

function formatHTMLOutput(html: string): string {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    let result = ''
    
    if (html.trim().startsWith('<!DOCTYPE')) {
      result += '<!DOCTYPE html>\n'
    }
    
    doc.childNodes.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        result += formatHTMLNode(child as Element, 0)
      }
    })
    
    return result || formatXMLOutput(html)
  } catch {
    return formatXMLOutput(html)
  }
}

function formatHTMLNode(element: Element, depth: number): string {
  const indent = '  '.repeat(depth)
  const nextIndent = '  '.repeat(depth + 1)
  const tagName = element.tagName.toLowerCase()
  
  const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']
  const inlineElements = ['a', 'abbr', 'b', 'bdi', 'bdo', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var']

  const attributes = Array.from(element.attributes)
    .map(attr => ` ${attr.name}="${attr.value}"`)
    .join('')

  if (voidElements.includes(tagName)) {
    return `${indent}<${tagName}${attributes}>\n`
  }

  if (element.childNodes.length === 0) {
    return `${indent}<${tagName}${attributes}></${tagName}>\n`
  }

  if (inlineElements.includes(tagName) && element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
    const text = element.textContent || ''
    return `${indent}<${tagName}${attributes}>${text}</${tagName}>\n`
  }

  let result = `${indent}<${tagName}${attributes}>\n`
  
  element.childNodes.forEach(child => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      result += formatHTMLNode(child as Element, depth + 1)
    } else if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent?.trim()
      if (text) {
        result += `${nextIndent}${text}\n`
      }
    } else if (child.nodeType === Node.COMMENT_NODE) {
      result += `${nextIndent}<!-- ${child.textContent} -->\n`
    }
  })
  
  result += `${indent}</${tagName}>\n`
  return result
}

function formatJSONOutput(json: string): string {
  try {
    const parsed = JSON.parse(json)
    return JSON.stringify(parsed, null, 2)
  } catch {
    return json
  }
}

function formatCSVOutput(csv: string): string {
  const lines = csv.split(/\r?\n/).filter(line => line.trim())
  
  if (lines.length === 0) {
    return csv
  }

  const processedLines = lines.map(line => {
    const values = line.split(',').map(val => val.trim())
    return values.join(', ')
  })

  return processedLines.join('\n')
}

export function getLanguageForCodeMirror(language: OutputLanguage): 'xml' | 'html' | 'javascript' | 'text' {
  switch (language) {
    case 'xml':
    case 'svg':
      return 'xml'
    case 'html':
      return 'html'
    case 'json':
      return 'javascript'
    case 'csv':
    case 'text':
    default:
      return 'text'
  }
}
