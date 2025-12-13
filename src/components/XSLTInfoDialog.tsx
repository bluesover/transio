import { Info, Check, Warning, Lightning } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'

export function XSLTInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" title="XSLT Version Information">
          <Info weight="bold" className="w-4 h-4 mr-1" />
          XSLT Info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightning weight="bold" className="w-5 h-5 text-primary" />
            XSLT Version Support
          </DialogTitle>
          <DialogDescription>
            Understanding XSLT 1.0, 2.0, and 3.0 in the browser
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[65vh] pr-4">
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <Check weight="bold" className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="default" className="bg-success text-success-foreground">XSLT 1.0</Badge>
                      <span className="text-xs font-semibold text-success">Fully Supported ✓</span>
                    </div>
                    <p className="text-sm text-foreground font-medium mb-2">Browser Native Support</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      All modern browsers have built-in XSLT 1.0 processors. This is the most reliable option for web applications.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span className="text-muted-foreground">Works in all browsers (Chrome, Firefox, Safari, Edge)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span className="text-muted-foreground">No external dependencies or compilation needed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span className="text-muted-foreground">Fast, reliable, production-ready</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span className="text-muted-foreground">Best choice for most use cases</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <Warning weight="bold" className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary">XSLT 2.0</Badge>
                      <span className="text-xs font-semibold text-warning">Limited Browser Support ⚠️</span>
                    </div>
                    <p className="text-sm text-foreground font-medium mb-2">Saxon-JS (Experimental)</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      XSLT 2.0 support requires Saxon-JS library. Browser implementation has significant limitations.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2 text-xs">
                    <p className="font-medium text-foreground">✓ What works:</p>
                    <div className="flex items-start gap-2">
                      <span className="text-success">•</span>
                      <span className="text-muted-foreground">Simple templates and basic transformations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-success">•</span>
                      <span className="text-muted-foreground">Some XPath 2.0 expressions</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p className="font-medium text-foreground">✗ Known limitations:</p>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span className="text-muted-foreground">Complex XPath 2.0 functions may fail</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span className="text-muted-foreground">for-each-group and grouping constructs have issues</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span className="text-muted-foreground">Requires pre-compiled SEF files for full support</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span className="text-muted-foreground">Not recommended for production use in browser</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <Warning weight="bold" className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="destructive">XSLT 3.0</Badge>
                      <span className="text-xs font-semibold text-destructive">Very Limited Support ✗</span>
                    </div>
                    <p className="text-sm text-foreground font-medium mb-2">Saxon-JS (Highly Experimental)</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      XSLT 3.0 features are not reliably supported in browsers. Use server-side processing instead.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span className="text-muted-foreground">Most advanced features will not work</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span className="text-muted-foreground">Requires SEF compilation with Saxon EE (commercial)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span className="text-muted-foreground">Not suitable for browser-based transformation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span className="text-muted-foreground">Use XSLT 1.0 or server-side processing instead</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Lightning weight="bold" className="w-4 h-4 text-primary" />
                Recommendations
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium mb-1">For Browser Applications (Recommended)</p>
                  <p className="text-xs text-muted-foreground">
                    Use <strong>XSLT 1.0</strong> for guaranteed compatibility across all browsers and platforms. 
                    It's fast, reliable, and sufficient for most XML transformation needs.
                  </p>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium mb-1">For Advanced Features</p>
                  <p className="text-xs text-muted-foreground">
                    If you need XSLT 2.0/3.0 features (grouping, regex, etc.), consider server-side processing 
                    with Saxon HE/EE or use XSLT 1.0 workarounds.
                  </p>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium mb-1">Testing in This Tool</p>
                  <p className="text-xs text-muted-foreground">
                    You can test XSLT 2.0/3.0 stylesheets here, but expect limited success. 
                    Simple transformations may work, but complex features will likely fail.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
              <p className="font-semibold text-sm text-foreground">
                💡 Pro Tip
              </p>
              <p className="text-xs text-muted-foreground">
                The auto-detect feature analyzes your XSLT stylesheet's version attribute and selects the appropriate processor. 
                You can override this with manual selection if needed.
              </p>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-2">
              <p className="font-semibold text-sm text-foreground">
                🎯 Open Source & Free
              </p>
              <p className="text-xs text-muted-foreground">
                This tool uses only open source libraries: Browser native XSLT processor and Saxon-JS (MPL 2.0 license). 
                All processing happens locally in your browser - no data is sent to any server.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
