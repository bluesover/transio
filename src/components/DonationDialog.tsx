import { CurrencyCircleDollar, Copy, Check } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { useState } from 'react'
import { toast } from 'sonner'
import dogeQrCode from '@/assets/images/E8CE4860-D5D3-4364-83BB-B0F6E7699240.png'

export function DonationDialog() {
  const [copied, setCopied] = useState(false)
  const dogeAddress = 'DRqbUDU1oZ3VfPNpBRj6v5eHSqnQqVJsxJ'
  const paypalUrl = 'https://paypal.me/dogooded'

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

  const handlePayPalClick = () => {
    window.open(paypalUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Support This Project">
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
            Help support the development of this XML/XSLT Transformer
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Badge variant="default" className="text-base px-4 py-1.5 bg-[#0070ba] hover:bg-[#003087]">
              💙 PayPal
            </Badge>
            
            <Button 
              variant="default" 
              size="lg"
              className="w-full max-w-xs bg-[#0070ba] hover:bg-[#003087] text-white"
              onClick={handlePayPalClick}
            >
              Donate via PayPal
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              paypal.me/dogooded
            </p>
          </div>

          <Separator className="my-2" />

          <div className="flex flex-col items-center gap-4">
            <Badge variant="secondary" className="text-base px-4 py-1.5">
              🐕 Dogecoin (DOGE)
            </Badge>
            
            <div className="relative rounded-lg overflow-hidden border-4 border-accent/20 shadow-lg bg-white p-2">
              <img 
                src={dogeQrCode} 
                alt="Dogecoin donation QR code" 
                className="w-40 h-40 object-contain"
              />
            </div>

            <div className="w-full space-y-2">
              <p className="text-xs text-muted-foreground text-center">
                Scan QR code or copy address:
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
          </div>

          <div className="text-center text-xs text-muted-foreground space-y-1 pt-2">
            <p>🚀 Your support helps maintain and improve this tool</p>
            <p className="text-[10px]">Thank you for considering a donation!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
