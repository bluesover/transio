import { useState } from 'react'
import { Trash, DownloadSimple, Rocket } from '@phosphor-icons/react'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import type { TransformVersion } from '@/lib/types'

interface VersionPanelProps {
  versions: TransformVersion[]
  onLoad: (version: TransformVersion) => void
  onDelete: (versionId: string) => void
  onRelease: (versionId: string, releaseNotes: string) => void
}

export function VersionPanel({ versions, onLoad, onDelete, onRelease }: VersionPanelProps) {
  const [releaseDialogOpen, setReleaseDialogOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<TransformVersion | null>(null)
  const [releaseNotes, setReleaseNotes] = useState('')

  const handleRelease = () => {
    if (selectedVersion) {
      onRelease(selectedVersion.id, releaseNotes)
      setReleaseDialogOpen(false)
      setReleaseNotes('')
      setSelectedVersion(null)
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const sortedVersions = [...versions].sort((a, b) => b.createdAt - a.createdAt)

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-medium">Saved Versions</h3>
          <p className="text-xs text-muted-foreground mt-1">{versions.length} version{versions.length !== 1 ? 's' : ''}</p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {sortedVersions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No saved versions yet. Press Ctrl+S to save your first version.
              </p>
            ) : (
              sortedVersions.map(version => (
                <Card key={version.id} className="p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-medium">v{version.version}</h4>
                        <Badge variant="outline" className="text-xs">
                          XSLT {version.xsltVersion}
                        </Badge>
                        {version.isReleased && (
                          <Badge variant="default" className="text-xs bg-success text-success-foreground">
                            Released
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(version.createdAt)}</p>
                    </div>
                  </div>

                  {version.description && (
                    <p className="text-xs text-foreground mb-3 line-clamp-2">{version.description}</p>
                  )}

                  {version.releaseNotes && (
                    <div className="mb-3 p-2 bg-success/10 rounded text-xs">
                      <p className="font-medium text-success-foreground mb-1">Release Notes:</p>
                      <p className="text-foreground">{version.releaseNotes}</p>
                    </div>
                  )}

                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => onLoad(version)}
                    >
                      <DownloadSimple weight="bold" className="w-3 h-3 mr-1" />
                      Load
                    </Button>

                    {!version.isReleased && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedVersion(version)
                          setReleaseDialogOpen(true)
                        }}
                      >
                        <Rocket weight="bold" className="w-3 h-3" />
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(version.id)}
                    >
                      <Trash weight="bold" className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      <Dialog open={releaseDialogOpen} onOpenChange={setReleaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Release Version {selectedVersion?.version}</DialogTitle>
            <DialogDescription>
              Mark this version as released and add release notes.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="release-notes">Release Notes</Label>
              <Textarea
                id="release-notes"
                placeholder="Describe what's new in this release..."
                value={releaseNotes}
                onChange={(e) => setReleaseNotes(e.target.value)}
                rows={5}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReleaseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRelease} className="bg-success hover:bg-success/90 text-success-foreground">
              <Rocket weight="bold" className="mr-2" />
              Release
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
