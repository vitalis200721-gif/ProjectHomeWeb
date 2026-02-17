import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const { name } = await req.json().catch(() => ({}));
  const clean = (name ?? "").trim();

  await prisma.user.update({
    where: { id: userId },
    data: { name: clean || null },
  });

  return NextResponse.json({ ok: true });
}
