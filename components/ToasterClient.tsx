"use client";

import { Toaster } from "sonner";

export function ToasterClient() {
  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        className:
          "border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-950/70 backdrop-blur",
      }}
    />
  );
}
