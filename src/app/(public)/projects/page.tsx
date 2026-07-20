import { FolderKanban } from "lucide-react";
import { getPublishedProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/public/project-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Reveal } from "@/components/shared/reveal";

export const metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>

      {projects.length === 0 ? (
        <EmptyState icon={FolderKanban} title="No projects yet" description="Check back soon." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={String(project._id)} delay={index * 0.05}>
              <ProjectCard
                title={project.title}
                slug={project.slug}
                summary={project.summary}
                techStack={project.techStack}
                image={project.image}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
