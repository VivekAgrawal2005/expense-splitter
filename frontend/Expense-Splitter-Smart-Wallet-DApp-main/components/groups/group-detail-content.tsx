"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GroupHeader } from "./group-header"
import { ExpensesTab } from "./expenses-tab"
import { MembersTab } from "./members-tab"
import { PooledWalletTab } from "./pooled-wallet-tab"
import { SettlementsTab } from "./settlements-tab"
import { DisputesTab } from "./disputes-tab"

interface GroupDetailContentProps {
  groupId: string
}

// Mock group data
const mockGroup = {
  id: "1",
  name: "Trip to Bali",
  creatorAddress: "0x1234...5678",
  isCreator: true,
  members: 5,
  pooledBalance: "$1,250.00",
  onChainId: "0xabc...def",
  status: "active",
}

export function GroupDetailContent({ groupId }: GroupDetailContentProps) {
  const [activeTab, setActiveTab] = useState("expenses")

  return (
    <div className="space-y-6">
      <GroupHeader group={mockGroup} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="expenses" className="text-xs sm:text-sm">
            Expenses
          </TabsTrigger>
          <TabsTrigger value="members" className="text-xs sm:text-sm">
            Members
          </TabsTrigger>
          <TabsTrigger value="wallet" className="text-xs sm:text-sm">
            Wallet
          </TabsTrigger>
          <TabsTrigger value="settlements" className="text-xs sm:text-sm">
            Settle
          </TabsTrigger>
          <TabsTrigger value="disputes" className="text-xs sm:text-sm">
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="mt-6">
          <ExpensesTab groupId={groupId} isCreator={mockGroup.isCreator} />
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <MembersTab groupId={groupId} isCreator={mockGroup.isCreator} />
        </TabsContent>

        <TabsContent value="wallet" className="mt-6">
          <PooledWalletTab groupId={groupId} />
        </TabsContent>

        <TabsContent value="settlements" className="mt-6">
          <SettlementsTab groupId={groupId} />
        </TabsContent>

        <TabsContent value="disputes" className="mt-6">
          <DisputesTab groupId={groupId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
