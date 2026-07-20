import { z } from "zod";

export const achievementFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(160),
  issuer: z.string().trim().min(1, "Issuer is required").max(160),
  description: z.string().trim().min(1, "Description is required"),
  date: z.string().trim().min(1, "Date is required"),
  url: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => value === undefined || z.url().safeParse(value).success, {
      error: "Must be a valid URL",
    }),
  featured: z.coerce.boolean().optional().default(false),
  order: z.coerce.number().int().optional().default(0),
  status: z.enum(["draft", "published"]).optional().default("draft"),
});

export type AchievementFormValues = z.infer<typeof achievementFormSchema>;
