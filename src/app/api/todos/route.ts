import { Priority } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validatedFields = todoSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json(
      {
        error: "Invalid fields",
        details: validatedFields.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { title, description, priority } = validatedFields.data;

  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      priority,
      userId: req.user.id,
    },
  });

  return NextResponse.json(todo, { status: 201 });
}
