export type XSLTVersion = '1.0' | '2.0' | '3.0'

export type OutputLanguage = 'xml' | 'html' | 'json' | 'text' | 'csv' | 'svg'

export interface TransformVersion {
  id: string
  version: string
  description: string
  xml: string
  xslt: string
  xsltVersion: XSLTVersion
  createdAt: number
  isReleased: boolean
  releaseNotes?: string
}

export interface TransformResult {
  success: boolean
  output: string
  error?: string
  processorUsed: string
  duration?: number
}

export interface ActivityLogEntry {
  id: string
  timestamp: number
  type: 'transform' | 'save' | 'load' | 'delete' | 'release' | 'import' | 'export' | 'format' | 'error' | 'settings'
  message: string
  details?: string
}

export interface XSLTSnippet {
  id: string
  title: string
  description: string
  category: 'boilerplate' | 'templates' | 'instructions' | 'loops' | 'conditionals' | 'variables' | 'patterns'
  xsltVersion: XSLTVersion[]
  code: string
}

export type EditorTheme = 'vscode-dark' | 'vscode-light' | 'github-dark' | 'github-light' | 'tokyo-night' | 'dracula' | 'monokai' | 'solarized-dark' | 'solarized-light' | 'nord' | 'gruvbox-dark' | 'material-dark' | 'atom-one'

export interface ServerConfig {
  enabled: boolean
  apiUrl: string
  apiKey?: string
  timeout: number
  preferServer: boolean
}

export interface TransformOptions {
  useServer?: boolean
  timeout?: number
}
