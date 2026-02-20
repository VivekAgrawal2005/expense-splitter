"use client"

import { useState, useCallback } from "react"
import type { TransactionStatus } from "@/components/transaction-modal"
import { useToast } from "@/hooks/use-toast"

interface UseTransactionOptions {
  onSuccess?: (txHash: string) => void
  onError?: (error: string) => void
}

export function useTransaction(options?: UseTransactionOptions) {
  const { toast } = useToast()
  const [status, setStatus] = useState<TransactionStatus>("idle")
  const [txHash, setTxHash] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const execute = useCallback(
    async (transactionFn: () => Promise<{ hash: string }>, title: string) => {
      setStatus("confirming")
      setIsModalOpen(true)
      setError(undefined)
      setTxHash(undefined)

      try {
        // Simulate wallet confirmation delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setStatus("pending")

        // Simulate transaction
        const result = await transactionFn()
        setTxHash(result.hash)

        // Simulate on-chain confirmation
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setStatus("success")
        toast({
          title: "Transaction Successful",
          description: `${title} has been confirmed on-chain`,
        })
        options?.onSuccess?.(result.hash)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Transaction failed"
        setError(errorMessage)
        setStatus("error")
        toast({
          title: "Transaction Failed",
          description: errorMessage,
          variant: "destructive",
        })
        options?.onError?.(errorMessage)
      }
    },
    [toast, options],
  )

  const reset = useCallback(() => {
    setStatus("idle")
    setTxHash(undefined)
    setError(undefined)
    setIsModalOpen(false)
  }, [])

  return {
    status,
    txHash,
    error,
    isModalOpen,
    setIsModalOpen,
    execute,
    reset,
  }
}
