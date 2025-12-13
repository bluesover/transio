import { Info, Lightning, GithubLogo, Heart, ShieldCheck, Globe, Flask } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="About Transio">
          <Info weight="bold" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightning weight="bold" className="w-5 h-5 text-primary" />
            About Transio
          </DialogTitle>
          <DialogDescription>
            Professional XML/XSLT Transformer - Free & Open Source
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">
                <strong>Transio</strong> is a professional-grade XML to XSLT transformation tool that runs entirely in your browser. 
                Supporting XSLT 1.0, 2.0, and 3.0, it provides comprehensive developer features including version control, 
                project management, code snippets, and real-time validation.
              </p>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary">v1.0.0</Badge>
                <Badge variant="outline">XSLT 1.0/2.0/3.0</Badge>
                <Badge variant="outline">MIT License</Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Lightning weight="bold" className="w-4 h-4" />
                Key Features
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Multi-version XSLT support</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Real-time transformation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Version control system</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>40+ XSLT snippets</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Project folder management</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Syntax highlighting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Auto-save & persistence</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>CSV export</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Keyboard shortcuts</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Mobile responsive</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <ShieldCheck weight="bold" className="w-4 h-4" />
                Privacy & Security
              </h3>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <ShieldCheck weight="bold" className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">100% Local Processing</p>
                    <p className="text-muted-foreground">All transformations happen in your browser - nothing is sent to any server</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck weight="bold" className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Zero Tracking</p>
                    <p className="text-muted-foreground">No analytics, no cookies, no user tracking of any kind</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck weight="bold" className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Local Data Storage</p>
                    <p className="text-muted-foreground">Your data stays on your computer via browser storage and optional folder access</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck weight="bold" className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Offline Capable</p>
                    <p className="text-muted-foreground">Works without internet after initial load</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Lightning weight="bold" className="w-4 h-4 text-warning" />
                XSLT 2.0/3.0 Support
              </h3>
              
              <div className="space-y-2 text-xs">
                <div className="bg-success/10 border border-success/20 p-3 rounded-lg">
                  <p className="font-medium text-success mb-1">✓ XSLT 1.0: Fully Supported</p>
                  <p className="text-muted-foreground">Uses browser's native XSLTProcessor - 100% reliable</p>
                </div>
                
                <div className="bg-warning/10 border border-warning/20 p-3 rounded-lg">
                  <p className="font-medium text-warning mb-1">⚠ XSLT 2.0/3.0: Limited Support</p>
                  <p className="text-muted-foreground mb-2">
                    Saxon-JS provides best-effort support for XSLT 2.0/3.0 in the browser. 
                    Works well for basic features like grouping and XPath 2.0 functions.
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    <strong>Note:</strong> Full XSLT 2.0/3.0 requires pre-compiled SEF files or server-side processing. 
                    For complex transformations, consider using server-side Saxon-HE (open source).
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flask weight="bold" className="w-4 h-4 text-primary" />
                    <p className="font-medium text-primary">Test XSLT 2.0 Grouping</p>
                  </div>
                  <p className="text-muted-foreground text-[11px] mb-2">
                    Click the Flask icon <Flask weight="bold" className="w-3 h-3 inline-block" /> in the header to load a complete XSLT 2.0 example with:
                  </p>
                  <ul className="text-[11px] text-muted-foreground space-y-0.5 pl-4">
                    <li>• for-each-group with group-by</li>
                    <li>• current-grouping-key() and current-group()</li>
                    <li>• format-number() function</li>
                    <li>• sum() aggregation per group</li>
                  </ul>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    This demonstrates Saxon-JS's XSLT 2.0 grouping capabilities with the sample book catalog data.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <GithubLogo weight="bold" className="w-4 h-4" />
                Open Source
              </h3>
              
              <div className="space-y-2 text-xs">
                <p className="text-muted-foreground">
                  Transio is 100% open source (MIT License). All dependencies are open source and free for commercial use.
                </p>
                
                <div className="bg-muted p-3 rounded-lg border border-border space-y-2">
                  <p className="font-medium">Technology Stack:</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-[10px]">React 19 (MIT)</Badge>
                    <Badge variant="outline" className="text-[10px]">TypeScript (Apache-2.0)</Badge>
                    <Badge variant="outline" className="text-[10px]">Vite 7 (MIT)</Badge>
                    <Badge variant="outline" className="text-[10px]">Tailwind CSS 4 (MIT)</Badge>
                    <Badge variant="outline" className="text-[10px]">shadcn/ui v4 (MIT)</Badge>
                    <Badge variant="outline" className="text-[10px]">CodeMirror 6 (MIT)</Badge>
                    <Badge variant="outline" className="text-[10px]">Saxon-JS 2.7 (MPL-2.0)</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground pt-1">
                    See <span className="font-mono">OPEN_SOURCE_INFO.md</span> for complete license details
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Heart weight="bold" className="w-4 h-4 text-accent" />
                Support Development
              </h3>
              
              <p className="text-xs text-muted-foreground">
                If you find Transio useful, consider supporting its development with a Dogecoin donation. 
                Your contributions help maintain and improve this tool for everyone.
              </p>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <a href="https://transio.org" target="_blank" rel="noopener noreferrer">
                    <Globe weight="bold" className="w-3 h-3 mr-1" />
                    Visit Website
                  </a>
                </Button>
              </div>
            </div>

            <Separator />

            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>Made with ❤️ for the developer community</p>
              <p className="font-mono">
                <a 
                  href="https://transio.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  transio.org
                </a>
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
