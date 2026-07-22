import "server-only";
import { connectToDatabase } from "@/lib/db/connect";
import { ProjectModel } from "@/models/project";
import { AchievementModel } from "@/models/achievement";
import { ExperienceModel } from "@/models/experience";
import { SkillModel } from "@/models/skill";
import { MessageModel } from "@/models/message";

export async function getAdminStats() {
  await connectToDatabase();

  const [
    totalProjects,
    publishedProjects,
    totalAchievements,
    totalExperience,
    totalSkills,
    unreadMessages,
  ] = await Promise.all([
    ProjectModel.countDocuments(),
    ProjectModel.countDocuments({ status: "published" }),
    AchievementModel.countDocuments(),
    ExperienceModel.countDocuments(),
    SkillModel.countDocuments(),
    MessageModel.countDocuments({ status: "new" }),
  ]);

  const totalContent = totalProjects + totalAchievements + totalExperience + totalSkills;
  const publishedContent =
    publishedProjects +
    (await AchievementModel.countDocuments({ status: "published" })) +
    (await ExperienceModel.countDocuments({ status: "published" })) +
    (await SkillModel.countDocuments({ status: "published" }));

  return {
    totalProjects,
    publishedProjects,
    totalAchievements,
    totalExperience,
    totalSkills,
    unreadMessages,
    totalContent,
    publishedContent,
  };
}
