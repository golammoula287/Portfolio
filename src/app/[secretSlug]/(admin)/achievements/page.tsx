import Link from "next/link";
import { Trophy } from "lucide-react";
import { connectToDatabase } from "@/lib/db/connect";
import { AchievementModel } from "@/models/achievement";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { deleteAchievement } from "./actions";

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ secretSlug: string }>;
}) {
  const { secretSlug } = await params;

  await connectToDatabase();
  const achievements = await AchievementModel.find().sort({ order: 1, date: -1 }).lean();

  return (
    <main className="flex flex-1 flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Achievements</h1>
        <Button render={<Link href={`/${secretSlug}/achievements/new`} />}>New achievement</Button>
      </div>

      {achievements.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="No achievements yet"
          description="Add your first achievement to see it here."
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {achievements.map((achievement) => (
            <li
              key={String(achievement._id)}
              className="flex items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{achievement.title}</p>
                  <Badge variant={achievement.status === "published" ? "default" : "outline"}>
                    {achievement.status}
                  </Badge>
                  {achievement.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <p className="truncate text-sm text-muted-foreground">{achievement.issuer}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href={`/${secretSlug}/achievements/${String(achievement._id)}/edit`} />}
                >
                  Edit
                </Button>
                <form action={deleteAchievement}>
                  <input type="hidden" name="id" value={String(achievement._id)} />
                  <Button variant="destructive" size="sm" type="submit">
                    Delete
                  </Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
