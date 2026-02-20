import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { ProfileContent } from "@/components/profile/profile-content"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ProfileContent />
      </main>
      <MobileNav />
    </div>
  )
}
