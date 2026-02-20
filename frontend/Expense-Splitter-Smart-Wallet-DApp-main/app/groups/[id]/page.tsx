import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { GroupDetailContent } from "@/components/groups/group-detail-content"

export default async function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <GroupDetailContent groupId={id} />
      </main>
      <MobileNav />
    </div>
  )
}
