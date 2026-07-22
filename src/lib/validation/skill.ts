import { z } from "zod";

export const skillFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  category: z.string().trim().min(1, "Category is required").max(80),
  order: z.coerce.number().int().optional().default(0),
  status: z.enum(["draft", "published"]).optional().default("draft"),
});

export type SkillFormValues = z.infer<typeof skillFormSchema>;
