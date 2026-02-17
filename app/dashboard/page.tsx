import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const userId = (session?.user as any)?.id as string | undefined;

  // Jei dėl kokios nors priežasties session nėra (turėtų būti apsaugota middleware),
  // tiesiog rodome fallback.
  if (!userId) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/60 dark:bg-neutral-950/50 backdrop-blur p-6 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Please sign in to continue.
          </p>
          <div className="mt-5">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 dark:bg-neutral-100 dark:text-neutral-900 transition"
            >
              Sign in
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Pasiimam userį iš DB (saugiai, be papildomų lentelių)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, image: true },
  });

  // Paprastas "completion" algoritmas
  const fields = [
    Boolean(user?.name),
    Boolean(user?.email),
    Boolean(user?.image),
  ];
  const completed = fields.filter(Boolean).length;
  const completion = clamp(Math.round((completed / fields.length) * 100));

  const displayName = user?.name || user?.email || "User";

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/60 dark:bg-neutral-950/50 backdrop-blur p-6 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Welcome back, <span className="font-semibold">{displayName}</span>
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/profile"
            className="inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 dark:bg-neutral-100 dark:text-neutral-900 transition"
          >
            Profile settings
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 px-4 py-2 text-sm font-semibold hover:bg-neutral-100/50 dark:hover:bg-neutral-900 transition"
          >
            View projects
          </Link>

          <Link
            href="/pricing"
            className="inline-flex items-center rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 px-4 py-2 text-sm font-semibold hover:bg-neutral-100/50 dark:hover:bg-neutral-900 transition"
          >
            Upgrade
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/60 dark:bg-neutral-950/50 backdrop-blur p-5">
          <div className="text-sm text-neutral-500">Saved projects</div>
          <div className="mt-2 text-2xl font-bold">0</div>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Start adding your favourite projects.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/60 dark:bg-neutral-950/50 backdrop-blur p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-500">Profile completion</div>
            <div className="text-xs text-neutral-500">{completion}%</div>
          </div>

          <div className="mt-3 h-2 w-full rounded-full bg-neutral-200/60 dark:bg-neutral-800/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-neutral-900/70 dark:bg-neutral-100/70"
              style={{ width: `${completion}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            Add name and avatar to look more professional.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/60 dark:bg-neutral-950/50 backdrop-blur p-5">
          <div className="text-sm text-neutral-500">Plan</div>
          <div className="mt-2 text-2xl font-bold">Free</div>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Upgrade anytime from pricing page.
          </p>
        </div>
      </div>

      {/* Empty state */}
      <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center">
        <h2 className="text-lg font-semibold">No activity yet</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Once you start using the platform, your activity will appear here.
        </p>

        <Link
          href="/projects"
          className="mt-4 inline-flex rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 dark:bg-neutral-100 dark:text-neutral-900 transition"
        >
          Explore projects
        </Link>
      </div>
    </main>
  );
}
