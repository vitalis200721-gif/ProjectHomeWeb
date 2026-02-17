"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export function ProfileForm() {
  const { data: session, update } = useSession();

  const [name, setName] = useState(session?.user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function saveName() {
    setMsg(null);
    setErr(null);
    setLoading(true);

    const r = await fetch("/api/user/profile/name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const j = await r.json().catch(() => null);

    setLoading(false);

    if (!r.ok) {
      setErr(j?.message || "Failed.");
      return;
    }

    await update();
    setMsg("Name updated.");
  }

  async function changePassword() {
    setMsg(null);
    setErr(null);
    setLoading(true);

    const r = await fetch("/api/user/profile/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const j = await r.json().catch(() => null);

    setLoading(false);

    if (!r.ok) {
      setErr(j?.message || "Failed.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setMsg("Password updated.");
  }

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Display name</h2>
        <input
          className="w-full rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-400/30"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button
          disabled={loading}
          onClick={saveName}
          className="inline-flex rounded-xl px-4 py-2 font-semibold text-white bg-accent-olive dark:bg-accent-copper hover:opacity-90 transition disabled:opacity-60"
        >
          Save name
        </button>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Change password</h2>

        <input
          className="w-full rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-400/30"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current password"
          type="password"
        />

        <input
          className="w-full rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-400/30"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password (min 6 chars)"
          type="password"
        />

        <button
          disabled={loading}
          onClick={changePassword}
          className="inline-flex rounded-xl px-4 py-2 font-semibold text-white bg-accent-olive dark:bg-accent-copper hover:opacity-90 transition disabled:opacity-60"
        >
          Update password
        </button>
      </section>

      {err && <div className="text-sm text-red-600 dark:text-red-400">{err}</div>}
      {msg && <div className="text-sm text-green-700 dark:text-green-400">{msg}</div>}
    </div>
  );
}
