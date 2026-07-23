import { Trophy } from "lucide-react";
import { getPublishedAchievementsPage } from "@/lib/data/achievements";
import { AchievementCard } from "@/components/public/achievement-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Pagination } from "@/components/shared/pagination";

export const metadata = {
  title: "Achievements",
};

export default async function AchievementsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const requestedPage = Number(page) || 1;
  const { items: achievements, totalPages, currentPage } =
    await getPublishedAchievementsPage(requestedPage);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16">
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
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/achievements" />
        </>
      )}
    </main>
  );
}
