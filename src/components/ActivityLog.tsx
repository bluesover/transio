import { useState } from 'react'
import { CheckCircle, WarningCircle, Info, Lightning, CaretDown, CaretUp } from '@phosphor-icons/react'
import { ScrollArea } from './ui/scroll-area'
import { Button } from './ui/button'
import type { ActivityLogEntry } from '@/lib/types'

interface ActivityLogProps {
  entries: ActivityLogEntry[]
}

export function ActivityLog({ entries }: ActivityLogProps) {
  const [isExpanded, setIsExpanded] = useState(false)

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

  return (
    <div className="border-t border-border bg-card">
      <div className="px-4 py-2 border-b border-border flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="text-sm font-medium">Activity Log ({entries.length})</h3>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          {isExpanded ? <CaretUp weight="bold" className="w-4 h-4" /> : <CaretDown weight="bold" className="w-4 h-4" />}
        </Button>
      </div>
      
      {isExpanded && (
        entries.length === 0 ? (
          <div className="p-4">
            <p className="text-xs text-muted-foreground">No activity yet</p>
          </div>
        ) : (
          <ScrollArea className="h-48">
            <div className="w-full">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-2 py-1.5 text-left font-medium text-muted-foreground w-12">#</th>
                    <th className="px-2 py-1.5 text-left font-medium text-muted-foreground w-10">Type</th>
                    <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Message</th>
                    <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Details</th>
                    <th className="px-2 py-1.5 text-left font-medium text-muted-foreground w-24">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={entry.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-2 py-1.5 text-muted-foreground font-mono">{entries.length - index}</td>
                      <td className="px-2 py-1.5">{getIcon(entry.type)}</td>
                      <td className="px-2 py-1.5 text-foreground">{entry.message}</td>
                      <td className="px-2 py-1.5 text-muted-foreground truncate max-w-[300px]">{entry.details || '-'}</td>
                      <td className="px-2 py-1.5 text-muted-foreground font-mono whitespace-nowrap">{formatTime(entry.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        )
      )}
    </div>
  )
}
