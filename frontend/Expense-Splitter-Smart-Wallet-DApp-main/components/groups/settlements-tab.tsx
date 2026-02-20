"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowRight, TrendingUp, TrendingDown, Loader2, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SettlementsTabProps {
  groupId: string
}

const mockSettlements = [
  {
    id: "1",
    from: { name: "Jordan", initials: "JK", address: "0xabcd...ef12" },
    to: { name: "Alex", initials: "AS", address: "0x1234...5678" },
    amount: "$85.00",
    status: "pending",
  },
  {
    id: "2",
    from: { name: "Mike", initials: "MR", address: "0xdef0...1234" },
    to: { name: "Alex", initials: "AS", address: "0x1234...5678" },
    amount: "$127.00",
    status: "pending",
  },
  {
    id: "3",
    from: { name: "Mike", initials: "MR", address: "0xdef0...1234" },
    to: { name: "Sarah", initials: "SM", address: "0x9876...5432" },
    amount: "$15.00",
    status: "pending",
  },
]

const mockBalances = [
  {
    member: { name: "Alex", initials: "AS", address: "0x1234...5678" },
    balance: "+$215.50",
    type: "owed",
  },
  {
    member: { name: "Sarah", initials: "SM", address: "0x9876...5432" },
    balance: "+$42.00",
    type: "owed",
  },
  {
    member: { name: "Emma", initials: "EW", address: "0x5678...90ab" },
    balance: "$0.00",
    type: "settled",
  },
  {
    member: { name: "Jordan", initials: "JK", address: "0xabcd...ef12" },
    balance: "-$85.00",
    type: "owes",
  },
  {
    member: { name: "Mike", initials: "MR", address: "0xdef0...1234" },
    balance: "-$127.00",
    type: "owes",
  },
]

export function SettlementsTab({ groupId }: SettlementsTabProps) {
  const { toast } = useToast()
  const [settleDialogOpen, setSettleDialogOpen] = useState(false)
  const [selectedSettlement, setSelectedSettlement] = useState<(typeof mockSettlements)[0] | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Your position
  const yourBalance = "+$215.50"
  const yourBalanceType = "owed"

  const openSettleDialog = (settlement: (typeof mockSettlements)[0]) => {
    setSelectedSettlement(settlement)
    setCustomAmount(settlement.amount.replace("$", ""))
    setSettleDialogOpen(true)
  }

  const handleSettle = async () => {
    if (!selectedSettlement) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setSettleDialogOpen(false)
    setSelectedSettlement(null)

    toast({
      title: "Settlement Complete",
      description: `Transaction confirmed on Polygon`,
    })
  }

  const handleSettleAll = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubmitting(false)

    toast({
      title: "Batch Settlement Complete",
      description: "All debts have been settled on-chain",
    })
  }

  return (
    <div className="space-y-6">
      {/* Your Position */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your Net Position</p>
              <p
                className={`text-3xl font-bold ${
                  yourBalanceType === "owed"
                    ? "text-success"
                    : yourBalanceType === "owes"
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {yourBalance}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {yourBalanceType === "owed" ? "Others owe you this amount" : "You owe this amount to others"}
              </p>
            </div>
            {yourBalanceType === "owes" && (
              <Button className="gap-2" onClick={handleSettleAll} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Settle All Debts
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Balances Overview */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Who Owes You */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <TrendingUp className="h-4 w-4 text-success" />
              Who Owes You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBalances
                .filter((b) => b.type === "owes")
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-xs text-primary">
                          {item.member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{item.member.name}</p>
                        <p className="text-xs text-muted-foreground">{item.member.address}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-success">{item.balance.replace("-", "")}</span>
                  </div>
                ))}
              {mockBalances.filter((b) => b.type === "owes").length === 0 && (
                <p className="text-sm text-muted-foreground">No one owes you</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Who You Owe */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <TrendingDown className="h-4 w-4 text-destructive" />
              Who You Owe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBalances
                .filter((b) => b.type === "owed")
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-xs text-primary">
                          {item.member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{item.member.name}</p>
                        <p className="text-xs text-muted-foreground">{item.member.address}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-destructive">{item.balance}</span>
                  </div>
                ))}
              {mockBalances.filter((b) => b.type === "owed").length === 0 && (
                <p className="text-sm text-muted-foreground">You don't owe anyone</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimized Settlement Plan */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Optimized Settlement Plan</CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {mockSettlements.length} transfers
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Minimized Transfers</AlertTitle>
            <AlertDescription>
              This plan minimizes the number of transactions needed to settle all debts in the group.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            {mockSettlements.map((settlement) => (
              <div
                key={settlement.id}
                className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-destructive/10 text-destructive">
                      {settlement.from.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-sm font-medium">{settlement.from.name}</p>
                      <p className="text-xs text-muted-foreground">{settlement.from.address}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{settlement.to.name}</p>
                      <p className="text-xs text-muted-foreground">{settlement.to.address}</p>
                    </div>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-success/10 text-success">{settlement.to.initials}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-foreground">{settlement.amount}</span>
                  <Button size="sm" onClick={() => openSettleDialog(settlement)}>
                    Settle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settlement Dialog */}
      <Dialog open={settleDialogOpen} onOpenChange={setSettleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Settlement</DialogTitle>
            <DialogDescription>Send payment to settle this debt on-chain</DialogDescription>
          </DialogHeader>

          {selectedSettlement && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <Avatar className="mx-auto h-12 w-12">
                    <AvatarFallback className="bg-destructive/10 text-destructive">
                      {selectedSettlement.from.initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="mt-2 font-medium">{selectedSettlement.from.name}</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="text-center">
                  <Avatar className="mx-auto h-12 w-12">
                    <AvatarFallback className="bg-success/10 text-success">
                      {selectedSettlement.to.initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="mt-2 font-medium">{selectedSettlement.to.name}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    type="number"
                    className="pl-7"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-lg bg-muted p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Creditor Address</span>
                  <span className="font-mono">{selectedSettlement.to.address}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Network</span>
                  <span>Polygon</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Gas</span>
                  <span>~0.003 MATIC</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSettleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSettle} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Processing..." : "Confirm Settlement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
