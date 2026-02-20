"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useWallet } from "@/components/wagmi-provider"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useState } from "react"

interface NetworkSwitchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const POLYGON_CHAIN_ID = 137

export function NetworkSwitchModal({ open, onOpenChange }: NetworkSwitchModalProps) {
  const { switchNetwork, chainId } = useWallet()
  const [isSwitching, setIsSwitching] = useState(false)

  const handleSwitch = async () => {
    setIsSwitching(true)
    await switchNetwork(POLYGON_CHAIN_ID)
    setIsSwitching(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Wrong Network
          </DialogTitle>
          <DialogDescription>SplitChain requires the Polygon network to function</DialogDescription>
        </DialogHeader>

        <Alert className="my-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You are currently connected to a different network. Please switch to Polygon to continue using SplitChain.
          </AlertDescription>
        </Alert>

        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <img src="/polygon-logo.png" alt="Polygon" className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-foreground">Polygon Mainnet</p>
              <p className="text-sm text-muted-foreground">Chain ID: 137</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSwitch} disabled={isSwitching}>
            {isSwitching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Switch to Polygon
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
