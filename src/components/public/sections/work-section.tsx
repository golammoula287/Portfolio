import Link from "next/link";
import { FolderKanban, ArrowUpRight } from "lucide-react";
import { getRecentProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/public/project-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

export async function WorkSection() {
  const projects = await getRecentProjects(3);

  return (
    <section id="work" className="mx-auto flex w-full max-w-5xl scroll-mt-24 flex-col gap-8 px-6 py-16 sm:py-24">
      <SectionHeading icon={FolderKanban} title="Recent Work" description="A few things I've designed and built recently." />

      {projects.length === 0 ? (
        <EmptyState icon={FolderKanban} title="No projects yet" description="Check back soon." />
      ) : (
        <>
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
          <div className="flex justify-center">
            <Button variant="outline" render={<Link href="/projects" />}>
              View all projects <ArrowUpRight />
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
