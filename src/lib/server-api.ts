import type { XSLTVersion, TransformResult, ServerConfig } from './types'

export async function transformViaServer(
  xml: string,
  xslt: string,
  version: XSLTVersion,
  serverConfig: ServerConfig
): Promise<TransformResult> {
  const startTime = performance.now()
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), serverConfig.timeout)

    const response = await fetch(`${serverConfig.apiUrl}/transform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(serverConfig.apiKey && { 'X-API-Key': serverConfig.apiKey })
      },
      body: JSON.stringify({ xml, xslt, version }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Server error: ${response.statusText}`)
    }

    const data = await response.json()
    
    return {
      success: data.success,
      output: data.output || '',
      error: data.error,
      duration: performance.now() - startTime,
      processorUsed: data.processor || 'Saxon-HE Server'
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Server transformation timed out after ${serverConfig.timeout}ms`)
      }
      throw new Error(`Server transformation failed: ${error.message}`)
    }
    throw new Error('Server transformation failed: Unknown error')
  }
}

export async function checkServerHealth(apiUrl: string, apiKey?: string): Promise<{ 
  available: boolean
  version?: string
  processor?: string
  error?: string
}> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(`${apiUrl}/health`, {
      method: 'GET',
      headers: {
        ...(apiKey && { 'X-API-Key': apiKey })
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return {
        available: false,
        error: `Server returned ${response.status}`
      }
    }

    const data = await response.json()
    
    return {
      available: true,
      version: data.version,
      processor: data.processor
    }
  } catch (error) {
    return {
      available: false,
      error: error instanceof Error ? error.message : 'Connection failed'
    }
  }
}
