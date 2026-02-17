"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialName: string;
  initialEmail: string;
};

export function ProfileForm({ initialName, initialEmail }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName || "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSaving(true);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(data?.message || "Failed to save.");
        setSaving(false);
        return;
      }

      setMsg("Saved ✅");
      // kad server komponentai atsinaujintų
      router.refresh();
    } catch {
      setMsg("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-950/50 backdrop-blur p-6 shadow-xl"
    >
      <h1 className="text-3xl font-bold tracking-tight">Profile settings</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Update your basic account details.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            value={initialEmail}
            disabled
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-100/70 dark:bg-neutral-900/60 px-4 py-3 outline-none opacity-80"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
          />
        </div>

        <button
          disabled={saving}
          className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold
                     bg-accent-olive dark:bg-accent-copper text-white
                     hover:opacity-90 disabled:opacity-60 transition"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>

        {msg && (
          <p className="text-sm text-neutral-700 dark:text-neutral-200">{msg}</p>
        )}
      </div>
    </form>
  );
}
