import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.email("Must be a valid email"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
