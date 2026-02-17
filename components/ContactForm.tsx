"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("sending");

    try {
      const fd = new FormData(e.currentTarget);

      const payload = {
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        phone: String(fd.get("phone") || ""),
        subject: String(fd.get("subject") || ""),
        message: String(fd.get("message") || ""),
      };

      // ✅ Kol kas darom "fake send" (kad nelūžtų).
      // Jei vėliau norėsi – pajungsim į /api/contact (su realiu email/webhook).
      await new Promise((r) => setTimeout(r, 650));

      // Minimal validation (kad būtų realistiška)
      if (!payload.email.includes("@") || payload.message.trim().length < 5) {
        throw new Error("Please enter a valid email and a longer message.");
      }

      setStatus("sent");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "System error. Please try again.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-950/50 backdrop-blur p-6 shadow-xl"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            placeholder="Your name"
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
            required
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@email.com"
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
            required
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium mb-1">Phone (optional)</label>
          <input
            name="phone"
            placeholder="+370 ..."
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            name="subject"
            placeholder="Consultation / Pricing / Project"
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            placeholder="Tell us what you want to build..."
            rows={6}
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none resize-none"
            required
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      )}

      {status === "sent" && (
        <p className="mt-4 text-sm text-emerald-600">
          Message sent ✅ We’ll get back to you soon.
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold
                     bg-accent-olive dark:bg-accent-copper text-white
                     hover:opacity-90 disabled:opacity-60 transition"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>

        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          We usually reply within 24h.
        </span>
      </div>
    </form>
  );
}
