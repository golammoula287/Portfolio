import Link from "next/link";
import { Sparkles } from "lucide-react";
import { connectToDatabase } from "@/lib/db/connect";
import { SkillModel } from "@/models/skill";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { deleteSkill } from "./actions";

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ secretSlug: string }>;
}) {
  const { secretSlug } = await params;

  await connectToDatabase();
  const skills = await SkillModel.find().sort({ category: 1, order: 1 }).lean();

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <Button render={<Link href={`/${secretSlug}/skills/new`} />}>New skill</Button>
      </div>

      {skills.length === 0 ? (
        <EmptyState icon={Sparkles} title="No skills yet" description="Add your first skill to see it here." />
      ) : (
        <ul className="flex flex-col gap-3">
          {skills.map((skill) => (
            <li
              key={String(skill._id)}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{skill.name}</p>
                  <Badge variant={skill.status === "published" ? "default" : "outline"}>{skill.status}</Badge>
                </div>
                <p className="truncate text-sm text-muted-foreground">{skill.category}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href={`/${secretSlug}/skills/${String(skill._id)}/edit`} />}
                >
                  Edit
                </Button>
                <form action={deleteSkill}>
                  <input type="hidden" name="id" value={String(skill._id)} />
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
