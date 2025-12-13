import { CheckCircle, WarningCircle, Info, Lightning } from '@phosphor-icons/react'
import { ScrollArea } from './ui/scroll-area'
import type { ActivityLogEntry } from '@/lib/types'

interface ActivityLogProps {
  entries: ActivityLogEntry[]
}

export function ActivityLog({ entries }: ActivityLogProps) {
  const getIcon = (type: ActivityLogEntry['type']) => {
    switch (type) {
      case 'transform':
        return <Lightning weight="bold" className="w-4 h-4 text-accent" />
      case 'save':
      case 'load':
      case 'import':
      case 'export':
        return <CheckCircle weight="bold" className="w-4 h-4 text-success" />
      case 'error':
        return <WarningCircle weight="bold" className="w-4 h-4 text-destructive" />
      default:
        return <Info weight="bold" className="w-4 h-4 text-muted-foreground" />
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  if (entries.length === 0) {
    return (
      <div className="p-4 border-t border-border bg-card">
        <h3 className="text-sm font-medium mb-2">Activity Log</h3>
        <p className="text-xs text-muted-foreground">No activity yet</p>
      </div>
    )
  }

  return (
    <div className="border-t border-border bg-card">
      <div className="px-4 py-2 border-b border-border">
        <h3 className="text-sm font-medium">Activity Log</h3>
      </div>
      <ScrollArea className="h-32">
        <div className="p-2 space-y-1">
          {entries.map(entry => (
            <div key={entry.id} className="flex items-start gap-2 px-2 py-1.5 rounded hover:bg-muted/50 transition-colors">
              <div className="mt-0.5">{getIcon(entry.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-foreground">{entry.message}</span>
                  <span className="text-xs text-muted-foreground">{formatTime(entry.timestamp)}</span>
                </div>
                {entry.details && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{entry.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
