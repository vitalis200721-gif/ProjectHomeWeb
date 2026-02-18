import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

// This endpoint previously toggled favourites using a nonexistent `favorite` model.
// To maintain backwards compatibility we now map favourite toggles to the unified
// `SavedProject` model. The incoming `slug` is treated as the projectId.
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

  const slug = (body as any)?.slug as string | undefined;
  if (!slug) {
    return NextResponse.json(
      { message: "Missing slug" },
      { status: 400 },
    );
  }

  const existing = await prisma.savedProject.findUnique({
    where: { userId_projectId: { userId, projectId: slug } },
  });

  if (existing) {
    await prisma.savedProject.delete({ where: { id: existing.id } });
    return NextResponse.json({ saved: false });
  }

  await prisma.savedProject.create({ data: { userId, projectId: slug } });
  return NextResponse.json({ saved: true });
}
