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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircle, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"

interface ErrorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message: string
  recommendation?: string
  txHash?: string
}

export function ErrorModal({ open, onOpenChange, title, message, recommendation, txHash }: ErrorModalProps) {
  const [copied, setCopied] = useState(false)

  const copyError = () => {
    navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>Something went wrong with your transaction</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error Details</AlertTitle>
            <AlertDescription className="mt-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm break-all">{message}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={copyError}>
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          {recommendation && (
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium text-foreground">Recommendation</p>
              <p className="mt-1 text-sm text-muted-foreground">{recommendation}</p>
            </div>
          )}

          {txHash && (
            <a
              href={`https://polygonscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View failed transaction on Polygonscan
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
