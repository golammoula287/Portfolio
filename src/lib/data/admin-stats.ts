import "server-only";
import { connectToDatabase } from "@/lib/db/connect";
import { ProjectModel } from "@/models/project";
import { AchievementModel } from "@/models/achievement";
import { ExperienceModel } from "@/models/experience";
import { MessageModel } from "@/models/message";

export async function getAdminStats() {
  await connectToDatabase();

  const [totalProjects, publishedProjects, totalAchievements, totalExperience, unreadMessages] =
    await Promise.all([
      ProjectModel.countDocuments(),
      ProjectModel.countDocuments({ status: "published" }),
      AchievementModel.countDocuments(),
      ExperienceModel.countDocuments(),
      MessageModel.countDocuments({ status: "new" }),
    ]);

  return { totalProjects, publishedProjects, totalAchievements, totalExperience, unreadMessages };
}
