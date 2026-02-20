"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Copy, ExternalLink, Crown } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface GroupHeaderProps {
  group: {
    id: string
    name: string
    creatorAddress: string
    isCreator: boolean
    members: number
    pooledBalance: string
    onChainId: string
    status: string
  }
}

export function GroupHeader({ group }: GroupHeaderProps) {
  const { toast } = useToast()

  const copyOnChainId = () => {
    navigator.clipboard.writeText(group.onChainId)
    toast({
      title: "Copied!",
      description: "On-chain group ID copied to clipboard",
    })
  }

  return (
    <div className="space-y-4">
      <Link
        href="/groups"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Groups
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{group.name}</h1>
            {group.isCreator && (
              <Badge variant="secondary" className="gap-1 bg-warning/10 text-warning">
                <Crown className="h-3 w-3" />
                Creator
              </Badge>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {group.members} members
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-foreground">{group.pooledBalance}</span>
              pooled
            </div>
            <button
              onClick={copyOnChainId}
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Copy className="h-3.5 w-3.5" />
              {group.onChainId}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
            <a href={`https://polygonscan.com/address/${group.onChainId}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View on Explorer
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
