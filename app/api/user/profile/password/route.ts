import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Change the current user's password. Validates current password and enforces
// minimum length for the new password. Uses the `passwordHash` field from
// Prisma schema.
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Bad JSON" },
      { status: 400 },
    );
  }

  const currentPassword = (body as any)?.currentPassword as string | undefined;
  const newPassword = (body as any)?.newPassword as string | undefined;

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { message: "Missing fields." },
      { status: 400 },
    );
  }

  if (newPassword.length < 6) {
    return NextResponse.json(
      { message: "New password too short." },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json(
      { message: "User not found." },
      { status: 404 },
    );
  }

  const ok = await bcrypt.compare(currentPassword, user.passwordHash || "");
  if (!ok) {
    return NextResponse.json(
      { message: "Wrong current password." },
      { status: 401 },
    );
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: userId }, data: { passwordHash: hash } });

  return NextResponse.json({ ok: true });
}
