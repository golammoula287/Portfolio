"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/dal";
import { connectToDatabase } from "@/lib/db/connect";
import { resolveImage, ImageUploadError } from "@/lib/cloudinary/upload";
import { AchievementModel } from "@/models/achievement";
import { achievementFormSchema } from "@/lib/validation/achievement";

export type AchievementActionState = {
  errors?: Record<string, string[]>;
  values?: Record<string, string>;
} | null;

async function requireAdmin() {
  const session = await verifySession();
  if (!session) {
    throw new Error("Unauthorized");
  }
}

function achievementsPath() {
  return `/${process.env.ADMIN_ROUTE_SLUG}/achievements`;
}

function rawValues(formData: FormData): Record<string, string> {
  const fields = ["title", "issuer", "description", "date", "url", "imageUrl", "order", "status"];
  const out: Record<string, string> = {};
  for (const field of fields) {
    out[field] = String(formData.get(field) ?? "");
  }
  out.featured = formData.get("featured") === "on" ? "on" : "";
  return out;
}

function readForm(formData: FormData) {
  return {
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    description: formData.get("description"),
    date: formData.get("date"),
    url: formData.get("url"),
    featured: formData.get("featured") === "on",
    order: formData.get("order"),
    status: formData.get("status"),
  };
}

function formError(error: unknown): Record<string, string[]> {
  if (error instanceof ImageUploadError) {
    return { image: [`${error.message} You can remove the image and save without it.`] };
  }
  return { _form: ["Something went wrong saving. Please try again."] };
}

export async function createAchievement(
  _prevState: AchievementActionState,
  formData: FormData
): Promise<AchievementActionState> {
  await requireAdmin();
  const values = rawValues(formData);

  try {
    const parsed = achievementFormSchema.safeParse(readForm(formData));
    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors, values };
    }

    await connectToDatabase();
    const image = await resolveImage(formData.get("image"), formData.get("imageUrl"), "achievements");
    await AchievementModel.create({ ...parsed.data, image });

    revalidatePath(achievementsPath());
    revalidatePath("/");
  } catch (error) {
    return { errors: formError(error), values };
  }

  redirect(achievementsPath());
}

export async function updateAchievement(
  id: string,
  _prevState: AchievementActionState,
  formData: FormData
): Promise<AchievementActionState> {
  await requireAdmin();
  const values = rawValues(formData);

  try {
    const parsed = achievementFormSchema.safeParse(readForm(formData));
    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors, values };
    }

    await connectToDatabase();
    const image = await resolveImage(formData.get("image"), formData.get("imageUrl"), "achievements");
    await AchievementModel.findByIdAndUpdate(id, { ...parsed.data, ...(image ? { image } : {}) });

    revalidatePath(achievementsPath());
    revalidatePath("/");
  } catch (error) {
    return { errors: formError(error), values };
  }

  redirect(achievementsPath());
}

export async function deleteAchievement(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return;
  }

  await connectToDatabase();
  await AchievementModel.findByIdAndDelete(id);

  revalidatePath(achievementsPath());
  revalidatePath("/");
}
