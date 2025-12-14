import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'

interface KeyboardShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const shortcuts = [
  { keys: 'Ctrl+Enter', description: 'Transform XML with XSLT' },
  { keys: 'Ctrl+S', description: 'Save current version' },
  { keys: 'Ctrl+K', description: 'Open snippets panel' },
  { keys: 'Ctrl+Shift+F', description: 'Format XML' },
  { keys: 'Ctrl+Shift+G', description: 'Format XSLT' },
  { keys: 'Ctrl+Shift+H', description: 'Format Output (auto-detects language)' },
  { keys: 'Ctrl+Shift+I', description: 'Import XML file' },
  { keys: 'Ctrl+Shift+O', description: 'Import XSLT file' },
  { keys: 'Ctrl+Shift+P', description: 'Import Output file' },
  { keys: 'Ctrl+Shift+X', description: 'Download XML file' },
  { keys: 'Ctrl+Shift+Y', description: 'Download XSLT file' },
  { keys: 'Ctrl+Shift+D', description: 'Download Output file' },
  { keys: '?', description: 'Show this help dialog' },
]

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts to work more efficiently
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
              >
                <span className="text-sm text-foreground">{shortcut.description}</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border border-border rounded">
                  {shortcut.keys}
                </kbd>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
