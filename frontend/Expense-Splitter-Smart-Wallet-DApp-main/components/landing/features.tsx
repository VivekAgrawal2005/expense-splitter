import { Receipt, Wallet, Scale, FileCheck, ShieldCheck, ArrowRightLeft } from "lucide-react"

const features = [
  {
    icon: Receipt,
    title: "On-chain Accounting",
    description:
      "Every expense is recorded on the Polygon blockchain, ensuring complete transparency and immutability.",
  },
  {
    icon: Wallet,
    title: "Pooled Wallets",
    description: "Pool funds before your trip. Spend directly from the shared wallet with automatic tracking.",
  },
  {
    icon: Scale,
    title: "Fair Splitting",
    description: "Split expenses equally or custom. The smart contract ensures everyone pays their fair share.",
  },
  {
    icon: FileCheck,
    title: "Receipt Verification",
    description: "Upload receipts to IPFS with OCR. Content-addressed storage ensures authenticity.",
  },
  {
    icon: ShieldCheck,
    title: "Dispute Resolution",
    description: "Built-in dispute mechanism. Approve, dispute, or edit expenses with full audit trail.",
  },
  {
    icon: ArrowRightLeft,
    title: "Easy Settlements",
    description: "One-click settlement calculates the optimal payment plan to minimize transactions.",
  },
]

export function LandingFeatures() {
  return (
    <section className="border-t border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for group expenses
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Built for transparency, designed for simplicity. No more spreadsheets or awkward conversations.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
