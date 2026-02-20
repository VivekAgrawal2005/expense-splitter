"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileEdit,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface DisputesTabProps {
  groupId: string
}

const mockLogs = [
  {
    id: "1",
    expenseId: "exp-1",
    expenseDescription: "Bar tab - beach club",
    amount: "$42.00",
    events: [
      {
        type: "created",
        user: { name: "Mike", initials: "MR" },
        timestamp: "Dec 12, 2024 14:30",
        txHash: "0xabc...123",
        details: "Expense created",
      },
      {
        type: "approved",
        user: { name: "Alex", initials: "AS" },
        timestamp: "Dec 12, 2024 15:00",
        txHash: "0xdef...456",
        details: "Approved expense",
      },
      {
        type: "approved",
        user: { name: "Sarah", initials: "SM" },
        timestamp: "Dec 12, 2024 15:15",
        txHash: "0xghi...789",
        details: "Approved expense",
      },
      {
        type: "disputed",
        user: { name: "Jordan", initials: "JK" },
        timestamp: "Dec 12, 2024 16:00",
        txHash: "0xjkl...012",
        details: "Amount seems too high for 2 drinks",
        onChain: true,
      },
    ],
    status: "disputed",
  },
  {
    id: "2",
    expenseId: "exp-2",
    expenseDescription: "Hotel booking - 3 nights",
    amount: "$420.00",
    events: [
      {
        type: "created",
        user: { name: "Alex", initials: "AS" },
        timestamp: "Dec 15, 2024 10:00",
        txHash: "0xmno...345",
        details: "Expense created with receipt",
      },
      {
        type: "approved",
        user: { name: "Jordan", initials: "JK" },
        timestamp: "Dec 15, 2024 10:30",
        txHash: "0xpqr...678",
        details: "Approved expense",
      },
      {
        type: "approved",
        user: { name: "Sarah", initials: "SM" },
        timestamp: "Dec 15, 2024 11:00",
        txHash: "0xstu...901",
        details: "Approved expense",
      },
      {
        type: "approved",
        user: { name: "Mike", initials: "MR" },
        timestamp: "Dec 15, 2024 11:30",
        txHash: "0xvwx...234",
        details: "Approved expense",
      },
      {
        type: "approved",
        user: { name: "Emma", initials: "EW" },
        timestamp: "Dec 15, 2024 12:00",
        txHash: "0xyz...567",
        details: "Approved expense",
      },
    ],
    status: "approved",
  },
  {
    id: "3",
    expenseId: "exp-3",
    expenseDescription: "Dinner at Locavore",
    amount: "$185.50",
    events: [
      {
        type: "created",
        user: { name: "Jordan", initials: "JK" },
        timestamp: "Dec 14, 2024 20:00",
        txHash: "0xaaa...111",
        details: "Expense created",
      },
    ],
    status: "pending",
  },
]

export function DisputesTab({ groupId }: DisputesTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [expandedLogs, setExpandedLogs] = useState<string[]>([mockLogs[0].id])

  const toggleExpand = (id: string) => {
    setExpandedLogs((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.expenseDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.events.some((e) => e.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by expense or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="disputed">Disputed</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timeline Logs */}
      <div className="space-y-4">
        {filteredLogs.map((log) => {
          const isExpanded = expandedLogs.includes(log.id)

          return (
            <Card key={log.id} className="border-border">
              <CardHeader className="pb-2">
                <button
                  onClick={() => toggleExpand(log.id)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon status={log.status} />
                    <div>
                      <CardTitle className="text-base font-semibold">{log.expenseDescription}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {log.amount} • {log.events.length} events
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={log.status} />
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </button>
              </CardHeader>

              {isExpanded && (
                <CardContent>
                  <div className="relative ml-4 border-l-2 border-border pl-6">
                    {log.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="relative pb-6 last:pb-0">
                        {/* Timeline dot */}
                        <div
                          className={`absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-background ${
                            event.type === "disputed"
                              ? "bg-destructive"
                              : event.type === "approved"
                                ? "bg-success"
                                : event.type === "edited"
                                  ? "bg-warning"
                                  : "bg-primary"
                          }`}
                        />

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 shrink-0">
                              <AvatarFallback className="text-xs bg-muted">{event.user.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm">
                                <span className="font-medium">{event.user.name}</span>{" "}
                                <span className="text-muted-foreground">
                                  {event.type === "created" && "created expense"}
                                  {event.type === "approved" && "approved"}
                                  {event.type === "disputed" && "disputed"}
                                  {event.type === "edited" && "edited"}
                                  {event.type === "resolved" && "resolved dispute"}
                                </span>
                              </p>
                              {event.details && event.type === "disputed" && (
                                <p className="mt-1 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                                  "{event.details}"
                                </p>
                              )}
                              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {event.timestamp}
                                {event.txHash && (
                                  <a
                                    href={`https://polygonscan.com/tx/${event.txHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-primary hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    {event.txHash}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {log.status === "disputed" && (
                    <div className="mt-4 flex gap-2 border-t border-border pt-4">
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <FileEdit className="h-4 w-4" />
                        Edit Expense
                      </Button>
                      <Button size="sm" className="gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Resolve Dispute
                      </Button>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {filteredLogs.length === 0 && (
        <Card className="border-border">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">No Activity Found</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">No expense logs match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "approved":
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-5 w-5 text-success" />
        </div>
      )
    case "disputed":
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
      )
    case "pending":
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
          <Clock className="h-5 w-5 text-warning" />
        </div>
      )
    default:
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <Clock className="h-5 w-5 text-muted-foreground" />
        </div>
      )
  }
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "approved":
      return (
        <Badge variant="secondary" className="bg-success/10 text-success">
          Approved
        </Badge>
      )
    case "disputed":
      return <Badge variant="destructive">Disputed</Badge>
    case "pending":
      return (
        <Badge variant="secondary" className="bg-warning/10 text-warning">
          Pending
        </Badge>
      )
    case "resolved":
      return (
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          Resolved
        </Badge>
      )
    default:
      return null
  }
}
