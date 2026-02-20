"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Search,
  MoreVertical,
  Eye,
  CheckCircle,
  AlertTriangle,
  Receipt,
  Upload,
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  ImageIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExpensesTabProps {
  groupId: string
  isCreator: boolean
}

const mockExpenses = [
  {
    id: "1",
    payer: { name: "Alex", address: "0x1234...5678", initials: "AS" },
    amount: "$420.00",
    description: "Hotel booking - 3 nights",
    date: "Dec 15, 2024",
    status: "approved",
    tags: ["personal"],
    receiptUrl: "/hotel-receipt.jpg",
    participants: 5,
  },
  {
    id: "2",
    payer: { name: "Jordan", address: "0xabcd...ef12", initials: "JK" },
    amount: "$185.50",
    description: "Dinner at Locavore",
    date: "Dec 14, 2024",
    status: "pending",
    tags: ["pooled"],
    receiptUrl: "/restaurant-receipt.png",
    participants: 5,
  },
  {
    id: "3",
    payer: { name: "Sarah", address: "0x9876...5432", initials: "SM" },
    amount: "$85.00",
    description: "Uber to airport",
    date: "Dec 13, 2024",
    status: "pending",
    tags: ["personal"],
    receiptUrl: null,
    participants: 3,
  },
  {
    id: "4",
    payer: { name: "Mike", address: "0xdef0...1234", initials: "MR" },
    amount: "$42.00",
    description: "Bar tab - beach club",
    date: "Dec 12, 2024",
    status: "disputed",
    tags: ["personal"],
    receiptUrl: "/bar-receipt.jpg",
    participants: 4,
  },
]

const mockMembers = [
  { id: "1", name: "Alex", address: "0x1234...5678" },
  { id: "2", name: "Jordan", address: "0xabcd...ef12" },
  { id: "3", name: "Sarah", address: "0x9876...5432" },
  { id: "4", name: "Mike", address: "0xdef0...1234" },
  { id: "5", name: "Emma", address: "0x5678...90ab" },
]

export function ExpensesTab({ groupId, isCreator }: ExpensesTabProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<(typeof mockExpenses)[0] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [isEqualSplit, setIsEqualSplit] = useState(true)
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(mockMembers.map((m) => m.id))
  const [isPooled, setIsPooled] = useState(false)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [ocrText, setOcrText] = useState("")

  const filteredExpenses = mockExpenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.payer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateExpense = async () => {
    if (!amount || !description) return

    setIsSubmitting(true)
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setCreateDialogOpen(false)
    resetForm()

    toast({
      title: "Expense Created",
      description: "Your expense has been submitted for approval",
    })
  }

  const handleApprove = async (expenseId: string) => {
    toast({
      title: "Approving...",
      description: "Submitting approval transaction",
    })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast({
      title: "Approved!",
      description: "Expense has been approved on-chain",
    })
  }

  const handleDispute = async (expenseId: string) => {
    toast({
      title: "Disputing...",
      description: "Submitting dispute transaction",
    })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast({
      title: "Disputed!",
      description: "Expense has been flagged for review",
    })
  }

  const resetForm = () => {
    setAmount("")
    setDescription("")
    setIsEqualSplit(true)
    setSelectedParticipants(mockMembers.map((m) => m.id))
    setIsPooled(false)
    setReceiptFile(null)
    setOcrText("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReceiptFile(file)
      // Simulate OCR
      setTimeout(() => {
        setOcrText("Hotel Nusa Dua\nRoom: Deluxe Ocean View\nTotal: $420.00\nDate: Dec 15, 2024")
      }, 1000)
    }
  }

  const viewExpense = (expense: (typeof mockExpenses)[0]) => {
    setSelectedExpense(expense)
    setViewDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>Record an expense and split it with group members</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="matic">MATIC</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="e.g., Hotel booking"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Participants</Label>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm">Split Equally</span>
                  <Switch checked={isEqualSplit} onCheckedChange={setIsEqualSplit} />
                </div>

                <div className="space-y-2 rounded-lg border border-border p-3">
                  {mockMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
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
                      {!isEqualSplit && (
                        <Input
                          type="number"
                          placeholder="Share"
                          className="w-20 h-8 text-sm"
                          disabled={!selectedParticipants.includes(member.id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <span className="text-sm font-medium">Pay from Pooled Wallet</span>
                  <p className="text-xs text-muted-foreground">Expense will be deducted from group pool</p>
                </div>
                <Switch checked={isPooled} onCheckedChange={setIsPooled} />
              </div>

              <div className="space-y-2">
                <Label>Receipt (Optional)</Label>
                <div className="rounded-lg border border-dashed border-border p-4">
                  {receiptFile ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-5 w-5 text-success" />
                        <span className="text-sm font-medium">{receiptFile.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setReceiptFile(null)
                            setOcrText("")
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                      {ocrText && (
                        <div className="space-y-2">
                          <Label className="text-xs">OCR Preview (Editable)</Label>
                          <Textarea value={ocrText} onChange={(e) => setOcrText(e.target.value)} className="text-xs" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to upload receipt</span>
                      <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                  )}
                </div>
                {receiptFile && (
                  <p className="text-xs text-muted-foreground">
                    Receipt will be uploaded to IPFS. Hash: {receiptFile ? "ipfs://Qm..." : ""}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateExpense} disabled={isSubmitting || !amount || !description}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Add Expense"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Expenses List */}
      <div className="space-y-3">
        {filteredExpenses.map((expense) => (
          <Card key={expense.id} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Payer Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {expense.payer.initials}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-foreground">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {expense.payer.name} paid • {expense.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">{expense.amount}</p>
                      <p className="text-xs text-muted-foreground">Split {expense.participants} ways</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={expense.status} />
                    {expense.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs capitalize">
                        {tag}
                      </Badge>
                    ))}
                    {expense.receiptUrl && (
                      <Badge variant="outline" className="gap-1 text-xs">
                        <ImageIcon className="h-3 w-3" />
                        Receipt
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => viewExpense(expense)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    {expense.status === "pending" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleApprove(expense.id)} className="text-success">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDispute(expense.id)} className="text-destructive">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Dispute
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Expense Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
          </DialogHeader>
          {selectedExpense && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-medium text-primary">
                  {selectedExpense.payer.initials}
                </div>
                <div>
                  <p className="font-semibold">{selectedExpense.payer.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedExpense.payer.address}</p>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold">{selectedExpense.amount}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>{selectedExpense.date}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-muted-foreground">Participants</span>
                  <span>{selectedExpense.participants} people</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-muted-foreground">Per Person</span>
                  <span>
                    $
                    {(
                      Number.parseFloat(selectedExpense.amount.replace("$", "")) / selectedExpense.participants
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {selectedExpense.receiptUrl && (
                <div className="space-y-2">
                  <Label>Receipt</Label>
                  <div className="overflow-hidden rounded-lg border border-border">
                    <img src={selectedExpense.receiptUrl || "/placeholder.svg"} alt="Receipt" className="w-full" />
                  </div>
                </div>
              )}

              {selectedExpense.status === "pending" && (
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 gap-2" onClick={() => handleApprove(selectedExpense.id)}>
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 gap-2"
                    onClick={() => handleDispute(selectedExpense.id)}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Dispute
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "approved":
      return (
        <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
          <CheckCircle2 className="h-3 w-3" />
          Approved
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="secondary" className="gap-1 bg-warning/10 text-warning">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      )
    case "disputed":
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          Disputed
        </Badge>
      )
    default:
      return null
  }
}
