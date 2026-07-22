"use server";

import { connectToDatabase } from "@/lib/db/connect";
import { MessageModel } from "@/models/message";
import { contactFormSchema } from "@/lib/validation/message";

export type ContactActionState = {
  errors?: Record<string, string[]>;
  success?: boolean;
} | null;

export async function sendMessage(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  // Honeypot: a hidden field real visitors never fill. If it's non-empty,
  // silently pretend success instead of saving or surfacing an error —
  // showing an error would tip off the bot to try a different field name.
  if (formData.get("company")) {
    return { success: true };
  }

  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await connectToDatabase();
  await MessageModel.create(parsed.data);

  return { success: true };
}
