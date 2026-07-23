import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { getPublishedProjectBySlug } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/social-icons";
import { Reveal } from "@/components/shared/reveal";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-12 sm:py-16">
      <Link
        href="/projects"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>

      <Reveal className="flex flex-col gap-4">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="text-lg text-muted-foreground">{project.summary}</p>

        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="font-mono text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.liveUrl && (
              <Button render={<a href={project.liveUrl} target="_blank" rel="noreferrer" />}>
                <ExternalLink /> Live site
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" render={<a href={project.githubUrl} target="_blank" rel="noreferrer" />}>
                <GithubIcon className="size-4" /> Source
              </Button>
            )}
          </div>
        )}
      </Reveal>

      {project.image?.url && (
        <Reveal delay={0.05}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image.url}
            alt={project.title}
            className="w-full rounded-2xl border object-cover ring-1 ring-foreground/10"
          />
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <div className="whitespace-pre-wrap leading-relaxed text-foreground/90">{project.description}</div>
      </Reveal>
    </main>
  );
}
