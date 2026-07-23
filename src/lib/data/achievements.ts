import "server-only";
import { connectToDatabase } from "@/lib/db/connect";
import { AchievementModel } from "@/models/achievement";

const PAGE_SIZE = 9;

export async function getRecentAchievements(limit = 3) {
  await connectToDatabase();
  return AchievementModel.find({ status: "published" })
    .sort({ order: 1, date: -1 })
    .limit(limit)
    .lean();
}

export async function getPublishedAchievementsPage(page: number) {
  await connectToDatabase();

  const filter = { status: "published" as const };
  const totalCount = await AchievementModel.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const items = await AchievementModel.find(filter)
    .sort({ order: 1, date: -1 })
    .skip((currentPage - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .lean();

  return { items, totalPages, currentPage };
}
