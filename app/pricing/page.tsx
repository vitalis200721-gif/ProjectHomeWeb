import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "€0",
    desc: "Try the core experience.",
    features: ["Browse projects", "Contact form", "Basic dashboard"],
    cta: "Get started",
    href: "/auth/sign-up",
    highlight: false,
  },
  {
    name: "Pro",
    price: "€19",
    desc: "For serious clients and teams.",
    features: [
      "Unlimited projects",
      "Saved favorites",
      "Priority support",
      "Advanced filters",
    ],
    cta: "Start Pro",
    href: "/auth/sign-up",
    highlight: true,
  },
  {
    name: "Business",
    price: "€49",
    desc: "For agencies & scaling.",
    features: [
      "Team access",
      "Client-ready exports",
      "Custom branding",
      "Dedicated onboarding",
    ],
    cta: "Contact sales",
    href: "/#contact",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Simple pricing that scales
        </h1>
        <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">
          Choose a plan that fits your needs. Upgrade any time.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={[
              "relative rounded-2xl border p-6 shadow-sm backdrop-blur",
              p.highlight
                ? "border-neutral-900/20 bg-white/80 dark:border-neutral-100/20 dark:bg-neutral-950/70"
                : "border-neutral-200/70 bg-white/60 dark:border-neutral-800/70 dark:bg-neutral-950/50",
            ].join(" ")}
          >
            {p.highlight ? (
              <div className="absolute -top-3 right-4 rounded-full border border-neutral-900/10 bg-white px-3 py-1 text-xs font-medium text-neutral-900 shadow-sm dark:border-neutral-100/15 dark:bg-neutral-950 dark:text-neutral-100">
                Most popular
              </div>
            ) : null}

            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <div className="text-2xl font-semibold">{p.price}</div>
            </div>

            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {p.desc}
            </p>

            <ul className="mt-5 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-neutral-900/60 dark:bg-neutral-100/60" />
                  <span className="text-neutral-700 dark:text-neutral-300">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={p.href}
              className={[
                "mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
                p.highlight
                  ? "bg-neutral-900 text-white hover:opacity-90 dark:bg-neutral-100 dark:text-neutral-900"
                  : "border border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900",
              ].join(" ")}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-neutral-200/70 bg-white/60 p-6 text-center text-sm text-neutral-700 backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-950/50 dark:text-neutral-300">
        Have questions?{" "}
        <Link className="font-medium underline" href="/#contact">
          Contact us
        </Link>{" "}
        and we’ll help you choose the best plan.
      </div>
    </main>
  );
}
