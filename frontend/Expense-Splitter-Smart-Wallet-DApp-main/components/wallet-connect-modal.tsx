"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useWallet } from "@/components/wagmi-provider"
import { Wallet, Loader2 } from "lucide-react"

interface WalletConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/metamask-wallet-icon.jpg",
    popular: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/walletconnect-icon.jpg",
    popular: true,
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "/coinbase-wallet-icon.jpg",
    popular: false,
  },
  {
    id: "rainbow",
    name: "Rainbow",
    icon: "/rainbow-wallet-icon.jpg",
    popular: false,
  },
]

export function WalletConnectModal({ open, onOpenChange }: WalletConnectModalProps) {
  const { connect, isConnecting } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const handleConnect = async (walletId: string) => {
    setSelectedWallet(walletId)
    await connect()
    onOpenChange(false)
    setSelectedWallet(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription>Connect your wallet to start using SplitChain</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleConnect(wallet.id)}
              disabled={isConnecting}
              className="flex w-full items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted disabled:opacity-50"
            >
              <img src={wallet.icon || "/placeholder.svg"} alt={wallet.name} className="h-10 w-10 rounded-lg" />
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{wallet.name}</p>
                {wallet.popular && <p className="text-xs text-muted-foreground">Popular</p>}
              </div>
              {selectedWallet === wallet.id && isConnecting && (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">
            By connecting a wallet, you agree to SplitChain's Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
