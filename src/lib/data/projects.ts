import "server-only";
import { connectToDatabase } from "@/lib/db/connect";
import { ProjectModel } from "@/models/project";

const PAGE_SIZE = 9;

export async function getPublishedProjects() {
  await connectToDatabase();
  return ProjectModel.find({ status: "published" })
    .sort({ order: 1, createdAt: -1 })
    .lean();
}

export async function getPublishedProjectsPage(page: number) {
  await connectToDatabase();

  const filter = { status: "published" as const };
  const totalCount = await ProjectModel.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const items = await ProjectModel.find(filter)
    .sort({ order: 1, createdAt: -1 })
    .skip((currentPage - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .lean();

  return { items, totalPages, currentPage };
}

export async function getPublishedProjectBySlug(slug: string) {
  await connectToDatabase();
  return ProjectModel.findOne({ slug, status: "published" }).lean();
}
