import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function LandingCTA() {
  return (
    <section className="border-t border-border bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Start for free
        </div>

        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Ready to simplify your group expenses?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          Join thousands of groups who have settled over $2M in expenses on SplitChain. No fees for creating groups or
          adding expenses.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="h-12 gap-2 px-8 text-base" asChild>
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent" asChild>
            <Link href="/docs">Read Documentation</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { value: "10k+", label: "Active Users" },
            { value: "$2M+", label: "Settled" },
            { value: "50k+", label: "Expenses Tracked" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
