"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const created = sp.get("created");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (!res || res.error) {
      setErr("Wrong email or password.");
      return;
    }

    router.push(res.url || "/dashboard");
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-950/50 backdrop-blur p-6 shadow-xl">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Sign in to continue.
        </p>

        {created && (
          <p className="mt-4 text-sm text-emerald-600">
            Account created. Now sign in ✅
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
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
            placeholder="Password"
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
            required
          />

          <button
            disabled={loading}
            className="w-full rounded-lg px-4 py-3 font-semibold bg-accent-olive dark:bg-accent-copper text-white hover:opacity-90 disabled:opacity-60 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {err && <p className="text-sm text-red-500">{err}</p>}

          <p className="pt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            No account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-accent-olive dark:text-accent-copper"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
