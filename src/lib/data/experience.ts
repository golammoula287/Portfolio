import "server-only";
import { connectToDatabase } from "@/lib/db/connect";
import { ExperienceModel } from "@/models/experience";

export async function getPublishedExperience() {
  await connectToDatabase();
  return ExperienceModel.find({ status: "published" })
    .sort({ order: 1, startDate: -1 })
    .lean();
}
