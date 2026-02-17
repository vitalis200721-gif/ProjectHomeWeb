"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useSavedStore } from "@/lib/savedStore";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function SaveProjectButton({
  projectId,
  className,
}: {
  projectId: string;
  className?: string;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const { projectIds, loaded, setProjectIds, setLoaded, toggleLocal } =
    useSavedStore();

  const [busy, setBusy] = useState(false);

  const isSaved = useMemo(
    () => projectIds.includes(projectId),
    [projectIds, projectId],
  );

  // Load saved list once (when logged in)
  useEffect(() => {
    if (status !== "authenticated") return;
    if (loaded) return;

    (async () => {
      try {
        const res = await fetch("/api/saved/list", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { projectIds?: string[] };
        setProjectIds(data.projectIds ?? []);
        setLoaded(true);
      } catch {
        // ignore
      }
    })();
  }, [status, loaded, setProjectIds, setLoaded]);

  async function onClick() {
    if (busy) return;

    // If not logged in -> go sign in
    if (status !== "authenticated") {
      router.push(`/auth/sign-in?callbackUrl=${encodeURIComponent(pathname || "/")}`);
      return;
    }

    setBusy(true);

    // optimistic UI
    toggleLocal(projectId);

    try {
      const res = await fetch("/api/saved/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      if (!res.ok) {
        // revert if failed
        toggleLocal(projectId);
      }
    } catch {
      toggleLocal(projectId);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
        "border border-white/20 bg-black/35 text-white backdrop-blur",
        "hover:bg-black/50 transition disabled:opacity-60",
        className,
      )}
      title={isSaved ? "Saved" : "Save"}
      aria-label={isSaved ? "Saved" : "Save"}
    >
      <span className="text-sm">{isSaved ? "♥" : "♡"}</span>
      <span>{isSaved ? "Saved" : "Save"}</span>
    </button>
  );
}
