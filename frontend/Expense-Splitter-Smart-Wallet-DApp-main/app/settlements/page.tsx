import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { GlobalSettlementsContent } from "@/components/settlements/global-settlements-content"

export default function SettlementsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <GlobalSettlementsContent />
      </main>
      <MobileNav />
    </div>
  )
}
