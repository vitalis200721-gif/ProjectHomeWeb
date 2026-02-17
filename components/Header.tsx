"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/finder", label: "Finder" },
  { href: "/contact", label: "Contact" },
];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm
                 border border-neutral-200/70 dark:border-neutral-700/70
                 bg-white/80 dark:bg-neutral-900/60 backdrop-blur
                 text-neutral-900 dark:text-neutral-100
                 hover:bg-white dark:hover:bg-neutral-900 transition"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}

function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-10 w-28 rounded-xl bg-neutral-200/60 dark:bg-neutral-800/60 animate-pulse" />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-neutral-700 dark:text-neutral-200 opacity-90 max-w-[180px] truncate">
          {session.user.name || session.user.email}
        </span>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold
                     border border-neutral-200/70 dark:border-neutral-700/70
                     bg-white/80 dark:bg-neutral-900/60
                     text-neutral-900 dark:text-neutral-100
                     hover:bg-white dark:hover:bg-neutral-900 transition"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/auth/sign-in"
        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium
           border border-white/15 dark:border-white/15
           bg-white/10 dark:bg-white/10 text-white
           hover:bg-white/15 transition"

      >
        Sign in
      </Link>

      <Link
        href="/auth/sign-up"
        className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold
                   bg-accent-olive dark:bg-accent-copper text-white
                   hover:opacity-90 transition"
      >
        Sign up
      </Link>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const navLinks = useMemo(() => {
    return NAV.map((item) => {
      const active =
        item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

      return (
        <Link
          key={item.href}
          href={item.href}
          className={cx(
            "px-3 py-2 rounded-xl text-sm font-semibold transition",
            active
              ? "bg-neutral-200/70 dark:bg-neutral-800/70 text-neutral-900 dark:text-white"
              : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
          )}
        >
          {item.label}
        </Link>
      );
    });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-950/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-bold">
            A
          </span>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">Atrium Studio</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 -mt-0.5">
              Cinematic Homes
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">{navLinks}</nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          {/* Mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm
                       border border-neutral-200/70 dark:border-neutral-700/70
                       bg-white/80 dark:bg-neutral-900/60
                       text-neutral-900 dark:text-neutral-100
                       hover:bg-white dark:hover:bg-neutral-900 transition"
            aria-label="Open menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-neutral-200/70 dark:border-neutral-800/70">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
            <nav className="flex flex-col gap-1">{navLinks}</nav>
            <div className="pt-2 border-t border-neutral-200/70 dark:border-neutral-800/70">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
