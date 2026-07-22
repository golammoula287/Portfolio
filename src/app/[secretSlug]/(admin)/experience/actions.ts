"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/dal";
import { connectToDatabase } from "@/lib/db/connect";
import { ExperienceModel } from "@/models/experience";
import { experienceFormSchema } from "@/lib/validation/experience";

export type ExperienceActionState = {
  errors?: Record<string, string[]>;
} | null;

async function requireAdmin() {
  const session = await verifySession();
  if (!session) {
    throw new Error("Unauthorized");
  }
}

function experiencePath() {
  return `/${process.env.ADMIN_ROUTE_SLUG}/experience`;
}

function readForm(formData: FormData) {
  return {
    role: formData.get("role"),
    company: formData.get("company"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    order: formData.get("order"),
    status: formData.get("status"),
  };
}

export async function createExperience(
  _prevState: ExperienceActionState,
  formData: FormData
): Promise<ExperienceActionState> {
  await requireAdmin();

  const parsed = experienceFormSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await connectToDatabase();
  await ExperienceModel.create(parsed.data);

  revalidatePath(experiencePath());
  revalidatePath("/");
  redirect(experiencePath());
}

export async function updateExperience(
  id: string,
  _prevState: ExperienceActionState,
  formData: FormData
): Promise<ExperienceActionState> {
  await requireAdmin();

  const parsed = experienceFormSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await connectToDatabase();
  await ExperienceModel.findByIdAndUpdate(id, parsed.data);

  revalidatePath(experiencePath());
  revalidatePath("/");
  redirect(experiencePath());
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return;
  }

  await connectToDatabase();
  await ExperienceModel.findByIdAndDelete(id);

  revalidatePath(experiencePath());
  revalidatePath("/");
}
