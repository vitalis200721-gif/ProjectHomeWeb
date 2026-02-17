import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

/**
 * Prisma singleton (kad dev režime nekurti 100 klientų)
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(80),
  email: z.string().email("Please enter a valid email.").max(120),
  password: z.string().min(6, "Password must be at least 6 characters.").max(200),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.errors?.[0]?.message ?? "Invalid input.";
      return NextResponse.json({ message }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    // email pas tave schemoj yra optional, bet mes registracijoj reikalaujam
    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { message: "This email is already registered." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash, // ✅ teisingas laukas pagal tavo schema.prisma
      },
    });

    return NextResponse.json(
      { message: "Account created successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error("REGISTER_ERROR:", err);
    return NextResponse.json(
      { message: "System error. Please try again." },
      { status: 500 }
    );
  }
}
