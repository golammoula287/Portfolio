"use server";

import { connectToDatabase } from "@/lib/db/connect";
import { MessageModel } from "@/models/message";
import { contactFormSchema } from "@/lib/validation/message";
import { sendContactEmail } from "@/lib/email/send-contact";

export type ContactActionState = {
  errors?: Record<string, string[]>;
  values?: Record<string, string>;
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

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, values };
  }

  try {
    await connectToDatabase();
    await MessageModel.create(parsed.data);
  } catch {
    return { errors: { _form: ["Couldn't send your message. Please try again."] }, values };
  }

  // Best-effort email notification — never blocks success on it.
  await sendContactEmail(parsed.data);

  return { success: true };
}
