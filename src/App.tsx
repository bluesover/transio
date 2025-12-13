import { useState, useEffect, useCallback, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { toast, Toaster } from 'sonner'
import { Lightning, FloppyDisk, Folder, Code, Question, Moon, Sun, TextIndent, DownloadSimple, GitBranch, CaretLeft, CaretRight, FileCsv, RocketLaunch } from '@phosphor-icons/react'
import { CodeEditor } from './components/CodeEditor'
import { VersionPanel } from './components/VersionPanel'
import { SnippetsSheet } from './components/SnippetsSheet'
import { ActivityLog } from './components/ActivityLog'
import { SaveVersionDialog } from './components/SaveVersionDialog'
import { KeyboardShortcutsDialog } from './components/KeyboardShortcutsDialog'
import { DonationDialog } from './components/DonationDialog'
import { DeployInfoDialog } from './components/DeployInfoDialog'
import { AboutDialog } from './components/AboutDialog'
import { FooterInfo } from './components/FooterInfo'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Card } from './components/ui/card'
import { useIsMobile } from './hooks/use-mobile'
import { useKeyboardShortcuts } from './hooks/use-keyboard-shortcuts'
import { useFileSystem } from './hooks/use-file-system'
import { transformXML, detectXSLTVersion, formatXML } from './lib/xslt-processor'
import { themeNames } from './lib/editor-themes'
import { sampleXML, sampleXSLT } from './lib/sample-data'
import type { XSLTVersion, EditorTheme, TransformVersion, ActivityLogEntry, TransformResult } from './lib/types'

