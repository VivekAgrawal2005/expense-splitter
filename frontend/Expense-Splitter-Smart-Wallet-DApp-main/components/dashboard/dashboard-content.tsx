"use client"

import { useState } from "react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardStats } from "./dashboard-stats"
import { GroupsGrid } from "./groups-grid"
import { NotificationsSidebar } from "./notifications-sidebar"
import { QuickActions } from "./quick-actions"

export function DashboardContent() {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [isJoinGroupOpen, setIsJoinGroupOpen] = useState(false)

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <DashboardStats />
          <QuickActions onCreateGroup={() => setIsCreateGroupOpen(true)} onJoinGroup={() => setIsJoinGroupOpen(true)} />
          <GroupsGrid />
        </div>
        <div className="lg:col-span-1">
          <NotificationsSidebar />
        </div>
      </div>
    </div>
  )
}
