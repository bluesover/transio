import { Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

const createTheme = (config: {
  background: string
  foreground: string
  selection: string
  cursor: string
  lineHighlight: string
}) => {
  return EditorView.theme({
    '&': {
      backgroundColor: config.background,
      color: config.foreground,
    },
    '.cm-content': {
      caretColor: config.cursor,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: config.cursor,
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
      backgroundColor: config.selection,
    },
    '.cm-activeLine': {
      backgroundColor: config.lineHighlight,
    },
    '.cm-gutters': {
      backgroundColor: config.background,
      color: config.foreground + '80',
      border: 'none',
    },
  })
}

const vscodeDark = createTheme({
  background: '#1e1e1e',
  foreground: '#d4d4d4',
  selection: '#264f78',
  cursor: '#aeafad',
  lineHighlight: '#2a2a2a',
})

const vscodeDarkHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#569cd6' },
  { tag: tags.tagName, color: '#4ec9b0' },
  { tag: tags.attributeName, color: '#9cdcfe' },
  { tag: tags.string, color: '#ce9178' },
  { tag: tags.comment, color: '#6a9955' },
  { tag: tags.bracket, color: '#ffd700' },
  { tag: tags.punctuation, color: '#d4d4d4' },
  { tag: tags.content, color: '#d4d4d4' },
  { tag: tags.literal, color: '#ce9178' },
  { tag: tags.name, color: '#9cdcfe' },
])

const githubDark = createTheme({
  background: '#0d1117',
  foreground: '#c9d1d9',
  selection: '#1f3d70',
  cursor: '#c9d1d9',
  lineHighlight: '#161b22',
})

const githubDarkHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#ff7b72' },
  { tag: tags.tagName, color: '#7ee787' },
  { tag: tags.attributeName, color: '#79c0ff' },
  { tag: tags.string, color: '#a5d6ff' },
  { tag: tags.comment, color: '#8b949e' },
  { tag: tags.bracket, color: '#ffa657' },
  { tag: tags.punctuation, color: '#c9d1d9' },
  { tag: tags.content, color: '#c9d1d9' },
  { tag: tags.literal, color: '#a5d6ff' },
  { tag: tags.name, color: '#79c0ff' },
])

const tokyoNight = createTheme({
  background: '#1a1b26',
  foreground: '#a9b1d6',
  selection: '#364a82',
  cursor: '#c0caf5',
  lineHighlight: '#24283b',
})

const tokyoNightHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#bb9af7' },
  { tag: tags.tagName, color: '#7dcfff' },
  { tag: tags.attributeName, color: '#73daca' },
  { tag: tags.string, color: '#9ece6a' },
  { tag: tags.comment, color: '#565f89' },
  { tag: tags.bracket, color: '#ff9e64' },
  { tag: tags.punctuation, color: '#a9b1d6' },
  { tag: tags.content, color: '#a9b1d6' },
  { tag: tags.literal, color: '#9ece6a' },
  { tag: tags.name, color: '#73daca' },
])

const dracula = createTheme({
  background: '#282a36',
  foreground: '#f8f8f2',
  selection: '#44475a',
  cursor: '#f8f8f0',
  lineHighlight: '#44475a',
})

const draculaHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#ff79c6' },
  { tag: tags.tagName, color: '#8be9fd' },
  { tag: tags.attributeName, color: '#50fa7b' },
  { tag: tags.string, color: '#f1fa8c' },
  { tag: tags.comment, color: '#6272a4' },
  { tag: tags.bracket, color: '#ffb86c' },
  { tag: tags.punctuation, color: '#f8f8f2' },
  { tag: tags.content, color: '#f8f8f2' },
  { tag: tags.literal, color: '#f1fa8c' },
  { tag: tags.name, color: '#50fa7b' },
])

const monokai = createTheme({
  background: '#272822',
  foreground: '#f8f8f2',
  selection: '#49483e',
  cursor: '#f8f8f0',
  lineHighlight: '#3e3d32',
})

const monokaiHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#f92672' },
  { tag: tags.tagName, color: '#a6e22e' },
  { tag: tags.attributeName, color: '#66d9ef' },
  { tag: tags.string, color: '#e6db74' },
  { tag: tags.comment, color: '#75715e' },
  { tag: tags.bracket, color: '#fd971f' },
  { tag: tags.punctuation, color: '#f8f8f2' },
  { tag: tags.content, color: '#f8f8f2' },
  { tag: tags.literal, color: '#e6db74' },
  { tag: tags.name, color: '#66d9ef' },
])

const solarizedDark = createTheme({
  background: '#002b36',
  foreground: '#839496',
  selection: '#073642',
  cursor: '#839496',
  lineHighlight: '#073642',
})

const solarizedDarkHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#268bd2' },
  { tag: tags.tagName, color: '#859900' },
  { tag: tags.attributeName, color: '#b58900' },
  { tag: tags.string, color: '#2aa198' },
  { tag: tags.comment, color: '#586e75' },
  { tag: tags.bracket, color: '#cb4b16' },
  { tag: tags.punctuation, color: '#839496' },
  { tag: tags.content, color: '#839496' },
  { tag: tags.literal, color: '#2aa198' },
  { tag: tags.name, color: '#b58900' },
])

const nord = createTheme({
  background: '#2e3440',
  foreground: '#d8dee9',
  selection: '#3b4252',
  cursor: '#d8dee9',
  lineHighlight: '#3b4252',
})

const nordHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#81a1c1' },
  { tag: tags.tagName, color: '#8fbcbb' },
  { tag: tags.attributeName, color: '#88c0d0' },
  { tag: tags.string, color: '#a3be8c' },
  { tag: tags.comment, color: '#616e88' },
  { tag: tags.bracket, color: '#d08770' },
  { tag: tags.punctuation, color: '#d8dee9' },
  { tag: tags.content, color: '#d8dee9' },
  { tag: tags.literal, color: '#a3be8c' },
  { tag: tags.name, color: '#88c0d0' },
])

const gruvboxDark = createTheme({
  background: '#282828',
  foreground: '#ebdbb2',
  selection: '#3c3836',
  cursor: '#ebdbb2',
  lineHighlight: '#3c3836',
})

const gruvboxDarkHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#fb4934' },
  { tag: tags.tagName, color: '#b8bb26' },
  { tag: tags.attributeName, color: '#fabd2f' },
  { tag: tags.string, color: '#b8bb26' },
  { tag: tags.comment, color: '#928374' },
  { tag: tags.bracket, color: '#fe8019' },
  { tag: tags.punctuation, color: '#ebdbb2' },
  { tag: tags.content, color: '#ebdbb2' },
  { tag: tags.literal, color: '#b8bb26' },
  { tag: tags.name, color: '#fabd2f' },
])

const materialDark = createTheme({
  background: '#212121',
  foreground: '#eeffff',
  selection: '#61616150',
  cursor: '#ffcc00',
  lineHighlight: '#00000050',
})

const materialDarkHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#c792ea' },
  { tag: tags.tagName, color: '#f07178' },
  { tag: tags.attributeName, color: '#c3e88d' },
  { tag: tags.string, color: '#c3e88d' },
  { tag: tags.comment, color: '#546e7a' },
  { tag: tags.bracket, color: '#89ddff' },
  { tag: tags.punctuation, color: '#eeffff' },
  { tag: tags.content, color: '#eeffff' },
  { tag: tags.literal, color: '#c3e88d' },
  { tag: tags.name, color: '#c3e88d' },
])

const atomOne = createTheme({
  background: '#282c34',
  foreground: '#abb2bf',
  selection: '#3e4451',
  cursor: '#528bff',
  lineHighlight: '#2c313c',
})

const atomOneHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#c678dd' },
  { tag: tags.tagName, color: '#e06c75' },
  { tag: tags.attributeName, color: '#d19a66' },
  { tag: tags.string, color: '#98c379' },
  { tag: tags.comment, color: '#5c6370' },
  { tag: tags.bracket, color: '#61afef' },
  { tag: tags.punctuation, color: '#abb2bf' },
  { tag: tags.content, color: '#abb2bf' },
  { tag: tags.literal, color: '#98c379' },
  { tag: tags.name, color: '#d19a66' },
])

export const editorThemes: Record<string, Extension[]> = {
  'vscode-dark': [vscodeDark, syntaxHighlighting(vscodeDarkHighlight)],
  'github-dark': [githubDark, syntaxHighlighting(githubDarkHighlight)],
  'tokyo-night': [tokyoNight, syntaxHighlighting(tokyoNightHighlight)],
  'dracula': [dracula, syntaxHighlighting(draculaHighlight)],
  'monokai': [monokai, syntaxHighlighting(monokaiHighlight)],
  'solarized-dark': [solarizedDark, syntaxHighlighting(solarizedDarkHighlight)],
  'nord': [nord, syntaxHighlighting(nordHighlight)],
  'gruvbox-dark': [gruvboxDark, syntaxHighlighting(gruvboxDarkHighlight)],
  'material-dark': [materialDark, syntaxHighlighting(materialDarkHighlight)],
  'atom-one': [atomOne, syntaxHighlighting(atomOneHighlight)],
}

export const themeNames: Record<string, string> = {
  'vscode-dark': 'VS Code Dark',
  'github-dark': 'GitHub Dark',
  'tokyo-night': 'Tokyo Night',
  'dracula': 'Dracula',
  'monokai': 'Monokai',
  'solarized-dark': 'Solarized Dark',
  'nord': 'Nord',
  'gruvbox-dark': 'Gruvbox Dark',
  'material-dark': 'Material Dark',
  'atom-one': 'Atom One',
}
