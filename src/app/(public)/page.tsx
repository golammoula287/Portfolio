import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { getPublishedProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/public/project-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const projects = await getPublishedProjects();
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const highlighted = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Selected work</h1>
        <p className="text-muted-foreground">A collection of projects I&apos;ve designed and built.</p>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 pb-20">
        {highlighted.length === 0 ? (
          <EmptyState icon={FolderKanban} title="No projects yet" description="Check back soon." />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlighted.map((project) => (
                <ProjectCard
                  key={String(project._id)}
                  title={project.title}
                  slug={project.slug}
                  summary={project.summary}
                  techStack={project.techStack}
                  image={project.image}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                />
              ))}
            </div>
            {projects.length > highlighted.length && (
              <div className="flex justify-center">
                <Button variant="outline" render={<Link href="/projects" />}>
                  View all projects
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
