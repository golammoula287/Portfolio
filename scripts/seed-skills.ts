import { connectToDatabase } from "../src/lib/db/connect";
import { SkillModel } from "../src/models/skill";
import { siteConfig } from "../src/lib/site-config";

// One-time migration of the skills already hardcoded in site-config.ts into
// the Skill collection, so they don't need to be retyped by hand in the
// admin dashboard. Safe to re-run — upserts by name+category.
async function main() {
  await connectToDatabase();

  let order = 0;
  for (const [category, skills] of Object.entries(siteConfig.skills)) {
    for (const name of skills) {
      await SkillModel.findOneAndUpdate(
        { name, category },
        { name, category, order: order++, status: "published" },
        { upsert: true }
      );
    }
  }

  console.log(`Seeded ${order} skills.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
