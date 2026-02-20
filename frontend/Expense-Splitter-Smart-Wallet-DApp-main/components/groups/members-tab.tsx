"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Crown, UserPlus, Copy, ExternalLink, Loader2, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MembersTabProps {
  groupId: string
  isCreator: boolean
}

const mockMembers = [
  {
    id: "1",
    name: "Alex",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    shortAddress: "0x1234...5678",
    initials: "AS",
    role: "creator",
    joinedAt: "Dec 10, 2024",
    balance: "+$215.50",
    balanceType: "owed",
  },
  {
    id: "2",
    name: "Jordan",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    shortAddress: "0xabcd...ef12",
    initials: "JK",
    role: "member",
    joinedAt: "Dec 10, 2024",
    balance: "-$85.00",
    balanceType: "owes",
  },
  {
    id: "3",
    name: "Sarah",
    address: "0x9876543210fedcba9876543210fedcba98765432",
    shortAddress: "0x9876...5432",
    initials: "SM",
    role: "member",
    joinedAt: "Dec 11, 2024",
    balance: "+$42.00",
    balanceType: "owed",
  },
  {
    id: "4",
    name: "Mike",
    address: "0xdef0123456789abcdef0123456789abcdef01234",
    shortAddress: "0xdef0...1234",
    initials: "MR",
    role: "member",
    joinedAt: "Dec 11, 2024",
    balance: "-$127.00",
    balanceType: "owes",
  },
  {
    id: "5",
    name: "Emma",
    address: "0x567890abcdef1234567890abcdef1234567890ab",
    shortAddress: "0x5678...90ab",
    initials: "EW",
    role: "member",
    joinedAt: "Dec 12, 2024",
    balance: "$0.00",
    balanceType: "settled",
  },
]

export function MembersTab({ groupId, isCreator }: MembersTabProps) {
  const { toast } = useToast()
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newMemberAddress, setNewMemberAddress] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [copiedInvite, setCopiedInvite] = useState(false)

  const inviteLink = `https://splitchain.app/join/${groupId}`
  const inviteCode = "BALI2024"

  const handleAddMember = async () => {
    if (!newMemberAddress.trim()) return

    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsAdding(false)
    setAddDialogOpen(false)
    setNewMemberAddress("")

    toast({
      title: "Member Added",
      description: "Transaction confirmed. New member has been added to the group.",
    })
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopiedInvite(true)
    toast({
      title: "Copied!",
      description: "Invite link copied to clipboard",
    })
    setTimeout(() => setCopiedInvite(false), 2000)
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    })
  }

  return (
    <div className="space-y-6">
      {/* Invite Section */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Invite Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Label className="text-xs text-muted-foreground">Invite Code</Label>
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                <span className="font-mono text-lg font-bold tracking-wider text-foreground">{inviteCode}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(inviteCode)
                    toast({ title: "Copied!", description: "Invite code copied" })
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 bg-transparent" onClick={copyInviteLink}>
                {copiedInvite ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedInvite ? "Copied!" : "Copy Link"}
              </Button>

              {isCreator && (
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Member</DialogTitle>
                      <DialogDescription>Add a new member to this group using their wallet address</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Wallet Address</Label>
                        <Input
                          id="address"
                          placeholder="0x..."
                          value={newMemberAddress}
                          onChange={(e) => setNewMemberAddress(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This will submit a transaction to add the member on-chain. Gas fees apply.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddMember} disabled={isAdding || !newMemberAddress.trim()}>
                        {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isAdding ? "Adding..." : "Add Member"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{mockMembers.length} Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{member.name}</span>
                      {member.role === "creator" && (
                        <Badge variant="secondary" className="gap-1 bg-warning/10 text-warning">
                          <Crown className="h-3 w-3" />
                          Creator
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-xs text-muted-foreground">{member.shortAddress}</span>
                      <button onClick={() => copyAddress(member.address)} className="hover:text-foreground">
                        <Copy className="h-3 w-3 text-muted-foreground" />
                      </button>
                      <a
                        href={`https://polygonscan.com/address/${member.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground"
                      >
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      member.balanceType === "owed"
                        ? "text-success"
                        : member.balanceType === "owes"
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {member.balance}
                  </p>
                  <p className="text-xs text-muted-foreground">Joined {member.joinedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
