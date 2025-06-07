import { todoSchema } from "@/features/todo/schema";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
      userId: user.id,
    },
  });

  return NextResponse.json(todo, { status: 201 });
}
