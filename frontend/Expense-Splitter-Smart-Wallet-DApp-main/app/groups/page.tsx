import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { GroupsListContent } from "@/components/groups/groups-list-content"

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <GroupsListContent />
      </main>
      <MobileNav />
    </div>
  )
}
