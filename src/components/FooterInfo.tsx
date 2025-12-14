import { Globe, GithubLogo, Heart, Info } from '@phosphor-icons/react'
import { Badge } from './ui/badge'

export function FooterInfo() {
  return (
    <div className="border-t border-border bg-card px-4 py-2 flex items-center justify-between gap-2 text-xs text-muted-foreground flex-wrap">
      <div className="flex items-center gap-3">
        <a 
          href="https://transio.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <Globe weight="bold" className="w-3.5 h-3.5" />
          <span className="font-medium">transio.org</span>
        </a>
        
        <span className="hidden sm:inline">•</span>
        
        <a 
          href="https://github.com/bluesover/transio" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors"
          title="View on GitHub - Contribute & Share Ideas"
        >
          <GithubLogo weight="bold" className="w-3.5 h-3.5" />
          <span className="font-medium">GitHub</span>
        </a>
        
        <div className="hidden md:flex items-center gap-1.5">
          <span>•</span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            Open Source
          </Badge>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            Privacy First
          </Badge>
        </div>
        
        <div className="hidden lg:flex items-center gap-1.5">
          <span>•</span>
          <a 
            href="https://github.com/bluesover/transio/blob/main/XSLT_SUPPORT_GUIDE.md" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
            title="XSLT 2.0/3.0 Support Details"
          >
            <Info weight="bold" className="w-3 h-3" />
            <span>XSLT Support Guide</span>
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden md:inline">Made with</span>
        <Heart weight="fill" className="w-3.5 h-3.5 text-accent" />
        <span className="hidden md:inline">for developers</span>
      </div>
    </div>
  )
}
