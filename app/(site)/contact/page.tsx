import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Request a consultation with ATRIUM STUDIO.",
};

export default function ContactPage() {
  return (
    <section className="container py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Tell us what you’re building — we’ll respond with a clear next step and a short, tailored plan.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
        <ContactForm />

        <aside className="rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-medium">Studio</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Mazeikiai, Telšiai, Lithuania<br />
            info@atriumstudio.com<br />
            +370 123 45678
          </p>
          <div className="mt-6 aspect-[4/3] rounded-xl bg-muted/40 grid place-items-center text-sm text-muted-foreground">
            Map placeholder
          </div>
        </aside>
      </div>
    </section>
  );
}
