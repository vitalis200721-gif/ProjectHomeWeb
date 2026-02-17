import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/ProfileForm";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    redirect("/auth/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  });

  if (!user?.email) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <ProfileForm initialName={user.name ?? ""} initialEmail={user.email} />
    </div>
  );
}
