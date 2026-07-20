import { z } from "zod";

export const experienceFormSchema = z
  .object({
    role: z.string().trim().min(1, "Role is required").max(160),
    company: z.string().trim().min(1, "Company is required").max(160),
    startDate: z.string().trim().min(1, "Start date is required"),
    endDate: z
      .string()
      .trim()
      .optional()
      .transform((value) => (value ? value : undefined)),
    description: z.string().trim().min(1, "Description is required"),
    technologies: z
      .string()
      .optional()
      .transform((value) =>
        (value ?? "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      ),
    order: z.coerce.number().int().optional().default(0),
    status: z.enum(["draft", "published"]).optional().default("draft"),
  })
  .refine((data) => !data.endDate || data.endDate >= data.startDate, {
    error: "End date must be after start date",
    path: ["endDate"],
  });

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;
