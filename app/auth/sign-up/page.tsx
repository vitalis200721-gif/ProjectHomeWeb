"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        setErr("Sign up failed.");
        setLoading(false);
        return;
      }

      router.push("/auth/sign-in?created=1");
    } catch {
      setErr("Sign up failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-950/50 backdrop-blur p-6 shadow-xl">
        <h1 className="text-3xl font-bold tracking-tight">Create account</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Join Atrium Studio experience.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            name="name"
            placeholder="Full name"
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min 6)"
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
            minLength={6}
            required
          />

          <button
            disabled={loading}
            className="w-full rounded-lg px-4 py-3 font-semibold bg-accent-olive dark:bg-accent-copper text-white hover:opacity-90 disabled:opacity-60 transition"
          >
            {loading ? "Creating..." : "Sign up"}
          </button>

          {err && <p className="text-sm text-red-500">{err}</p>}

          <p className="pt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Already have account?{" "}
            <Link
              href="/auth/sign-in"
              className="font-semibold text-accent-olive dark:text-accent-copper"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
