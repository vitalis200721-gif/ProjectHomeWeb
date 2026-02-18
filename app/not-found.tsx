"use client";

import Link from "next/link";

/**
 * Custom 404 page. Next.js will render this component when no route matches.
 * It provides a friendly message and a link back to the home page.
 */
export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        The page you are looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 dark:bg-neutral-100 dark:text-neutral-900 transition"
      >
        Go home
      </Link>
    </main>
  );
}
