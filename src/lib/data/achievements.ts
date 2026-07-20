import "server-only";
import { connectToDatabase } from "@/lib/db/connect";
import { AchievementModel } from "@/models/achievement";

export async function getPublishedAchievements() {
  await connectToDatabase();
  return AchievementModel.find({ status: "published" })
    .sort({ order: 1, date: -1 })
    .lean();
}
