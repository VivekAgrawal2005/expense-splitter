"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Wallet, Plus, Minus, AlertTriangle, Loader2, ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PooledWalletTabProps {
  groupId: string
}

const mockMembers = [
  { id: "1", name: "Alex", address: "0x1234...5678" },
  { id: "2", name: "Jordan", address: "0xabcd...ef12" },
  { id: "3", name: "Sarah", address: "0x9876...5432" },
  { id: "4", name: "Mike", address: "0xdef0...1234" },
  { id: "5", name: "Emma", address: "0x5678...90ab" },
]

const mockTransactions = [
  {
    id: "1",
    type: "contribution",
    from: "Alex",
    amount: "$500.00",
    date: "Dec 15, 2024",
    txHash: "0xabc...123",
  },
  {
    id: "2",
    type: "contribution",
    from: "Jordan",
    amount: "$300.00",
    date: "Dec 14, 2024",
    txHash: "0xdef...456",
  },
  {
    id: "3",
    type: "expense",
    to: "Hotel Booking",
    amount: "$420.00",
    date: "Dec 13, 2024",
    txHash: "0xghi...789",
  },
  {
    id: "4",
    type: "contribution",
    from: "Sarah",
    amount: "$250.00",
    date: "Dec 12, 2024",
    txHash: "0xjkl...012",
  },
  {
    id: "5",
    type: "contribution",
    from: "Mike",
    amount: "$200.00",
    date: "Dec 11, 2024",
    txHash: "0xmno...345",
  },
]

export function PooledWalletTab({ groupId }: PooledWalletTabProps) {
  const { toast } = useToast()
  const [contributeDialogOpen, setContributeDialogOpen] = useState(false)
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)
  const [spendDialogOpen, setSpendDialogOpen] = useState(false)
  const [contributeAmount, setContributeAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [spendAmount, setSpendAmount] = useState("")
  const [spendReason, setSpendReason] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(mockMembers.map((m) => m.id))
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data
  const pooledBalance = 1250.0
  const yourContribution = 500.0
  const hasActiveDispute = true
  const hasPendingExpenses = false

  const handleContribute = async () => {
    if (!contributeAmount) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setContributeDialogOpen(false)
    setContributeAmount("")
    toast({
      title: "Contribution Successful",
      description: `$${contributeAmount} has been added to the pool`,
    })
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setWithdrawDialogOpen(false)
    setWithdrawAmount("")
    toast({
      title: "Withdrawal Successful",
      description: `$${withdrawAmount} has been withdrawn from the pool`,
    })
  }

  const handleSpend = async () => {
    if (!spendAmount || !spendReason) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setSpendDialogOpen(false)
    setSpendAmount("")
    setSpendReason("")
    toast({
      title: "Expense Created",
      description: "Pooled expense has been submitted for approval",
    })
  }

  return (
    <div className="space-y-6">
      {/* Dispute Alert */}
      {hasActiveDispute && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Active Dispute</AlertTitle>
          <AlertDescription>
            There is an active dispute in this group. Withdrawals are temporarily locked until the dispute is resolved.
          </AlertDescription>
        </Alert>
      )}

      {/* Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pooled Balance</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-2 text-3xl font-bold text-primary">${pooledBalance.toFixed(2)}</div>
            <p className="mt-1 text-xs text-muted-foreground">Available for group expenses</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your Contribution</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <ArrowUpRight className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="mt-2 text-3xl font-bold text-success">${yourContribution.toFixed(2)}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {((yourContribution / pooledBalance) * 100).toFixed(1)}% of pool
            </p>
          </CardContent>
        </Card>

        <Card className="border-border sm:col-span-2 lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your Share</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <ArrowDownLeft className="h-5 w-5 text-accent" />
              </div>
            </div>
            <div className="mt-2 text-3xl font-bold text-foreground">${(pooledBalance / 5).toFixed(2)}</div>
            <p className="mt-1 text-xs text-muted-foreground">Equal split among 5 members</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Dialog open={contributeDialogOpen} onOpenChange={setContributeDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Contribute
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contribute to Pool</DialogTitle>
              <DialogDescription>Add funds to the group's pooled wallet</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="contribute-amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="contribute-amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-7"
                    value={contributeAmount}
                    onChange={(e) => setContributeAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network</span>
                  <span>Polygon</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Est. Gas</span>
                  <span>~0.005 MATIC</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setContributeDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleContribute} disabled={isSubmitting || !contributeAmount}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Processing..." : "Contribute"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 bg-transparent"
              disabled={hasActiveDispute || hasPendingExpenses}
            >
              <Minus className="h-4 w-4" />
              Withdraw
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw from Pool</DialogTitle>
              <DialogDescription>Withdraw your share from the pooled wallet</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You can only withdraw your proportional share based on contributions.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount (Max: ${yourContribution.toFixed(2)})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-7"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    max={yourContribution}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleWithdraw} disabled={isSubmitting || !withdrawAmount}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Processing..." : "Withdraw"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={spendDialogOpen} onOpenChange={setSpendDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent" disabled={hasActiveDispute}>
              <Wallet className="h-4 w-4" />
              Spend from Pool
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Pooled Expense</DialogTitle>
              <DialogDescription>Spend from the pooled wallet and create an expense</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="spend-amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="spend-amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-7"
                    value={spendAmount}
                    onChange={(e) => setSpendAmount(e.target.value)}
                    max={pooledBalance}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Available: ${pooledBalance.toFixed(2)}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spend-reason">Reason</Label>
                <Textarea
                  id="spend-reason"
                  placeholder="e.g., Group dinner, Transportation"
                  value={spendReason}
                  onChange={(e) => setSpendReason(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Split Among</Label>
                <div className="space-y-2 rounded-lg border border-border p-3">
                  {mockMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedParticipants.includes(member.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedParticipants([...selectedParticipants, member.id])
                          } else {
                            setSelectedParticipants(selectedParticipants.filter((id) => id !== member.id))
                          }
                        }}
                      />
                      <span className="text-sm">{member.name}</span>
                      <span className="text-xs text-muted-foreground">{member.address}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSpendDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSpend} disabled={isSubmitting || !spendAmount || !spendReason}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Processing..." : "Create Expense"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Transaction History */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${tx.type === "contribution" ? "bg-success/10" : "bg-destructive/10"}`}
                  >
                    {tx.type === "contribution" ? (
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {tx.type === "contribution" ? `${tx.from} contributed` : `Spent on ${tx.to}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-semibold ${tx.type === "contribution" ? "text-success" : "text-destructive"}`}>
                    {tx.type === "contribution" ? "+" : "-"}
                    {tx.amount}
                  </span>
                  <a
                    href={`https://polygonscan.com/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
