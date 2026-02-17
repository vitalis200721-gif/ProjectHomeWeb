import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await req.json().catch(() => ({}));
  if (!slug) {
    return NextResponse.json({ ok: false, message: "Missing slug" }, { status: 400 });
  }

  const exists = await prisma.saved.findUnique({
    where: { userId_slug: { userId, slug } },
  });

  if (exists) {
    await prisma.saved.delete({ where: { userId_slug: { userId, slug } } });
    return NextResponse.json({ ok: true, saved: false });
  }

  await prisma.saved.create({ data: { userId, slug } });
  return NextResponse.json({ ok: true, saved: true });
}
