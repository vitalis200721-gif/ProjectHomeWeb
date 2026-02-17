import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json().catch(() => ({}));

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ ok: false, message: "Missing fields." }, { status: 400 });
  }

  if (String(newPassword).length < 6) {
    return NextResponse.json({ ok: false, message: "New password too short." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ ok: false, message: "User not found." }, { status: 404 });

  const ok = await bcrypt.compare(String(currentPassword), user.password);
  if (!ok) return NextResponse.json({ ok: false, message: "Wrong current password." }, { status: 401 });

  const hash = await bcrypt.hash(String(newPassword), 10);
  await prisma.user.update({ where: { id: userId }, data: { password: hash } });

  return NextResponse.json({ ok: true });
}
