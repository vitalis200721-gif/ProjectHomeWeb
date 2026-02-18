"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

/**
 * ProjectActions allows users to save a project. The component loads the saved
 * project list on mount and toggles saved state via the `/api/saved` endpoints.
 * We removed the old favourites feature (which relied on a non‑existent model)
 * to simplify the data model. Now there is a single “Save” action per project.
 */
export function ProjectActions({ slug }: { slug: string }) {
  const { data: session } = useSession();
  const isAuthed = !!session?.user;

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load saved status on mount
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/saved/list", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (!active) return;
        const ids: string[] = data?.projectIds ?? [];
        setSaved(ids.includes(slug));
      } catch {
        // ignore network errors
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  async function toggleSaved() {
    if (!isAuthed) return;
    setLoading(true);
    try {
      const res = await fetch("/api/saved/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: slug }),
      });
      const j = await res.json().catch(() => null);
      if (typeof j?.saved === "boolean") {
        setSaved(j.saved);
      }
    } finally {
      setLoading(false);
    }
  }

  // Prompt guests to sign in before saving
  if (!isAuthed) {
    return (
      <Link
        href="/auth/sign-in"
        className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold border border-white/20 bg-white/10 text-white/90 backdrop-blur hover:bg-white/15 transition"
        title="Sign in to save"
      >
        Sign in to save
      </Link>
    );
  }

  return (
    <button
      disabled={loading}
      onClick={toggleSaved}
      className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold transition border border-white/20 bg-white/10 text-white/90 backdrop-blur hover:bg-white/15 ${
        saved ? "bg-accent-olive/90 dark:bg-accent-copper/90 text-white border-transparent" : ""
      }`}
      title={saved ? "Saved" : "Save"}
      aria-label={saved ? "Saved" : "Save"}
    >
      {saved ? "♥" : "🔖"}
    </button>
  );
}
