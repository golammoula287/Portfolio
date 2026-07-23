import Link from "next/link";
import { Trophy, ArrowUpRight } from "lucide-react";
import { getRecentAchievements } from "@/lib/data/achievements";
import { AchievementCard } from "@/components/public/achievement-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

export async function AchievementsSection() {
  const achievements = await getRecentAchievements(3);

  return (
    <section id="achievements" className="mx-auto flex w-full max-w-5xl scroll-mt-24 flex-col gap-8 px-6 py-16 sm:py-24">
      <SectionHeading icon={Trophy} title="Achievements" description="Awards, competitions, and milestones." />

      {achievements.length === 0 ? (
        <EmptyState icon={Trophy} title="No achievements yet" description="Check back soon." />
      ) : (
        <>
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
          <div className="flex justify-center">
            <Button variant="outline" render={<Link href="/achievements" />}>
              View all achievements <ArrowUpRight />
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
