import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

type PlanId = "starter" | "pro" | "studio";
type Plan = {
  id: PlanId;
  name: string;
  price: string;
  note: string;
  features: string[];
  highlight?: boolean;
  ctaLabel: string;
  ctaHref: string;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "€199",
    note: "one-time / from",
    features: ["Landing page", "Gallery section", "Basic SEO"],
    ctaLabel: "Get started",
    ctaHref: "/contact?plan=starter",
  },
  {
    id: "pro",
    name: "Pro",
    price: "€399",
    note: "one-time / from",
    features: ["Everything in Starter", "Auth + Dashboard", "Project listing pages"],
    highlight: true,
    ctaLabel: "Get started",
    ctaHref: "/contact?plan=pro",
  },
  {
    id: "studio",
    name: "Studio",
    price: "€799",
    note: "one-time / from",
    features: ["Everything in Pro", "Custom pages", "Email form + integrations"],
    ctaLabel: "Get started",
    ctaHref: "/contact?plan=studio",
  },
];

function PriceCard({
  name,
  price,
  note,
  features,
  highlight,
  ctaLabel,
  ctaHref,
}: {
  name: string;
  price: string;
  note: string;
  features: string[];
  highlight?: boolean;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div
      className={`relative rounded-3xl border p-8 bg-white/80 ${
        highlight ? "border-neutral-900/15 shadow-xl" : "border-neutral-900/10"
      }`}
    >
      {highlight ? (
        <div className="absolute -top-3 left-6 rounded-full border border-neutral-900/10 bg-white px-3 py-1 text-xs font-semibold text-neutral-900">
          Most popular
        </div>
      ) : null}

      <div className="text-neutral-900 font-semibold text-lg">{name}</div>

      <div className="mt-3 flex items-end gap-2">
        <div className="text-4xl font-bold text-neutral-900">{price}</div>
        <div className="pb-1 text-sm text-neutral-600">{note}</div>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-neutral-700">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-neutral-900/70" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
          highlight
            ? "bg-neutral-900 text-white hover:bg-neutral-800"
            : "border border-neutral-900/15 bg-white hover:bg-neutral-50 text-neutral-900"
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="bg-white text-neutral-900 min-h-screen">
      <SiteHeader />
      <div className="h-24 sm:h-28" />

      <section className="relative overflow-hidden">
        {/* background */}
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.06)_1px,transparent_1px)] [background-size:84px_84px] opacity-[0.18]" />
        <div className="absolute -top-56 -left-56 h-[560px] w-[560px] rounded-full blur-3xl bg-neutral-900/10" />
        <div className="absolute -bottom-64 -right-56 h-[620px] w-[620px] rounded-full blur-3xl bg-neutral-900/6" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white/70 px-4 py-2 text-xs sm:text-sm text-neutral-700 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-900/70" />
              Atrium Studio
            </p>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight">
              Pricing
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-600">
              One-time packages (from). Clear scope, clear next step.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((p) => (
              <PriceCard
                key={p.id}
                name={p.name}
                price={p.price}
                note={p.note}
                features={p.features}
                highlight={p.highlight}
                ctaLabel={p.ctaLabel}
                ctaHref={p.ctaHref}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition"
            >
              Contact for quote
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-900/15 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
            >
              View projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
