"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { connectToDatabase } from "@/lib/db/connect";
import { MessageModel } from "@/models/message";

async function requireAdmin() {
  const session = await verifySession();
  if (!session) {
    throw new Error("Unauthorized");
  }
}

function messagesPath() {
  return `/${process.env.ADMIN_ROUTE_SLUG}/messages`;
}

export async function markMessageRead(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await connectToDatabase();
  await MessageModel.findByIdAndUpdate(id, { status: "read" });
  revalidatePath(messagesPath());
}

export async function archiveMessage(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await connectToDatabase();
  await MessageModel.findByIdAndUpdate(id, { status: "archived" });
  revalidatePath(messagesPath());
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await connectToDatabase();
  await MessageModel.findByIdAndDelete(id);
  revalidatePath(messagesPath());
}
