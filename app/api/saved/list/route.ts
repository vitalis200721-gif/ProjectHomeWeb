import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.savedProject.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { projectId: true },
  });

  return NextResponse.json({ projectIds: items.map((i) => i.projectId) });
}