function App() {
  const isMobile = useIsMobile()
  
  const [xmlInput, setXmlInput] = useKV('xml-input', sampleXML)
  const [xsltInput, setXsltInput] = useKV('xslt-input', sampleXSLT)
  const [output, setOutput] = useState('')
  const [xsltVersion, setXsltVersion] = useKV<XSLTVersion>('xslt-version', '1.0')
  const [editorTheme, setEditorTheme] = useKV<EditorTheme>('editor-theme', 'vscode-dark')
  const [appTheme, setAppTheme] = useKV<'light' | 'dark' | 'black'>('app-theme', 'dark')
  const [versions, setVersions] = useKV<TransformVersion[]>('xslt-versions', [])
  const [activityLog, setActivityLog] = useKV<ActivityLogEntry[]>('activity-log', [])
  const [sidebarOpen, setSidebarOpen] = useKV<boolean>('sidebar-open', true)

  const safeXmlInput = xmlInput || sampleXML
  const safeXsltInput = xsltInput || sampleXSLT
  const safeXsltVersion = xsltVersion || '1.0'
  const safeEditorTheme = editorTheme || 'vscode-dark'
  const safeAppTheme = appTheme || 'dark'
  const safeVersions = versions || []
  const safeActivityLog = activityLog || []
  const safeSidebarOpen = sidebarOpen ?? true
  
  const [isTransforming, setIsTransforming] = useState(false)
  const [lastResult, setLastResult] = useState<TransformResult | null>(null)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [snippetsOpen, setSnippetsOpen] = useState(false)
  const [helpDialogOpen, setHelpDialogOpen] = useState(false)
  
  const {
    folderHandle,
    folderName,
    selectFolder,
    saveCurrentFiles,
    saveVersionFiles,
    saveMetadata,
    loadProject,
    exportToCSV,
    generateLaunchers
  } = useFileSystem()

  const addLogEntry = useCallback((type: ActivityLogEntry['type'], message: string, details?: string) => {
    const entry: ActivityLogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      timestamp: Date.now(),
      type,
      message,
      details
    }
    setActivityLog(current => [entry, ...(current || [])].slice(0, 100))
  }, [setActivityLog])

  useEffect(() => {
    const detected = detectXSLTVersion(safeXsltInput)
    if (detected !== safeXsltVersion) {
      setXsltVersion(detected)
    }
  }, [safeXsltInput, safeXsltVersion, setXsltVersion])

  useEffect(() => {
    if (!folderHandle) return
    
    const timer = setTimeout(() => {
      saveCurrentFiles(folderHandle, safeXmlInput, safeXsltInput)
        .then(() => {
          addLogEntry('save', 'Auto-saved current files to project folder')
        })
        .catch(err => {
          console.error('Auto-save failed:', err)
        })
    }, 1000)

    return () => clearTimeout(timer)
  }, [safeXmlInput, safeXsltInput, folderHandle, saveCurrentFiles, addLogEntry])

  const handleTransform = useCallback(async () => {
    if (isTransforming) return

    setIsTransforming(true)
    addLogEntry('transform', `Starting transformation with XSLT ${safeXsltVersion}`)

    try {
      const result = await transformXML(safeXmlInput, safeXsltInput, safeXsltVersion)
      setLastResult(result)

      if (result.success) {
        setOutput(result.output)
        toast.success(`Transformation successful (${result.duration?.toFixed(0)}ms)`)
        addLogEntry('transform', `Transformation successful using ${result.processorUsed}`, `Duration: ${result.duration?.toFixed(0)}ms`)
      } else {
        setOutput('')
        toast.error('Transformation failed')
        addLogEntry('error', 'Transformation failed', result.error)
      }
    } catch (error) {
      toast.error('Transformation error')
      addLogEntry('error', 'Transformation error', error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsTransforming(false)
    }
  }, [safeXmlInput, safeXsltInput, safeXsltVersion, isTransforming, addLogEntry])

  const handleSaveVersion = useCallback((version: string, description: string) => {
    const newVersion: TransformVersion = {
      id: `v-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      version,
      description,
      xml: safeXmlInput,
      xslt: safeXsltInput,
      xsltVersion: safeXsltVersion,
      createdAt: Date.now(),
      isReleased: false
    }

    setVersions(current => [...(current || []), newVersion])
    
    if (folderHandle) {
      saveVersionFiles(folderHandle, newVersion)
        .then(() => saveMetadata(folderHandle, [...safeVersions, newVersion]))
        .catch(err => console.error('Failed to save version files:', err))
    }

    toast.success(`Version ${version} saved`)
    addLogEntry('save', `Saved version ${version}`, description)
    setSaveDialogOpen(false)
  }, [safeXmlInput, safeXsltInput, safeXsltVersion, setVersions, folderHandle, saveVersionFiles, saveMetadata, safeVersions, addLogEntry])

  const handleLoadVersion = useCallback((version: TransformVersion) => {
    setXmlInput(version.xml)
    setXsltInput(version.xslt)
    setXsltVersion(version.xsltVersion)
    toast.success(`Loaded version ${version.version}`)
    addLogEntry('load', `Loaded version ${version.version}`)
  }, [setXmlInput, setXsltInput, setXsltVersion, addLogEntry])

  const handleDeleteVersion = useCallback((versionId: string) => {
    const version = safeVersions.find(v => v.id === versionId)
    setVersions(current => (current || []).filter(v => v.id !== versionId))
    
    if (folderHandle && version) {
      saveMetadata(folderHandle, safeVersions.filter(v => v.id !== versionId))
        .catch(err => console.error('Failed to update metadata:', err))
    }

    toast.success('Version deleted')
    addLogEntry('delete', `Deleted version ${version?.version}`)
  }, [safeVersions, setVersions, folderHandle, saveMetadata, addLogEntry])

  const handleReleaseVersion = useCallback((versionId: string, releaseNotes: string) => {
    setVersions(current => (current || []).map(v =>
      v.id === versionId ? { ...v, isReleased: true, releaseNotes } : v
    ))
    
    const version = safeVersions.find(v => v.id === versionId)
    if (folderHandle && version) {
      const updatedVersions = safeVersions.map(v =>
        v.id === versionId ? { ...v, isReleased: true, releaseNotes } : v
      )
      saveMetadata(folderHandle, updatedVersions)
        .catch(err => console.error('Failed to update metadata:', err))
    }

    toast.success('Version released')
    addLogEntry('release', `Released version ${version?.version}`, releaseNotes)
  }, [safeVersions, setVersions, folderHandle, saveMetadata, addLogEntry])

  const handleFormatXML = useCallback(() => {
    const formatted = formatXML(safeXmlInput)
    setXmlInput(formatted)
    toast.success('XML formatted')
    addLogEntry('format', 'Formatted XML')
  }, [safeXmlInput, setXmlInput, addLogEntry])

  const handleFormatXSLT = useCallback(() => {
    const formatted = formatXML(safeXsltInput)
    setXsltInput(formatted)
    toast.success('XSLT formatted')
    addLogEntry('format', 'Formatted XSLT')
  }, [safeXsltInput, setXsltInput, addLogEntry])

  const handleImportXML = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.xml'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setXmlInput(content)
          toast.success('XML imported')
          addLogEntry('import', `Imported ${file.name}`)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }, [setXmlInput, addLogEntry])

  const handleImportXSLT = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.xsl,.xslt'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setXsltInput(content)
          toast.success('XSLT imported')
          addLogEntry('import', `Imported ${file.name}`)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }, [setXsltInput, addLogEntry])

  const handleImportOutput = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.html,.htm,.xml'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setOutput(content)
          toast.success('Output imported')
          addLogEntry('import', `Imported ${file.name}`)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }, [addLogEntry])

  const handleSelectFolder = useCallback(async () => {
    try {
      const handle = await selectFolder()
      if (handle) {
        const project = await loadProject(handle)
        if (project.xml) setXmlInput(project.xml)
        if (project.xslt) setXsltInput(project.xslt)
        if (project.versions.length > 0) {
          setVersions(project.versions)
        }
        toast.success(`Project loaded from ${handle.name}`)
        addLogEntry('load', `Loaded project from folder: ${handle.name}`)
      }
    } catch (error) {
      toast.error((error as Error).message || 'Failed to select folder')
    }
  }, [selectFolder, loadProject, setXmlInput, setXsltInput, setVersions, addLogEntry])

  const handleInsertSnippet = useCallback((code: string) => {
    setXsltInput(code)
    setSnippetsOpen(false)
    toast.success('Snippet inserted')
    addLogEntry('import', 'Inserted XSLT snippet')
  }, [setXsltInput, addLogEntry])

  const handleExportCSV = useCallback(async () => {
    if (!folderHandle) {
      toast.error('Please select a project folder first')
      return
    }

    try {
      await exportToCSV(folderHandle, safeVersions)
      toast.success('Project exported to CSV')
      addLogEntry('export', 'Exported project data to project-export.csv')
    } catch (error) {
      toast.error('Failed to export CSV')
      console.error('CSV export error:', error)
    }
  }, [folderHandle, safeVersions, exportToCSV, addLogEntry])

  const handleGenerateLaunchers = useCallback(async () => {
    if (!folderHandle) {
      toast.error('Please select a project folder first')
      return
    }

    try {
      const appUrl = 'https://transio.org'
      await generateLaunchers(folderHandle, appUrl)
      toast.success('Launcher files created')
      addLogEntry('export', 'Generated launch-project.bat and launch-project.sh files')
    } catch (error) {
      toast.error('Failed to generate launchers')
      console.error('Launcher generation error:', error)
    }
  }, [folderHandle, generateLaunchers, addLogEntry])

  const shortcuts = useMemo(() => [
    { key: 'Enter', ctrl: true, action: handleTransform },
    { key: 's', ctrl: true, action: () => setSaveDialogOpen(true) },
    { key: 'k', ctrl: true, action: () => setSnippetsOpen(true) },
    { key: 'f', ctrl: true, shift: true, action: handleFormatXML },
    { key: 'g', ctrl: true, shift: true, action: handleFormatXSLT },
    { key: 'i', ctrl: true, shift: true, action: handleImportXML },
    { key: 'o', ctrl: true, shift: true, action: handleImportXSLT },
    { key: 'e', ctrl: true, shift: true, action: handleImportOutput },
    { key: '?', shift: true, action: () => setHelpDialogOpen(true) },
  ], [handleTransform, handleFormatXML, handleFormatXSLT, handleImportXML, handleImportXSLT, handleImportOutput])

  useKeyboardShortcuts(shortcuts)

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'black')
    document.documentElement.classList.add(safeAppTheme)
  }, [safeAppTheme])

  const cycleTheme = useCallback(() => {
    const themes: ('light' | 'dark' | 'black')[] = ['light', 'dark', 'black']
    const currentIndex = themes.indexOf(safeAppTheme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setAppTheme(nextTheme)
    toast.success(`Theme: ${nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1)}`)
    addLogEntry('settings', `Changed theme to ${nextTheme}`)
  }, [safeAppTheme, setAppTheme, addLogEntry])

  return (
    <div className="flex flex-col h-screen bg-background">
      <Toaster position="bottom-right" richColors />
      <header className="border-b border-border bg-card px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Lightning weight="bold" className="w-6 h-6 text-primary" />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold tracking-tight leading-none">Transio</h1>
              <p className="text-[10px] text-muted-foreground leading-none mt-0.5">transio.org</p>
            </div>
          </div>
          {folderName && (
            <Badge variant="secondary" className="hidden sm:inline-flex">
              <Folder weight="bold" className="w-3 h-3 mr-1" />
              {folderName}
            </Badge>
          )}
          <Badge variant="outline" className="hidden md:inline-flex text-[10px]">
            Open Source
          </Badge>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Select value={safeXsltVersion} onValueChange={(v) => setXsltVersion(v as XSLTVersion)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.0">XSLT 1.0</SelectItem>
              <SelectItem value="2.0">XSLT 2.0</SelectItem>
              <SelectItem value="3.0">XSLT 3.0</SelectItem>
            </SelectContent>
          </Select>

          <Select value={safeEditorTheme} onValueChange={(v) => setEditorTheme(v as EditorTheme)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(themeNames).map(([key, name]) => (
                <SelectItem key={key} value={key}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={cycleTheme} title={`Theme: ${safeAppTheme} (Click to cycle)`}>
            {safeAppTheme === 'light' ? <Sun weight="bold" /> : <Moon weight="bold" />}
          </Button>

          <AboutDialog />

          <DeployInfoDialog />

          <DonationDialog />

          <Button variant="outline" size="icon" onClick={() => setHelpDialogOpen(true)} title="Keyboard Shortcuts (?)">
            <Question weight="bold" />
          </Button>

          <Button variant="outline" size="icon" onClick={handleSelectFolder} title="Open Project Folder">
            <Folder weight="bold" />
          </Button>

          {folderHandle && (
            <>
              <Button variant="outline" size="icon" onClick={handleExportCSV} title="Export to CSV">
                <FileCsv weight="bold" />
              </Button>

              <Button variant="outline" size="icon" onClick={handleGenerateLaunchers} title="Generate Launcher Files">
                <RocketLaunch weight="bold" />
              </Button>
            </>
          )}

          <Button variant="outline" size="icon" onClick={() => setSaveDialogOpen(true)} title="Save Version (Ctrl+S)">
            <FloppyDisk weight="bold" />
          </Button>

          <Button variant="default" onClick={handleTransform} disabled={isTransforming} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Lightning weight="bold" className="mr-2" />
            Transform
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        {isMobile ? (
          <div className="h-full flex flex-col overflow-hidden">
            <Tabs defaultValue="xml" className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="mx-4 mt-4 flex-shrink-0">
                <TabsTrigger value="xml">XML</TabsTrigger>
                <TabsTrigger value="xslt">XSLT</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
                <TabsTrigger value="versions">
                  <GitBranch weight="bold" className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="xml" className="flex-1 p-4 pt-2 m-0 overflow-hidden">
                <div className="h-full w-full flex flex-col">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <h3 className="text-sm font-medium">XML Input</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={handleImportXML}>
                        <DownloadSimple weight="bold" className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleFormatXML}>
                        <TextIndent weight="bold" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 w-full overflow-hidden">
                    <CodeEditor value={safeXmlInput} onChange={setXmlInput} language="xml" theme={safeEditorTheme} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="xslt" className="flex-1 p-4 pt-2 m-0 overflow-hidden">
                <div className="h-full w-full flex flex-col">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <h3 className="text-sm font-medium">XSLT Stylesheet</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setSnippetsOpen(true)}>
                        <Code weight="bold" className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleImportXSLT}>
                        <DownloadSimple weight="bold" className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleFormatXSLT}>
                        <TextIndent weight="bold" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 w-full overflow-hidden">
                    <CodeEditor value={safeXsltInput} onChange={setXsltInput} language="xml" theme={safeEditorTheme} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="output" className="flex-1 p-4 pt-2 m-0 overflow-hidden">
                <div className="h-full w-full flex flex-col">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium">Output</h3>
                      {lastResult && (
                        <Badge variant={lastResult.success ? "default" : "destructive"} className="text-xs">
                          {lastResult.processorUsed}
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleImportOutput} title="Import Output">
                      <DownloadSimple weight="bold" className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1 w-full overflow-hidden">
                    {lastResult && !lastResult.success ? (
                      <div className="p-4 bg-destructive/10 text-destructive rounded-md border border-destructive/20 h-full overflow-auto">
                        <p className="font-medium">Transformation Error:</p>
                        <pre className="mt-2 text-sm whitespace-pre-wrap">{lastResult.error}</pre>
                      </div>
                    ) : output ? (
                      <CodeEditor value={output} onChange={() => {}} language="html" theme={safeEditorTheme} readOnly />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-sm border border-border rounded-md bg-muted/20">
                        Click Transform or press Ctrl+Enter to see results
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="versions" className="flex-1 p-4 pt-2 m-0 overflow-auto">
                <VersionPanel
                  versions={safeVersions}
                  onLoad={handleLoadVersion}
                  onDelete={handleDeleteVersion}
                  onRelease={handleReleaseVersion}
                />
              </TabsContent>
            </Tabs>

            <div className="border-t border-border">
              <ActivityLog entries={safeActivityLog} />
            </div>
            <FooterInfo />
          </div>
        ) : (
          <div className="h-full flex">
            <div className="flex-1 flex flex-col overflow-hidden" style={{ width: safeSidebarOpen ? 'calc(100% - 320px)' : '100%', transition: 'width 0.3s ease' }}>
              <div className="flex-1 flex flex-col p-6 gap-4 overflow-auto">
                <div className="flex flex-col w-full min-h-[300px]">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <h3 className="text-sm font-medium">XML Input</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={handleImportXML} title="Import XML">
                        <DownloadSimple weight="bold" className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleFormatXML} title="Format XML (Ctrl+Shift+F)">
                        <TextIndent weight="bold" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="h-[300px] w-full overflow-hidden">
                    <CodeEditor value={safeXmlInput} onChange={setXmlInput} language="xml" theme={safeEditorTheme} />
                  </div>
                </div>

                <div className="flex flex-col w-full min-h-[300px]">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <h3 className="text-sm font-medium">XSLT Stylesheet</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setSnippetsOpen(true)} title="Snippets (Ctrl+K)">
                        <Code weight="bold" className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleImportXSLT} title="Import XSLT">
                        <DownloadSimple weight="bold" className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleFormatXSLT} title="Format XSLT (Ctrl+Shift+G)">
                        <TextIndent weight="bold" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="h-[300px] w-full overflow-hidden">
                    <CodeEditor value={safeXsltInput} onChange={setXsltInput} language="xml" theme={safeEditorTheme} />
                  </div>
                </div>

                <div className="flex flex-col w-full min-h-[300px]">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium">Output</h3>
                      {lastResult && (
                        <Badge variant={lastResult.success ? "default" : "destructive"} className="text-xs">
                          {lastResult.processorUsed}
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleImportOutput} title="Import Output">
                      <DownloadSimple weight="bold" className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="h-[300px] w-full overflow-hidden">
                    {lastResult && !lastResult.success ? (
                      <div className="p-4 bg-destructive/10 text-destructive rounded-md border border-destructive/20 h-full overflow-auto">
                        <p className="font-medium">Transformation Error:</p>
                        <pre className="mt-2 text-sm whitespace-pre-wrap font-mono">{lastResult.error}</pre>
                      </div>
                    ) : output ? (
                      <CodeEditor value={output} onChange={() => {}} language="html" theme={safeEditorTheme} readOnly />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-sm border border-border rounded-md bg-muted/20">
                        Click Transform or press Ctrl+Enter to see results
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <ActivityLog entries={safeActivityLog} />
              <FooterInfo />
            </div>

            {safeSidebarOpen && (
              <div className="w-80 border-l border-border bg-muted/30 relative" style={{ transition: 'width 0.3s ease' }}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute -left-4 top-4 z-10 h-8 w-8 rounded-full bg-card border border-border shadow-md hover:bg-accent"
                  onClick={() => setSidebarOpen(false)}
                  title="Hide Version Panel"
                >
                  <CaretRight weight="bold" />
                </Button>
                <VersionPanel
                  versions={safeVersions}
                  onLoad={handleLoadVersion}
                  onDelete={handleDeleteVersion}
                  onRelease={handleReleaseVersion}
                />
              </div>
            )}

            {!safeSidebarOpen && (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute -left-4 top-4 z-10 h-8 w-8 rounded-full bg-card border border-border shadow-md hover:bg-accent"
                  onClick={() => setSidebarOpen(true)}
                  title="Show Version Panel"
                >
                  <CaretLeft weight="bold" />
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
      <SaveVersionDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        onSave={handleSaveVersion}
      />
      <SnippetsSheet
        open={snippetsOpen}
        onOpenChange={setSnippetsOpen}
        onInsert={handleInsertSnippet}
        currentVersion={safeXsltVersion}
      />
      <KeyboardShortcutsDialog
        open={helpDialogOpen}
        onOpenChange={setHelpDialogOpen}
      />
    </div>
  );
}

export default App