import "server-only";
import { connectToDatabase } from "@/lib/db/connect";
import { ProjectModel } from "@/models/project";

export async function getPublishedProjects() {
  await connectToDatabase();
  return ProjectModel.find({ status: "published" })
    .sort({ order: 1, createdAt: -1 })
    .lean();
}

export async function getPublishedProjectBySlug(slug: string) {
  await connectToDatabase();
  return ProjectModel.findOne({ slug, status: "published" }).lean();
}
