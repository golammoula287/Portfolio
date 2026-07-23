import "server-only";
import { connectToDatabase } from "@/lib/db/connect";
import { ProjectModel } from "@/models/project";

const PAGE_SIZE = 9;

// Latest published projects for the home page preview. Featured ones first,
// then most recent, so the home page always shows something meaningful.
export async function getRecentProjects(limit = 3) {
  await connectToDatabase();
  return ProjectModel.find({ status: "published" })
    .sort({ featured: -1, order: 1, createdAt: -1 })
    .limit(limit)
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
