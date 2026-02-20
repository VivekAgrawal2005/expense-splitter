"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/2 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Powered by Polygon
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Split Expenses. <span className="text-primary">Pool Funds.</span> Settle Trustlessly.
            </h1>

            <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
              Stop arguing over who owes what. Let the blockchain handle the math. Create groups, track expenses, and
              settle debts with complete transparency.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" className="h-12 gap-2 px-6 text-base" asChild>
                <Link href="/dashboard">
                  Create Group
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 gap-2 px-6 text-base bg-transparent">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-warning" />
                <span>Fast Settlements</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                <span>On-chain Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>10k+ Users</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-card-foreground">Trip to Bali 🌴</h3>
                  <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                    Active
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        AS
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">Alex paid</p>
                        <p className="text-sm text-muted-foreground">Hotel booking</p>
                      </div>
                    </div>
                    <span className="font-semibold text-card-foreground">$420.00</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-medium text-accent">
                        JK
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">Jordan paid</p>
                        <p className="text-sm text-muted-foreground">Dinner at Locavore</p>
                      </div>
                    </div>
                    <span className="font-semibold text-card-foreground">$185.50</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pooled Balance</span>
                    <span className="text-lg font-bold text-primary">$1,250.00</span>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -right-4 -top-4 rounded-xl border border-border bg-card p-4 shadow-lg sm:-right-8 sm:-top-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                    <Shield className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="font-medium text-card-foreground">On-chain ✓</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-4 shadow-lg sm:-bottom-8 sm:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Members</p>
                    <p className="font-medium text-card-foreground">5 people</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
