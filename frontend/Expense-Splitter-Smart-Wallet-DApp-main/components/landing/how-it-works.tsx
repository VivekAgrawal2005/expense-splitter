import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Create a Group",
    description: "Start a new expense group and invite your friends using their wallet addresses or a shareable link.",
  },
  {
    number: "02",
    title: "Add Expenses",
    description: "Record expenses as they happen. Upload receipts, split costs equally or custom, and track who paid.",
  },
  {
    number: "03",
    title: "Approve & Verify",
    description: "Group members review and approve expenses. Disputed items are frozen until resolved.",
  },
  {
    number: "04",
    title: "Settle Up",
    description: "When ready, settle all debts with optimized on-chain transfers. Simple, trustless, and transparent.",
  },
]

export function LandingHowItWorks() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How it works</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Four simple steps to stress-free expense sharing
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-full translate-x-1/2 bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                )}

                <div className="relative rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                    {index < steps.length - 1 && <ArrowRight className="h-5 w-5 text-primary lg:hidden" />}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
