import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          You are not signed in.
        </p>
        <Link className="inline-block mt-6 underline" href="/auth/sign-in">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Signed in as <span className="font-semibold">{session.user.email}</span>
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/profile"
          className="px-4 py-2 rounded-md bg-neutral-200 dark:bg-neutral-800 hover:opacity-90 transition"
        >
          Profile settings
        </Link>
      </div>
    </div>
  );
}
