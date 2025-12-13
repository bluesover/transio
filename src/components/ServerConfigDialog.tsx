import { useState, useEffect } from 'react'
import { CloudArrowUp, CheckCircle, XCircle, Info } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { checkServerHealth } from '@/lib/server-api'
import type { ServerConfig } from '@/lib/types'

interface ServerConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: ServerConfig
  onSave: (config: ServerConfig) => void
}

export function ServerConfigDialog({ open, onOpenChange, config, onSave }: ServerConfigDialogProps) {
  const [enabled, setEnabled] = useState(config.enabled)
  const [apiUrl, setApiUrl] = useState(config.apiUrl)
  const [apiKey, setApiKey] = useState(config.apiKey || '')
  const [timeout, setTimeout] = useState(config.timeout)
  const [preferServer, setPreferServer] = useState(config.preferServer)
  const [checking, setChecking] = useState(false)
  const [serverStatus, setServerStatus] = useState<{
    available: boolean
    version?: string
    processor?: string
    error?: string
  } | null>(null)

  const handleCheckHealth = async () => {
    if (!apiUrl.trim()) return
    
    setChecking(true)
    setServerStatus(null)
    
    const status = await checkServerHealth(apiUrl, apiKey || undefined)
    setServerStatus(status)
    setChecking(false)
  }

  useEffect(() => {
    if (open && enabled && apiUrl) {
      handleCheckHealth()
    }
  }, [open])

  const handleSave = () => {
    onSave({ 
      enabled, 
      apiUrl: apiUrl.trim(), 
      apiKey: apiKey.trim() || undefined, 
      timeout,
      preferServer
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CloudArrowUp weight="bold" className="w-5 h-5" />
            Server Configuration (Optional)
          </DialogTitle>
          <DialogDescription>
            Configure an optional Saxon-HE server for enhanced XSLT 2.0/3.0 support and large file processing.
            The app works perfectly without a server using client-side transformation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card className="p-4 bg-muted/50 border-primary/20">
            <div className="flex items-start gap-3">
              <Info weight="bold" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm space-y-2">
                <p className="font-medium">Why use a server?</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Full XSLT 2.0/3.0 feature support (for-each-group, sequences, etc.)</li>
                  <li>Better performance for large files (&gt;5MB)</li>
                  <li>Enterprise-grade Saxon-HE processor</li>
                  <li>Automatic fallback to client-side if server unavailable</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  Server setup guide available in repository documentation.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <Label htmlFor="server-enabled" className="text-base font-medium">
                Enable Server-Side Processing
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Use external Saxon-HE server when available
              </p>
            </div>
            <Switch
              id="server-enabled"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>
          
          {enabled && (
            <div className="space-y-4 animate-in fade-in-50 duration-300">
              <div className="space-y-2">
                <Label htmlFor="api-url">Server API URL</Label>
                <Input
                  id="api-url"
                  placeholder="http://localhost:3001/api"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  The base URL of your Saxon-HE API server
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key (optional)</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Optional authentication key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty if your server doesn't require authentication
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeout">Request Timeout (ms)</Label>
                <Input
                  id="timeout"
                  type="number"
                  min="5000"
                  max="120000"
                  step="1000"
                  value={timeout}
                  onChange={(e) => setTimeout(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum wait time for server response (5000-120000 ms)
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <Label htmlFor="prefer-server" className="text-sm font-medium">
                    Prefer Server for XSLT 2.0/3.0
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try server first, fallback to client on failure
                  </p>
                </div>
                <Switch
                  id="prefer-server"
                  checked={preferServer}
                  onCheckedChange={setPreferServer}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCheckHealth} 
                    disabled={checking || !apiUrl.trim()}
                  >
                    {checking ? 'Checking...' : 'Test Connection'}
                  </Button>
                  
                  {serverStatus && (
                    <Badge 
                      variant={serverStatus.available ? "default" : "destructive"}
                      className="gap-1"
                    >
                      {serverStatus.available ? (
                        <>
                          <CheckCircle weight="bold" className="w-3 h-3" />
                          Available
                        </>
                      ) : (
                        <>
                          <XCircle weight="bold" className="w-3 h-3" />
                          Unavailable
                        </>
                      )}
                    </Badge>
                  )}
                </div>

                {serverStatus && serverStatus.available && (
                  <Card className="p-3 bg-success/10 border-success/20">
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-success-foreground">Server Connected</p>
                      {serverStatus.processor && (
                        <p className="text-xs text-muted-foreground">
                          Processor: {serverStatus.processor}
                        </p>
                      )}
                      {serverStatus.version && (
                        <p className="text-xs text-muted-foreground">
                          Version: {serverStatus.version}
                        </p>
                      )}
                    </div>
                  </Card>
                )}

                {serverStatus && !serverStatus.available && (
                  <Card className="p-3 bg-destructive/10 border-destructive/20">
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-destructive-foreground">Connection Failed</p>
                      <p className="text-xs text-muted-foreground">
                        {serverStatus.error || 'Unable to reach server'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        The app will continue using client-side transformation.
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
          
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
