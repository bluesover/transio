import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

interface SaveVersionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (version: string, description: string) => void
}

export function SaveVersionDialog({ open, onOpenChange, onSave }: SaveVersionDialogProps) {
  const [version, setVersion] = useState('')
  const [description, setDescription] = useState('')

  const handleSave = () => {
    if (!version.trim()) return
    onSave(version, description)
    setVersion('')
    setDescription('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Version</DialogTitle>
          <DialogDescription>
            Save the current XML and XSLT as a version for later use. Use semantic versioning (e.g., 1.0.0).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="version">Version Number</Label>
            <Input
              id="version"
              placeholder="1.0.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && version.trim()) {
                  handleSave()
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the changes in this version..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!version.trim()}>
            Save Version
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
