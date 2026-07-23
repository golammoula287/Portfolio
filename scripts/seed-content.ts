import { connectToDatabase } from "../src/lib/db/connect";
import { SkillModel } from "../src/models/skill";
import { ExperienceModel } from "../src/models/experience";
import { AchievementModel } from "../src/models/achievement";
import { siteConfig } from "../src/lib/site-config";

// Populates the site with Golam's real CV content as published items, so the
// design has something to show. Safe to re-run — upserts by a natural key.
async function main() {
  await connectToDatabase();

  // --- Skills (from site-config, grouped by category) ---
  let skillOrder = 0;
  for (const [category, skills] of Object.entries(siteConfig.skills)) {
    for (const name of skills) {
      await SkillModel.findOneAndUpdate(
        { name, category },
        { name, category, order: skillOrder++, status: "published" },
        { upsert: true }
      );
    }
  }
  console.log(`✓ ${skillOrder} skills`);

  // --- Experience ---
  const experience = [
    {
      role: "Full Stack Developer (Project-Based)",
      company: "Freelance / Personal Projects",
      startDate: new Date("2024-01-01"),
      endDate: null,
      description:
        "Designed and developed responsive web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js). Implemented RESTful APIs and handled authentication, state management, and deployment. Collaborated with team members using Git, Trello, and Agile methodologies.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git"],
      order: 0,
      status: "published",
    },
  ];
  for (const entry of experience) {
    await ExperienceModel.findOneAndUpdate({ role: entry.role, company: entry.company }, entry, {
      upsert: true,
    });
  }
  console.log(`✓ ${experience.length} experience`);

  // --- Achievements (competitions + publication) ---
  const achievements = [
    {
      title: "A Novel Dataset of North-Eastern Indian Coins for ML-Based Classification",
      issuer: "Data in Brief (Scopus Q1)",
      description:
        "Published first journal paper under the guidance of Dr. Ishtiak Al Mamoon and co-authors, presenting a novel coin image dataset for machine-learning classification.",
      date: new Date("2026-01-01"),
      url: "https://www.sciencedirect.com/science/article/pii/S2352340926003653",
      featured: true,
      order: 0,
      status: "published",
    },
    {
      title: "DUET CSE Carnival – AI Hackathon (2nd Position)",
      issuer: "Dhaka University of Engineering & Technology",
      description:
        "Secured 2nd position in the AI Hackathon track, developing an AI-based solution under time-bound competitive conditions.",
      date: new Date("2025-01-01"),
      featured: true,
      order: 1,
      status: "published",
    },
    {
      title: "NSUCEC x Cybernuts Datathon 2026",
      issuer: "Presented by bKash",
      description:
        "Participated in a data science competition focused on customer churn prediction, building survival-analysis and machine-learning models.",
      date: new Date("2026-01-01"),
      order: 2,
      status: "published",
    },
    {
      title: "Co-curricular & Extra-curricular Competitions (Runner-up ×2)",
      issuer: "IUBAT",
      description: "Achieved runner-up position in two separate university-level competitions.",
      date: new Date("2024-01-01"),
      order: 3,
      status: "published",
    },
  ];
  for (const a of achievements) {
    await AchievementModel.findOneAndUpdate({ title: a.title }, a, { upsert: true });
  }
  console.log(`✓ ${achievements.length} achievements`);

  console.log("Done.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
