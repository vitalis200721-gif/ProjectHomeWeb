"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Atrium Studio</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Designing spaces where form meets function. Architectural excellence,
            thoughtful interiors, and sustainable living.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/finder">Finder</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Mazeikiai, Telsiai, Lithuania<br />
            info@atriumstudio.com<br />
            +370 123 45678
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Newsletter</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing!');
            }}
            className="flex flex-col space-y-2"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="px-3 py-2 rounded-md bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent-olive dark:focus:ring-accent-copper"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-accent-olive dark:bg-accent-copper text-white rounded-md hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} Atrium Studio. All rights reserved.
      </div>
    </footer>
  );
}
