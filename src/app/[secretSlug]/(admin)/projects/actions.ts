"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/dal";
import { connectToDatabase } from "@/lib/db/connect";
import { resolveImage, ImageUploadError } from "@/lib/cloudinary/upload";
import { ProjectModel } from "@/models/project";
import { projectFormSchema } from "@/lib/validation/project";

export type ProjectActionState = {
  errors?: Record<string, string[]>;
  values?: Record<string, string>;
} | null;

async function requireAdmin() {
  const session = await verifySession();
  if (!session) {
    throw new Error("Unauthorized");
  }
}

function projectsPath() {
  return `/${process.env.ADMIN_ROUTE_SLUG}/projects`;
}

// Raw string values kept so the form can repopulate after a validation or
// server error instead of wiping everything the user typed.
function rawValues(formData: FormData): Record<string, string> {
  const fields = ["title", "slug", "summary", "description", "techStack", "liveUrl", "githubUrl", "imageUrl", "order", "status"];
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
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    techStack: formData.get("techStack"),
    liveUrl: formData.get("liveUrl"),
    githubUrl: formData.get("githubUrl"),
    featured: formData.get("featured") === "on",
    order: formData.get("order"),
    status: formData.get("status"),
  };
}

export async function createProject(
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin();
  const values = rawValues(formData);

  try {
    const parsed = projectFormSchema.safeParse(readForm(formData));
    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors, values };
    }

    await connectToDatabase();

    if (await ProjectModel.exists({ slug: parsed.data.slug })) {
      return { errors: { slug: ["A project with this slug already exists."] }, values };
    }

    const image = await resolveImage(formData.get("image"), formData.get("imageUrl"), "projects");
    await ProjectModel.create({ ...parsed.data, image });

    revalidatePath(projectsPath());
    revalidatePath("/");
  } catch (error) {
    return { errors: formError(error), values };
  }

  redirect(projectsPath());
}

export async function updateProject(
  id: string,
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin();
  const values = rawValues(formData);

  try {
    const parsed = projectFormSchema.safeParse(readForm(formData));
    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors, values };
    }

    await connectToDatabase();

    if (await ProjectModel.exists({ slug: parsed.data.slug, _id: { $ne: id } })) {
      return { errors: { slug: ["A project with this slug already exists."] }, values };
    }

    const image = await resolveImage(formData.get("image"), formData.get("imageUrl"), "projects");
    await ProjectModel.findByIdAndUpdate(id, { ...parsed.data, ...(image ? { image } : {}) });

    revalidatePath(projectsPath());
    revalidatePath("/");
  } catch (error) {
    return { errors: formError(error), values };
  }

  redirect(projectsPath());
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return;
  }

  await connectToDatabase();
  await ProjectModel.findByIdAndDelete(id);

  revalidatePath(projectsPath());
  revalidatePath("/");
}

// Maps a thrown error to a field-level error map the form can render. Image
// upload problems attach to the image field; anything else is a form error.
function formError(error: unknown): Record<string, string[]> {
  if (error instanceof ImageUploadError) {
    return { image: [`${error.message} You can remove the image and save without it.`] };
  }
  return { _form: ["Something went wrong saving. Please try again."] };
}
