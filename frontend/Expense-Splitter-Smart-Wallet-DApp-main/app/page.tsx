import { LandingHero } from "@/components/landing/hero"
import { LandingFeatures } from "@/components/landing/features"
import { LandingHowItWorks } from "@/components/landing/how-it-works"
import { LandingCTA } from "@/components/landing/cta"
import { LandingFooter } from "@/components/landing/footer"
import { Navbar } from "@/components/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  )
}
