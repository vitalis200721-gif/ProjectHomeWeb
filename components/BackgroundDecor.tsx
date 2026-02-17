export function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* soft gradient blobs */}
      <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-300/25 via-sky-300/20 to-purple-300/20 blur-3xl dark:from-emerald-400/10 dark:via-sky-400/10 dark:to-purple-400/10" />
      <div className="absolute -bottom-32 right-[-120px] h-[560px] w-[560px] rounded-full bg-gradient-to-tr from-amber-300/20 via-rose-300/15 to-fuchsia-300/15 blur-3xl dark:from-amber-400/10 dark:via-rose-400/10 dark:to-fuchsia-400/10" />

      {/* subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30 dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] dark:opacity-25" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.10)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
