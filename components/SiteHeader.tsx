"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // If you are NOT on the homepage, section anchors should navigate to "/#..."
  const homePrefix = pathname === "/" ? "" : "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          "mx-auto max-w-7xl px-4",
          "transition-all duration-300",
          scrolled ? "pt-3" : "pt-5",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center justify-between gap-3",
            "rounded-2xl border",
            "px-4 py-3 sm:px-5",
            "backdrop-blur-xl",
            scrolled
              ? "border-white/15 bg-black/45 shadow-lg"
              : "border-white/10 bg-black/25",
          ].join(" ")}
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/90 text-sm font-semibold">
              A
            </span>
            <div className="leading-tight">
              <div className="text-white font-semibold">Atrium Studio</div>
              <div className="text-xs text-white/60 -mt-0.5">Cinematic Homes</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/75">
            <Link
              href={`${homePrefix}#services`}
              className="hover:text-white/90 transition"
            >
              Services
            </Link>

            {/* Your homepage has id="projects" section, so use that as Gallery */}
            <Link
              href={`${homePrefix}#projects`}
              className="hover:text-white/90 transition"
            >
              Gallery
            </Link>

            {/* Your homepage has id="faq" section, use it as Process (or rename later) */}
            <Link
              href={`${homePrefix}#faq`}
              className="hover:text-white/90 transition"
            >
              Process
            </Link>

            {/* Pricing should be a real page (so it never "random scrolls") */}
            <Link href="/pricing" className="hover:text-white/90 transition">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/auth/sign-in"
              className="hidden sm:inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
            >
              Sign in
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
