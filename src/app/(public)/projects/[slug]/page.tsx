import { notFound } from "next/navigation";
import { ExternalLink, Code2 } from "lucide-react";
import { getPublishedProjectBySlug } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      {project.image?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image.url}
          alt=""
          className="aspect-video w-full rounded-xl object-cover ring-1 ring-foreground/10"
        />
      )}

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground">{project.summary}</p>

        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech: string) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {(project.liveUrl || project.githubUrl) && (
          <div className="flex gap-2 pt-1">
            {project.liveUrl && (
              <Button render={<a href={project.liveUrl} target="_blank" rel="noreferrer" />}>
                <ExternalLink /> Live site
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outline"
                render={<a href={project.githubUrl} target="_blank" rel="noreferrer" />}
              >
                <Code2 /> Source
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
        {project.description}
      </div>
    </main>
  );
}
