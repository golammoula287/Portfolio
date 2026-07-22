"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/dal";
import { connectToDatabase } from "@/lib/db/connect";
import { cloudinary } from "@/lib/cloudinary/config";
import { AchievementModel } from "@/models/achievement";
import { achievementFormSchema } from "@/lib/validation/achievement";

export type AchievementActionState = {
  errors?: Record<string, string[]>;
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

async function uploadImage(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise<{ publicId: string; url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "achievements" }, (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve({ publicId: result.public_id, url: result.secure_url });
      })
      .end(buffer);
  });
}

export async function createAchievement(
  _prevState: AchievementActionState,
  formData: FormData
): Promise<AchievementActionState> {
  await requireAdmin();

  const parsed = achievementFormSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await connectToDatabase();

  const imageFile = formData.get("image");
  const image = imageFile instanceof File && imageFile.size > 0 ? await uploadImage(imageFile) : undefined;

  await AchievementModel.create({ ...parsed.data, image });

  revalidatePath(achievementsPath());
  revalidatePath("/");
  redirect(achievementsPath());
}

export async function updateAchievement(
  id: string,
  _prevState: AchievementActionState,
  formData: FormData
): Promise<AchievementActionState> {
  await requireAdmin();

  const parsed = achievementFormSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await connectToDatabase();

  const imageFile = formData.get("image");
  const image = imageFile instanceof File && imageFile.size > 0 ? await uploadImage(imageFile) : undefined;

  await AchievementModel.findByIdAndUpdate(id, {
    ...parsed.data,
    ...(image ? { image } : {}),
  });

  revalidatePath(achievementsPath());
  revalidatePath("/");
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
