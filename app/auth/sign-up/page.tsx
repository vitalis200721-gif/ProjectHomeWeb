"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormState = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg =
          data?.message ||
          data?.error ||
          "Sign up failed. Please check your details and try again.";
        setErr(msg);
        toast.error(msg);
        setLoading(false);
        return;
      }

      toast.success("Account created! You can sign in now.");
      setLoading(false);
      router.push("/auth/sign-in");
    } catch (error) {
      console.error(error);
      const msg = "Network error. Please try again.";
      setErr(msg);
      toast.error(msg);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <div className="w-full rounded-2xl border border-neutral-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-950/60">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Sign up to continue.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:ring-neutral-100/10"
              placeholder="Your name"
              autoComplete="name"
              required
              minLength={2}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:ring-neutral-100/10"
              placeholder="you@email.com"
              autoComplete="email"
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:ring-neutral-100/10"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              type="password"
              minLength={6}
            />
          </div>

          {err ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
              {err}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{" "}
          <Link className="font-medium text-neutral-900 underline dark:text-neutral-100" href="/auth/sign-in">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
