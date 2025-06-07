import { Priority } from "@/generated/prisma";
import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority),
});

export type TodoFormSchema = z.infer<typeof todoSchema>;
