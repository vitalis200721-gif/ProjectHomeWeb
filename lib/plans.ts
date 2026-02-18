export type PlanId = "starter" | "pro" | "studio";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  note: string;
  features: string[];
  highlight?: boolean;
  ctaLabel: string;
  ctaHref: string;
};

export const PLANS: Plan[] = [
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
