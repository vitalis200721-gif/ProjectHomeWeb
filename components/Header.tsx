"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";

const NAV: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
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

function AvatarMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session?.user) return null;

  const name = session.user.name || session.user.email || "User";
  const initial = name.charAt(0).toUpperCase();

  // Uždarom dropdown paspaudus bet kur kitur
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      if (el.closest("[data-avatar-menu]")) return;
      setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="relative" data-avatar-menu>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full
                   bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900
                   font-semibold shadow-sm"
        aria-label="Open account menu"
      >
        {initial}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-52 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70
                     bg-white/90 dark:bg-neutral-950/90 backdrop-blur shadow-xl p-2 z-50"
        >
          <div className="px-3 py-2">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Signed in as
            </div>
            <div className="text-sm font-semibold truncate">
              {session.user.email || session.user.name}
            </div>
          </div>

          <div className="my-1 h-px bg-neutral-200/70 dark:bg-neutral-800/70" />

          <Link
            href="/dashboard"
            className="block rounded-xl px-3 py-2 text-sm hover:bg-neutral-100/70 dark:hover:bg-neutral-900/70 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/profile"
            className="block rounded-xl px-3 py-2 text-sm hover:bg-neutral-100/70 dark:hover:bg-neutral-900/70 transition"
          >
            Profile
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left rounded-xl px-3 py-2 text-sm hover:bg-neutral-100/70 dark:hover:bg-neutral-900/70 transition"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
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
    return <AvatarMenu />;
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/auth/sign-in"
        className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold
                   border border-white/15 bg-white/10 text-white
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
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  // Floating navbar on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = useMemo(() => {
    const items = session?.user
      ? [...NAV, { href: "/dashboard", label: "Dashboard" }]
      : NAV;

    return items.map((item) => {
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
  }, [pathname, session?.user]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Outer wrapper to allow floating style */}
      <div
        className={cx(
          "transition-all duration-300",
          scrolled ? "py-3" : "py-0"
        )}
      >
        <div
          className={cx(
            "mx-auto max-w-7xl px-4 transition-all duration-300",
            scrolled ? "px-2 sm:px-4" : "px-4"
          )}
        >
          <div
            className={cx(
              "flex items-center justify-between gap-4 transition-all duration-300",
              // base glass style
              "backdrop-blur border border-neutral-200/70 dark:border-neutral-800/70",
              "bg-white/70 dark:bg-neutral-950/50",
              // floating behavior
              scrolled
                ? "rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 h-14"
                : "rounded-none shadow-none h-16 border-x-0"
            )}
          >
            {/* Left: Logo */}
            <div className="pl-3 sm:pl-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-bold">
                  A
                </span>
                <div className="leading-tight">
                  <div className="font-semibold tracking-tight">
                    Atrium Studio
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 -mt-0.5">
                    Cinematic Homes
                  </div>
                </div>
              </Link>
            </div>

            {/* Center: Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">{navLinks}</nav>

            {/* Right */}
            <div className="flex items-center gap-2 pr-3 sm:pr-4">
              <ThemeToggle />

              <div className="hidden md:block">
                <AuthButtons />
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm
                           border border-neutral-200/70 dark:border-neutral-700/70
                           bg-white/80 dark:bg-neutral-900/60
                           text-neutral-900 dark:text-neutral-100
                           hover:bg-white dark:hover:bg-neutral-900 transition"
                aria-label="Open menu"
              >
                {mobileOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileOpen && (
            <div className="lg:hidden mt-2 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-950/60 backdrop-blur p-3">
              <nav className="flex flex-col gap-1">{navLinks}</nav>
              <div className="mt-3 pt-3 border-t border-neutral-200/70 dark:border-neutral-800/70">
                <AuthButtons />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
