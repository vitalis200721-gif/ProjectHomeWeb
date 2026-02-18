import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

// Returns the current user's saved projects. The old favourites/saved endpoints
// referenced tables that no longer exist; this implementation returns a
// unified saved list. The `favorites` key is kept for compatibility and is
// always an empty array.
export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ ok: true, favorites: [], saved: [] });
  }

  const savedItems = await prisma.savedProject.findMany({
    where: { userId },
    select: { projectId: true },
  });

  return NextResponse.json({
    ok: true,
    favorites: [],
    saved: savedItems.map((x) => x.projectId),
  });
}
