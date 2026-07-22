import Link from "next/link";
import { Briefcase } from "lucide-react";
import { connectToDatabase } from "@/lib/db/connect";
import { ExperienceModel } from "@/models/experience";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { deleteExperience } from "./actions";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ secretSlug: string }>;
}) {
  const { secretSlug } = await params;

  await connectToDatabase();
  const experience = await ExperienceModel.find().sort({ order: 1, startDate: -1 }).lean();

  return (
    <main className="flex flex-1 flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Experience</h1>
        <Button render={<Link href={`/${secretSlug}/experience/new`} />}>New experience</Button>
      </div>

      {experience.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No experience yet"
          description="Add your first role to see it here."
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {experience.map((entry) => (
            <li
              key={String(entry._id)}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">
                    {entry.role} · {entry.company}
                  </p>
                  <Badge variant={entry.status === "published" ? "default" : "outline"}>{entry.status}</Badge>
                </div>
                <p className="truncate text-sm text-muted-foreground">{entry.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href={`/${secretSlug}/experience/${String(entry._id)}/edit`} />}
                >
                  Edit
                </Button>
                <form action={deleteExperience}>
                  <input type="hidden" name="id" value={String(entry._id)} />
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
