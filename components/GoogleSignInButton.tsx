"use client";

import { signIn } from "next-auth/react";

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.67 32.91 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.047 6.053 29.247 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.047 6.053 29.247 4 24 4c-7.682 0-14.354 4.317-17.694 10.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.122 0 9.83-1.963 13.374-5.159l-6.173-5.226C29.199 35.091 26.715 36 24 36c-5.202 0-9.635-3.066-11.293-7.432l-6.522 5.025C9.496 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.318-2.244 4.273-4.102 5.615h.003l6.173 5.226C36.94 39.245 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

export function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200/70 bg-white/80 px-4 py-3 text-sm font-semibold text-neutral-900 shadow-sm backdrop-blur transition hover:bg-white dark:border-neutral-800/70 dark:bg-neutral-950/60 dark:text-neutral-100 dark:hover:bg-neutral-900"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}
