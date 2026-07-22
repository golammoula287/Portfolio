import { Trophy } from "lucide-react";
import { getPublishedAchievements } from "@/lib/data/achievements";
import { AchievementCard } from "@/components/public/achievement-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata = {
  title: "Achievements",
};

export default async function AchievementsPage() {
  const achievements = await getPublishedAchievements();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-16">
      <SectionHeading index={4} title="Achievements" />

      {achievements.length === 0 ? (
        <EmptyState icon={Trophy} title="No achievements yet" description="Check back soon." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <Reveal key={String(achievement._id)} delay={index * 0.05}>
              <AchievementCard
                title={achievement.title}
                issuer={achievement.issuer}
                description={achievement.description}
                date={achievement.date}
                url={achievement.url}
                image={achievement.image}
              />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
