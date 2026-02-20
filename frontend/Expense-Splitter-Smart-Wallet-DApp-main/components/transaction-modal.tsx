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
import { Loader2, CheckCircle, XCircle, ExternalLink, AlertTriangle, RefreshCw } from "lucide-react"

export type TransactionStatus = "idle" | "confirming" | "pending" | "success" | "error"

interface TransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  status: TransactionStatus
  txHash?: string
  error?: string
  onRetry?: () => void
  onClose?: () => void
}

export function TransactionModal({
  open,
  onOpenChange,
  title,
  description,
  status,
  txHash,
  error,
  onRetry,
  onClose,
}: TransactionModalProps) {
  const handleClose = () => {
    onClose?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          {status === "confirming" && (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
                <Loader2 className="h-8 w-8 animate-spin text-warning" />
              </div>
              <p className="text-center font-medium text-foreground">Confirm in your wallet</p>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Please confirm the transaction in your wallet
              </p>
            </>
          )}

          {status === "pending" && (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <p className="text-center font-medium text-foreground">Transaction Pending</p>
              <p className="mt-1 text-center text-sm text-muted-foreground">Waiting for on-chain confirmation...</p>
              {txHash && (
                <a
                  href={`https://polygonscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View on Polygonscan
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </>
          )}

          {status === "success" && (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <p className="text-center font-medium text-foreground">Transaction Successful</p>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Your transaction has been confirmed on-chain
              </p>
              {txHash && (
                <a
                  href={`https://polygonscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View on Polygonscan
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </>
          )}

          {status === "error" && (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
              <p className="text-center font-medium text-foreground">Transaction Failed</p>
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}
            </>
          )}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          {status === "error" && onRetry && (
            <Button variant="outline" onClick={onRetry} className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          )}
          {(status === "success" || status === "error") && (
            <Button onClick={handleClose}>{status === "success" ? "Done" : "Close"}</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
