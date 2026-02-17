import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/sign-in");

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-950/50 backdrop-blur p-6 shadow-xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Profile settings
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Update your name and password.
        </p>

        <div className="mt-8">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
