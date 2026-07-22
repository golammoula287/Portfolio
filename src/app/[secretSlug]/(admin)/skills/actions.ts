"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/dal";
import { connectToDatabase } from "@/lib/db/connect";
import { SkillModel } from "@/models/skill";
import { skillFormSchema } from "@/lib/validation/skill";

export type SkillActionState = {
  errors?: Record<string, string[]>;
} | null;

async function requireAdmin() {
  const session = await verifySession();
  if (!session) {
    throw new Error("Unauthorized");
  }
}

function skillsPath() {
  return `/${process.env.ADMIN_ROUTE_SLUG}/skills`;
}

function readForm(formData: FormData) {
  return {
    name: formData.get("name"),
    category: formData.get("category"),
    order: formData.get("order"),
    status: formData.get("status"),
  };
}

export async function createSkill(
  _prevState: SkillActionState,
  formData: FormData
): Promise<SkillActionState> {
  await requireAdmin();

  const parsed = skillFormSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await connectToDatabase();
  await SkillModel.create(parsed.data);

  revalidatePath(skillsPath());
  revalidatePath("/");
  redirect(skillsPath());
}

export async function updateSkill(
  id: string,
  _prevState: SkillActionState,
  formData: FormData
): Promise<SkillActionState> {
  await requireAdmin();

  const parsed = skillFormSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await connectToDatabase();
  await SkillModel.findByIdAndUpdate(id, parsed.data);

  revalidatePath(skillsPath());
  revalidatePath("/");
  redirect(skillsPath());
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return;
  }

  await connectToDatabase();
  await SkillModel.findByIdAndDelete(id);

  revalidatePath(skillsPath());
  revalidatePath("/");
}
