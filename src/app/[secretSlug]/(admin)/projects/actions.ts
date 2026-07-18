"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/dal";
import { connectToDatabase } from "@/lib/db/connect";
import { cloudinary } from "@/lib/cloudinary/config";
import { ProjectModel } from "@/models/project";
import { projectFormSchema } from "@/lib/validation/project";

export type ProjectActionState = {
  errors?: Record<string, string[]>;
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

async function uploadImage(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise<{ publicId: string; url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "projects" }, (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve({ publicId: result.public_id, url: result.secure_url });
      })
      .end(buffer);
  });
}

export async function createProject(
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin();

  const parsed = projectFormSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await connectToDatabase();

  if (await ProjectModel.exists({ slug: parsed.data.slug })) {
    return { errors: { slug: ["A project with this slug already exists."] } };
  }

  const imageFile = formData.get("image");
  const image = imageFile instanceof File && imageFile.size > 0 ? await uploadImage(imageFile) : undefined;

  await ProjectModel.create({ ...parsed.data, image });

  revalidatePath(projectsPath());
  redirect(projectsPath());
}

export async function updateProject(
  id: string,
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin();

  const parsed = projectFormSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await connectToDatabase();

  if (await ProjectModel.exists({ slug: parsed.data.slug, _id: { $ne: id } })) {
    return { errors: { slug: ["A project with this slug already exists."] } };
  }

  const imageFile = formData.get("image");
  const image = imageFile instanceof File && imageFile.size > 0 ? await uploadImage(imageFile) : undefined;

  await ProjectModel.findByIdAndUpdate(id, {
    ...parsed.data,
    ...(image ? { image } : {}),
  });

  revalidatePath(projectsPath());
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
}
