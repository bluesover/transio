import { useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { xml } from '@codemirror/lang-xml'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { EditorView } from '@codemirror/view'
import { editorThemes } from '@/lib/editor-themes'
import type { EditorTheme } from '@/lib/types'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: 'xml' | 'html' | 'javascript' | 'text'
  theme: EditorTheme
  readOnly?: boolean
  placeholder?: string
}

export function CodeEditor({
  value,
  onChange,
  language,
  theme,
  readOnly = false,
  placeholder
}: CodeEditorProps) {
  const handleChange = useCallback((val: string) => {
    onChange(val)
  }, [onChange])

  const getLanguageExtension = () => {
    switch (language) {
      case 'xml':
        return xml()
      case 'html':
        return html()
      case 'javascript':
        return javascript()
      case 'text':
      default:
        return []
    }
  }

  const extensions = [
    getLanguageExtension(),
    EditorView.lineWrapping,
    ...(editorThemes[theme] || editorThemes['vscode-dark'])
  ].flat()

  const getThemeBackground = () => {
    const themeBackgrounds: Record<string, string> = {
      'vscode-dark': '#1e1e1e',
      'github-dark': '#0d1117',
      'tokyo-night': '#1a1b26',
      'dracula': '#282a36',
      'monokai': '#272822',
      'solarized-dark': '#002b36',
      'nord': '#2e3440',
      'gruvbox-dark': '#282828',
      'material-dark': '#212121',
      'atom-one': '#282c34',
    }
    return themeBackgrounds[theme] || '#1e1e1e'
  }

  return (
    <div 
      className="h-full w-full overflow-hidden rounded-md border border-border/50"
      style={{ backgroundColor: getThemeBackground() }}
    >
      <CodeMirror
        value={value}
        onChange={handleChange}
        extensions={extensions}
        editable={!readOnly}
        placeholder={placeholder}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: true,
          dropCursor: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          syntaxHighlighting: true,
        }}
        className="text-sm font-mono h-full w-full codemirror-wrapper"
        style={{ 
          height: '100%', 
          width: '100%', 
          fontSize: '14px',
          backgroundColor: getThemeBackground(),
        }}
      />
    </div>
  )
}
