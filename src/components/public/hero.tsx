"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  const { github, linkedin } = siteConfig.socials;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_oklch,var(--color-primary)_18%,transparent),transparent)]"
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center sm:py-32"
      >
        <motion.div variants={item}>
          <Image
            src="/profile.jpg"
            alt={siteConfig.name}
            width={112}
            height={112}
            priority
            className="size-28 rounded-full border object-cover shadow-lg"
          />
        </motion.div>

        <motion.h1 variants={item} className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </motion.h1>

        <motion.p variants={item} className="text-lg font-medium text-primary">
          {siteConfig.title}
        </motion.p>

        <motion.p variants={item} className="max-w-xl text-balance text-muted-foreground">
          {siteConfig.tagline}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button render={<Link href="/projects" />}>View projects</Button>
          <Button
            variant="outline"
            render={<a href={siteConfig.resumeUrl} download />}
          >
            <Download /> Download CV
          </Button>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-4 pt-2 text-muted-foreground">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-foreground">
              <GithubIcon className="size-5" />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-foreground">
              <LinkedinIcon className="size-5" />
            </a>
          )}
          <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="transition-colors hover:text-foreground">
            <Mail className="size-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
