import { Rocket, GithubLogo, Globe, Check } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'

export function DeployInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Deployment & Open Source Info">
          <Rocket weight="bold" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket weight="bold" className="w-5 h-5 text-accent" />
            Deploy Your Own Instance
          </DialogTitle>
          <DialogDescription>
            This is a free, open source tool. Deploy it anywhere in 5 minutes!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check weight="bold" className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">100% Free Hosting</p>
                  <p className="text-xs text-muted-foreground">Deploy to GitHub Pages, Netlify, Vercel, or Cloudflare Pages</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check weight="bold" className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">No Backend Required</p>
                  <p className="text-xs text-muted-foreground">Pure frontend application - just static files</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check weight="bold" className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Privacy First</p>
                  <p className="text-xs text-muted-foreground">All data stays on your computer - zero tracking</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check weight="bold" className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Open Source</p>
                  <p className="text-xs text-muted-foreground">MIT License - modify and redistribute freely</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Globe weight="bold" className="w-4 h-4" />
                Quick Deploy Options
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">GitHub Pages</Badge>
                    <span className="text-xs text-muted-foreground">Most Popular</span>
                  </div>
                  <code className="text-xs block bg-background p-2 rounded border border-border font-mono">
                    npm install && npm run deploy
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    Live at: https://YOUR_USERNAME.github.io/
                  </p>
                </div>

                <div className="p-3 bg-muted rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Netlify</Badge>
                    <span className="text-xs text-muted-foreground">Easiest</span>
                  </div>
                  <code className="text-xs block bg-background p-2 rounded border border-border font-mono">
                    npm run build
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    Drag 'dist' folder to netlify.com/drop
                  </p>
                </div>

                <div className="p-3 bg-muted rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Vercel</Badge>
                    <span className="text-xs text-muted-foreground">Fastest</span>
                  </div>
                  <code className="text-xs block bg-background p-2 rounded border border-border font-mono">
                    npx vercel --prod
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    Follow prompts - live in 60 seconds
                  </p>
                </div>

                <div className="p-3 bg-muted rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Local</Badge>
                    <span className="text-xs text-muted-foreground">Development</span>
                  </div>
                  <code className="text-xs block bg-background p-2 rounded border border-border font-mono">
                    npm install && npm run dev
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    Open http://localhost:5173
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <GithubLogo weight="bold" className="w-4 h-4" />
                Resources
              </h3>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>Complete Deployment Guide</span>
                  <Badge variant="outline" className="text-[10px]">DEPLOYMENT_GUIDE.md</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>5-Minute Quick Start</span>
                  <Badge variant="outline" className="text-[10px]">DEPLOY_NOW.md</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>Step-by-Step for Beginners</span>
                  <Badge variant="outline" className="text-[10px]">SIMPLE_DEPLOY_GUIDE.md</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>Local Development Setup</span>
                  <Badge variant="outline" className="text-[10px]">LOCAL_SETUP_GUIDE.md</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-2">
              <p className="font-semibold text-sm flex items-center gap-2 text-accent-foreground">
                <Globe weight="bold" className="w-4 h-4" />
                Official Website
              </p>
              <p className="text-xs text-muted-foreground">
                Visit our website for more information and updates:
              </p>
              <a 
                href="https://transio.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-mono text-primary hover:underline block"
              >
                https://transio.org
              </a>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
