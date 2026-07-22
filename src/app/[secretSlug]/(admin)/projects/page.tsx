import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { connectToDatabase } from "@/lib/db/connect";
import { ProjectModel } from "@/models/project";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { deleteProject } from "./actions";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ secretSlug: string }>;
}) {
  const { secretSlug } = await params;

  await connectToDatabase();
  const projects = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();

  return (
    <main className="flex flex-1 flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button render={<Link href={`/${secretSlug}/projects/new`} />}>New project</Button>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Create your first project to see it here."
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {projects.map((project) => (
            <li
              key={String(project._id)}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{project.title}</p>
                  <Badge variant={project.status === "published" ? "default" : "outline"}>
                    {project.status}
                  </Badge>
                  {project.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <p className="truncate text-sm text-muted-foreground">{project.summary}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href={`/${secretSlug}/projects/${String(project._id)}/edit`} />}
                >
                  Edit
                </Button>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={String(project._id)} />
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
