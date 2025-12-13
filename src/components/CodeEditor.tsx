import { useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { xml } from '@codemirror/lang-xml'
import { html } from '@codemirror/lang-html'
import { EditorView } from '@codemirror/view'
import { editorThemes } from '@/lib/editor-themes'
import type { EditorTheme } from '@/lib/types'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: 'xml' | 'html'
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

  const extensions = [
    language === 'xml' ? xml() : html(),
    EditorView.lineWrapping,
    ...(editorThemes[theme] || editorThemes['vscode-dark'])
  ]

  return (
    <div className="h-full w-full overflow-auto rounded-md border border-border/50 bg-transparent">
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
        style={{ height: '100%', width: '100%', fontSize: '14px' }}
      />
    </div>
  )
}
