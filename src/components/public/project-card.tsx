"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/shared/social-icons";

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
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card ring-1 ring-transparent transition-all hover:border-primary/40 hover:ring-primary/20 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Media */}
      <Link href={`/projects/${slug}`} className="relative block aspect-video overflow-hidden">
        {image?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url}
            alt={title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--color-primary)_25%,transparent),transparent_70%)]">
            <span className="font-heading text-4xl font-bold text-primary/50">{title.charAt(0)}</span>
          </div>
        )}
        <span className="absolute right-3 top-3 flex size-8 translate-y-1 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          <Link href={`/projects/${slug}`} className="transition-colors hover:text-primary">
            {title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{summary}</p>

        {techStack.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="font-mono text-[0.7rem]">
                {tech}
              </Badge>
            ))}
            {techStack.length > 4 && (
              <Badge variant="outline" className="font-mono text-[0.7rem]">
                +{techStack.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center gap-3 border-t pt-3 text-sm">
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-1 font-medium text-primary transition-opacity hover:opacity-80"
          >
            View details <ArrowUpRight className="size-3.5" />
          </Link>
          <span className="ml-auto flex items-center gap-2 text-muted-foreground">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" aria-label="Live site" className="transition-colors hover:text-foreground">
                <ExternalLink className="size-4" />
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="Source code" className="transition-colors hover:text-foreground">
                <GithubIcon className="size-4" />
              </a>
            )}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
