"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }} className="h-full">
      <Card className="h-full pt-0 transition-colors hover:ring-primary/50">
        {image?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.url} alt="" className="aspect-video w-full object-cover" />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-t-xl bg-gradient-to-br from-primary/15 to-transparent">
            <span className="font-heading text-3xl font-bold text-primary/40">{title.charAt(0)}</span>
          </div>
        )}
        <CardHeader>
          <CardTitle>
            <Link href={`/projects/${slug}`} className="transition-colors hover:text-primary">
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
    </motion.div>
  );
}
