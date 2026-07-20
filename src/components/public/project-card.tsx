import Link from "next/link";
import { ExternalLink, Code2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  title: string;
  slug: string;
  summary: string;
  techStack: string[];
  image?: { url: string } | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
};

export function ProjectCard({ title, slug, summary, techStack, image, liveUrl, githubUrl }: ProjectCardProps) {
  return (
    <Card>
      {image?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image.url} alt="" className="aspect-video w-full object-cover" />
      )}
      <CardHeader>
        <CardTitle>
          <Link href={`/projects/${slug}`} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>
      {techStack.length > 0 && (
        <CardContent className="flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </CardContent>
      )}
      {(liveUrl || githubUrl) && (
        <CardFooter className="gap-2 bg-transparent p-0 px-(--card-spacing) pt-2">
          {liveUrl && (
            <Button variant="outline" size="sm" render={<a href={liveUrl} target="_blank" rel="noreferrer" />}>
              <ExternalLink /> Live
            </Button>
          )}
          {githubUrl && (
            <Button variant="outline" size="sm" render={<a href={githubUrl} target="_blank" rel="noreferrer" />}>
              <Code2 /> Code
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
