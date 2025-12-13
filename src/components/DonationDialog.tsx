import { CurrencyCircleDollar, Copy, Check } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useState } from 'react'
import { toast } from 'sonner'
import dogeQrCode from '@/assets/images/E8CE4860-D5D3-4364-83BB-B0F6E7699240.png'

export function DonationDialog() {
  const [copied, setCopied] = useState(false)
  const dogeAddress = 'DRqbUDU1oZ3VfPNpBRj6v5eHSqnQqVJsxJ'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dogeAddress)
      setCopied(true)
      toast.success('Address copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy address')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Support with Dogecoin">
          <CurrencyCircleDollar weight="bold" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CurrencyCircleDollar weight="bold" className="w-5 h-5 text-accent" />
            Support This Project
          </DialogTitle>
          <DialogDescription>
            Help support the development of this XML/XSLT Transformer with Dogecoin
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <Badge variant="secondary" className="text-lg px-3 py-1">
            🐕 Dogecoin (DOGE)
          </Badge>
          
          <div className="relative rounded-lg overflow-hidden border-4 border-accent/20 shadow-lg bg-white p-2">
            <img 
              src={dogeQrCode} 
              alt="Dogecoin donation QR code" 
              className="w-48 h-48 object-contain"
            />
          </div>

          <div className="w-full space-y-2">
            <p className="text-xs text-muted-foreground text-center">
              Scan QR code or copy address below:
            </p>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-md border border-border">
              <code className="flex-1 text-xs font-mono break-all">
                {dogeAddress}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check weight="bold" className="w-4 h-4 text-success" />
                ) : (
                  <Copy weight="bold" className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>To the moon! 🚀</p>
            <p className="text-[10px]">
              Your support helps maintain and improve this tool
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
