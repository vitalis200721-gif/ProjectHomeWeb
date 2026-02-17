"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export function ProjectActions({ slug }: { slug: string }) {
  const { data: session } = useSession();
  const isAuthed = !!session?.user;

  const [favorited, setFavorited] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    (async () => {
      const r = await fetch("/api/user/status");
      const j = await r.json().catch(() => null);
      if (!ok) return;
      setFavorited(!!j?.favorites?.includes(slug));
      setSaved(!!j?.saved?.includes(slug));
      setLoading(false);
    })();
    return () => {
      ok = false;
    };
  }, [slug]);

  async function toggle(path: string, setter: (v: boolean) => void) {
    if (!isAuthed) return;
    const r = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const j = await r.json().catch(() => null);
    if (j?.ok) {
      if (typeof j.favorited === "boolean") setter(j.favorited);
      if (typeof j.saved === "boolean") setter(j.saved);
    }
  }

  if (!isAuthed) {
    return (
      <Link
        href="/auth/sign-in"
        className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold
                   border border-white/20 bg-white/10 text-white/90 backdrop-blur hover:bg-white/15 transition"
        title="Sign in to save"
      >
        Sign in to save
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={loading}
        onClick={() => toggle("/api/user/favorites/toggle", setFavorited)}
        className={cx(
          "inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold transition",
          "border border-white/20 bg-white/10 text-white/90 backdrop-blur hover:bg-white/15",
          favorited && "bg-accent-olive/90 dark:bg-accent-copper/90 text-white border-transparent"
        )}
        title="Favorite"
        aria-label="Favorite"
      >
        ♥
      </button>

      <button
        disabled={loading}
        onClick={() => toggle("/api/user/saved/toggle", setSaved)}
        className={cx(
          "inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold transition",
          "border border-white/20 bg-white/10 text-white/90 backdrop-blur hover:bg-white/15",
          saved && "bg-accent-olive/90 dark:bg-accent-copper/90 text-white border-transparent"
        )}
        title="Save"
        aria-label="Save"
      >
        🔖
      </button>
    </div>
  );
}
