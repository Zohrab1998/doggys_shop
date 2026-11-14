import { NextResponse } from "next/server";
import { z } from "zod";
import { getI18n } from "@/i18n/server";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(req: Request) {
  const { m } = await getI18n();
  const parsed = contactSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: m.contact.invalid, errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  await prisma.contactMessage.create({ data: parsed.data });

  return NextResponse.json({ ok: true, message: m.contact.thanks }, { status: 201 });
}
