import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { HeroUltra } from "@/components/HeroUltra";

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

function Bg({
  image,
  tone = "dark",
}: {
  image?: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <>
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority={false}
            className={`object-cover ${dark ? "opacity-25" : "opacity-12"}`}
          />
          <div
            className={`absolute inset-0 ${
              dark
                ? "bg-gradient-to-b from-black/70 via-black/35 to-neutral-950"
                : "bg-gradient-to-b from-white/85 via-white/70 to-white"
            }`}
          />
        </>
      ) : (
        <div
          className={`absolute inset-0 ${
            dark
              ? "bg-gradient-to-b from-neutral-950 via-neutral-950 to-black"
              : "bg-gradient-to-b from-white via-white to-neutral-50"
          }`}
        />
      )}

      {/* Depth blobs */}
      <div
        className={`absolute -top-56 -left-56 h-[560px] w-[560px] rounded-full blur-3xl ${
          dark ? "bg-white/10" : "bg-neutral-900/10"
        }`}
      />
      <div
        className={`absolute -bottom-64 -right-56 h-[620px] w-[620px] rounded-full blur-3xl ${
          dark ? "bg-white/6" : "bg-neutral-900/6"
        }`}
      />

      {/* Texture */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-[0.18] ${
          dark
            ? "[background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)]"
            : "[background-image:linear-gradient(rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.06)_1px,transparent_1px)]"
        } [background-size:84px_84px]`}
      />
    </>
  );
}

function Section({
  id,
  eyebrow = "Atrium Studio",
  title,
  subtitle,
  tone = "dark",
  bgImage,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
  bgImage?: string;
  children: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${
        dark ? "bg-neutral-950 text-white" : "bg-white text-neutral-900"
      }`}
    >
      <Bg image={bgImage} tone={tone} />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24">
        <div className="max-w-3xl">
          <p
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm backdrop-blur ${
              dark
                ? "border-white/15 bg-white/10 text-white/85"
                : "border-neutral-900/10 bg-white/70 text-neutral-700"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                dark ? "bg-white/80" : "bg-neutral-900/70"
              }`}
            />
            {eyebrow}
          </p>

          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight">
            {title}
          </h2>

          {subtitle ? (
            <p
              className={`mt-4 text-base sm:text-lg leading-relaxed ${
                dark ? "text-white/75" : "text-neutral-600"
              }`}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Card({
  icon,
  title,
  text,
  tone = "dark",
}: {
  icon: string;
  title: string;
  text: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`rounded-3xl border p-6 backdrop-blur transition hover:translate-y-[-2px] ${
        dark
          ? "border-white/12 bg-white/5 hover:bg-white/7"
          : "border-neutral-900/10 bg-white/80 hover:bg-white"
      }`}
    >
      <div
        className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border text-sm ${
          dark
            ? "border-white/12 bg-black/30 text-white/85"
            : "border-neutral-900/10 bg-white text-neutral-700"
        }`}
      >
        {icon}
      </div>
      <div className="mt-4 text-lg font-semibold">{title}</div>
      <div
        className={`mt-2 text-sm leading-relaxed ${
          dark ? "text-white/70" : "text-neutral-600"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  desc,
  image,
  tag,
}: {
  title: string;
  desc: string;
  image: string;
  tag: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20">
      <Image
        src={image}
        alt={title}
        width={1400}
        height={900}
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white/75 backdrop-blur">
        {tag}
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-white font-semibold text-lg">{title}</div>
        <div className="mt-1 text-sm text-white/70">{desc}</div>
        <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur">
          View details →
        </div>
      </div>
    </div>
  );
}

function Testimonial({
  name,
  role,
  text,
}: {
  name: string;
  role: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur">
      <div className="text-white/90 font-semibold">{name}</div>
      <div className="text-xs text-white/55">{role}</div>
      <p className="mt-3 text-sm text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur">
      <div className="text-white font-semibold">{q}</div>
      <div className="mt-2 text-sm text-white/70 leading-relaxed">{a}</div>
    </div>
  );
}

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
      className={`relative rounded-3xl border p-8 ${
        highlight
          ? "border-neutral-900/15 bg-white shadow-xl"
          : "border-neutral-900/10 bg-white/80"
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

export default function HomePage() {
  return (
    <main className="bg-neutral-950 text-white">
      <SiteHeader />
      {/* space for fixed header */}
      <div className="h-24 sm:h-28" />

      {/* HERO */}
      <HeroUltra />

      {/* SERVICES */}
      <Section
        id="services"
        tone="dark"
        bgImage="/media/img-061.jpg"
        title="Premium system across the whole page"
        subtitle="Not just hero. Every section gets depth: image + gradient overlay + texture + rhythm. That’s what makes it feel expensive."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            icon="01"
            title="Design rhythm"
            text="Alternate tones and section styles so the page feels ‘big’ and intentional."
          />
          <Card
            icon="02"
            title="Visual depth"
            text="Subtle background imagery + overlays makes even simple content look premium."
          />
          <Card
            icon="03"
            title="Conversion flow"
            text="Trust → proof → process → pricing → CTA. Nothing random."
          />
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            Explore Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition backdrop-blur"
          >
            Contact
          </Link>
        </div>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section
        id="projects"
        tone="dark"
        bgImage="/media/img-001.jpg"
        title="Featured projects"
        subtitle="This section instantly makes the website feel real. Replace with your real projects and it becomes sellable."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ProjectCard
            tag="Warm Modern"
            title="Minimal Warm Modern"
            desc="Clean lines, warm accents, soft lighting."
            image="/media/img-001.jpg"
          />
          <ProjectCard
            tag="Cinematic"
            title="Cinematic Contrast"
            desc="Mood, shadow, story-driven design."
            image="/media/img-061.jpg"
          />
          <ProjectCard
            tag="Light"
            title="Light & Space"
            desc="Bright, airy, open-plan living."
            image="/media/img-001.jpg"
          />
        </div>

        <div className="mt-8 rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur">
          <div className="text-white font-semibold">Tip</div>
          <p className="mt-2 text-sm text-white/70">
            If you add only one thing: add 6 real project cards with images. That alone upgrades the entire site.
          </p>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section
        id="testimonials"
        tone="dark"
        bgImage="/media/img-061.jpg"
        title="Trust (testimonials)"
        subtitle="Even 2 short testimonials make the page feel like a real business, not a demo."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Testimonial
            name="Mantas V."
            role="Client"
            text="The site feels premium and fast. The layout is clear and the vibe is exactly what we wanted."
          />
          <Testimonial
            name="Greta K."
            role="Client"
            text="Cinematic hero + clean sections is the perfect combo. Looks like a real studio brand."
          />
          <Testimonial
            name="Tomas A."
            role="Partner"
            text="Good structure, good conversions. The flow makes sense and the visuals feel expensive."
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        tone="dark"
        bgImage="/media/img-001.jpg"
        title="FAQ (removes buyer doubt)"
        subtitle="This section reduces questions and makes your offer feel professional."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FaqItem
            q="Can I customize projects and images?"
            a="Yes. Swap the images in /public/media and update the cards. The layout stays premium."
          />
          <FaqItem
            q="Do you support login & dashboard?"
            a="Yes. NextAuth + Prisma works, and protected routes are set up."
          />
          <FaqItem
            q="Is it production-ready?"
            a="If npm run build passes, DB is configured, and no console errors — yes. You’re close."
          />
          <FaqItem
            q="What should I add next?"
            a="Real project data, a contact form that sends emails, and privacy/terms pages."
          />
        </div>
      </Section>

      {/* PRICING (ONE TRUE VERSION) */}
      <Section
        id="pricing"
        tone="light"
        eyebrow="Atrium Studio"
        title="Pricing"
        subtitle="One-time packages (from). Clear scope, clear next step."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </Section>

      {/* CTA */}
      <Section
        id="cta"
        tone="dark"
        bgImage="/media/img-061.jpg"
        title="Ready to ship"
        subtitle="Now the whole page matches your premium hero. Replace placeholders with real work and you can sell this."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 rounded-3xl border border-white/12 bg-white/5 p-8 backdrop-blur">
            <div className="text-white font-semibold text-xl">Make it real</div>
            <p className="mt-3 text-sm text-white/75">
              Replace text + images with real content. Your structure is already premium.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                See pricing
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition backdrop-blur"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl border border-white/12 bg-black/40 p-8 backdrop-blur">
            <div className="text-sm text-white/80">Next upgrades</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• Real project DB data</li>
              <li>• Contact form that emails you</li>
              <li>• 2 real testimonials</li>
              <li>• Privacy / Terms pages</li>
            </ul>
          </div>
        </div>

        <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-white/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} Atrium Studio</div>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="hover:text-white/80">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white/80">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-white/80">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </Section>
    </main>
  );
}
