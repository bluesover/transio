import { DesktopTower, Download, GithubLogo, AppleLogo, WindowsLogo, LinuxLogo, Lightning } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card } from './ui/card'

export function DownloadAppDialog() {
  const downloads = [
    {
      platform: 'Windows',
      icon: WindowsLogo,
      file: 'Transio-Setup-1.0.0.exe',
      size: '~150 MB',
      description: 'Windows 10/11 (64-bit)',
      color: 'text-blue-500'
    },
    {
      platform: 'macOS',
      icon: AppleLogo,
      file: 'Transio-1.0.0.dmg',
      size: '~140 MB',
      description: 'macOS 10.15+ (Intel & Apple Silicon)',
      color: 'text-foreground'
    },
    {
      platform: 'Linux',
      icon: LinuxLogo,
      file: 'Transio-1.0.0.AppImage',
      size: '~145 MB',
      description: 'Ubuntu/Debian/Fedora (64-bit)',
      color: 'text-yellow-500'
    }
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Download weight="bold" className="mr-2" />
          Download App
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <DesktopTower weight="bold" className="w-6 h-6" />
            Download Desktop App
          </DialogTitle>
          <DialogDescription>
            Get the native desktop application with offline support and enhanced performance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <Lightning weight="bold" className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Includes Saxon-HE Server</p>
              <p className="text-xs text-muted-foreground">Full XSLT 2.0/3.0 support with automatic installation</p>
            </div>
          </div>

          <div className="grid gap-3">
            {downloads.map((download) => (
              <Card key={download.platform} className="p-4 hover:bg-accent/5 transition-colors">
                <div className="flex items-center gap-4">
                  <download.icon weight="bold" className={`w-10 h-10 ${download.color}`} />
                  <div className="flex-1">
                    <h4 className="font-semibold">{download.platform}</h4>
                    <p className="text-sm text-muted-foreground">{download.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">{download.size}</Badge>
                    <Button size="sm" className="w-full" asChild>
                      <a href={`https://github.com/bluesover/transio.org/releases/latest/download/${download.file}`} target="_blank" rel="noopener noreferrer">
                        <Download weight="bold" className="mr-2 w-4 h-4" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Full offline support</li>
              <li>✓ Native file system integration</li>
              <li>✓ Automatic Saxon-HE installation</li>
              <li>✓ Enhanced performance for large files</li>
              <li>✓ Auto-updates enabled</li>
            </ul>
          </div>

          <div className="border-t pt-4 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GithubLogo weight="bold" className="w-4 h-4" />
              <span>Open Source on GitHub</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/bluesover/transio.org" target="_blank" rel="noopener noreferrer">
                View Releases
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
