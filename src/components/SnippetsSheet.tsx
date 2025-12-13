import { useState, useMemo } from 'react'
import { Copy, Plus, MagnifyingGlass } from '@phosphor-icons/react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Card } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { toast } from 'sonner'
import { xsltSnippets } from '@/lib/snippets'
import type { XSLTVersion } from '@/lib/types'

interface SnippetsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInsert: (code: string) => void
  currentVersion: XSLTVersion
}

export function SnippetsSheet({ open, onOpenChange, onInsert, currentVersion }: SnippetsSheetProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredSnippets = useMemo(() => {
    return xsltSnippets.filter(snippet => {
      const matchesSearch = search === '' || 
        snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.description.toLowerCase().includes(search.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(xsltSnippets.map(s => s.category)))
    return ['all', ...cats]
  }, [])

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success('Snippet copied to clipboard')
  }

  const handleInsert = (code: string) => {
    onInsert(code)
    toast.success('Snippet inserted')
  }

  const isCompatible = (snippetVersions: XSLTVersion[]) => {
    return snippetVersions.includes(currentVersion)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>XSLT Snippets</SheetTitle>
          <SheetDescription>
            Ready-to-use XSLT templates and patterns. Currently using XSLT {currentVersion}.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <MagnifyingGlass weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search snippets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="boilerplate" className="text-xs">Boilerplate</TabsTrigger>
              <TabsTrigger value="templates" className="text-xs">Templates</TabsTrigger>
              <TabsTrigger value="loops" className="text-xs">Loops</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-4 w-full mt-2">
              <TabsTrigger value="conditionals" className="text-xs">Conditionals</TabsTrigger>
              <TabsTrigger value="instructions" className="text-xs">Instructions</TabsTrigger>
              <TabsTrigger value="variables" className="text-xs">Variables</TabsTrigger>
              <TabsTrigger value="patterns" className="text-xs">Patterns</TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-[calc(100vh-320px)]">
            <div className="space-y-3 pr-4">
              {filteredSnippets.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No snippets found matching your search.
                </p>
              ) : (
                filteredSnippets.map(snippet => {
                  const compatible = isCompatible(snippet.xsltVersion)
                  return (
                    <Card key={snippet.id} className={`p-4 ${!compatible ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{snippet.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{snippet.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="outline" className="text-xs capitalize">
                          {snippet.category}
                        </Badge>
                        {snippet.xsltVersion.map(v => (
                          <Badge 
                            key={v} 
                            variant={v === currentVersion ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {v}
                          </Badge>
                        ))}
                      </div>

                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto mb-3 font-mono">
                        <code>{snippet.code.trim().substring(0, 150)}{snippet.code.length > 150 ? '...' : ''}</code>
                      </pre>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleCopy(snippet.code)}
                        >
                          <Copy weight="bold" className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleInsert(snippet.code)}
                          disabled={!compatible}
                        >
                          <Plus weight="bold" className="w-3 h-3 mr-1" />
                          Insert
                        </Button>
                      </div>

                      {!compatible && (
                        <p className="text-xs text-warning mt-2">
                          This snippet requires XSLT {snippet.xsltVersion.join(' or ')}
                        </p>
                      )}
                    </Card>
                  )
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
