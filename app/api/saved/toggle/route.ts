import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const projectId = body?.projectId as string | undefined;

  if (!projectId) {
    return NextResponse.json({ message: "projectId required" }, { status: 400 });
  }

  const existing = await prisma.savedProject.findUnique({
    where: { userId_projectId: { userId, projectId } },
  });

  if (existing) {
    await prisma.savedProject.delete({ where: { id: existing.id } });
    return NextResponse.json({ saved: false });
  }

  await prisma.savedProject.create({ data: { userId, projectId } });
  return NextResponse.json({ saved: true });
}
