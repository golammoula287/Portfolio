"use client";

import { motion } from "framer-motion";
import { ExternalLink, Trophy } from "lucide-react";

type AchievementCardProps = {
  title: string;
  issuer: string;
  description: string;
  date: Date | string;
  url?: string | null;
  image?: { url: string } | null;
};

export function AchievementCard({ title, issuer, description, date, url, image }: AchievementCardProps) {
  const formattedDate = new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" });

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card ring-1 ring-transparent transition-all hover:border-primary/40 hover:ring-primary/20 hover:shadow-lg hover:shadow-primary/5"
    >
      {image?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image.url} alt={title} className="aspect-video w-full object-cover" />
      ) : (
        <div className="flex aspect-[5/2] w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--color-primary)_22%,transparent),transparent_70%)]">
          <Trophy className="size-8 text-primary/50" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-primary">{issuer}</span>
          <span aria-hidden>·</span>
          <span>{formattedDate}</span>
        </div>
        <h3 className="font-heading text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            View <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
