import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ ok: true, favorites: [], saved: [] });
  }

  const [favorites, saved] = await Promise.all([
    prisma.favorite.findMany({ where: { userId }, select: { slug: true } }),
    prisma.saved.findMany({ where: { userId }, select: { slug: true } }),
  ]);

  return NextResponse.json({
    ok: true,
    favorites: favorites.map((x) => x.slug),
    saved: saved.map((x) => x.slug),
  });
}
