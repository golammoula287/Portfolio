import "server-only";
import { connectToDatabase } from "@/lib/db/connect";
import { SkillModel } from "@/models/skill";

export async function getPublishedSkillsByCategory() {
  await connectToDatabase();
  const skills = await SkillModel.find({ status: "published" }).sort({ category: 1, order: 1 }).lean();

  const grouped = new Map<string, string[]>();
  for (const skill of skills) {
    const list = grouped.get(skill.category) ?? [];
    list.push(skill.name);
    grouped.set(skill.category, list);
  }

  return Array.from(grouped.entries()).map(([category, items]) => ({ category, items }));
}
