import { z } from "zod";
import { slugSchema } from "./common";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined))
  .refine((value) => value === undefined || z.url().safeParse(value).success, {
    error: "Must be a valid URL",
  });

export const projectFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  slug: slugSchema,
  summary: z.string().trim().min(1, "Summary is required").max(240),
  description: z.string().trim().min(1, "Description is required"),
  techStack: z
    .string()
    .optional()
    .transform((value) =>
      (value ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    ),
  liveUrl: optionalUrl,
  githubUrl: optionalUrl,
  featured: z.coerce.boolean().optional().default(false),
  order: z.coerce.number().int().optional().default(0),
  status: z.enum(["draft", "published"]).optional().default("draft"),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
