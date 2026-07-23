"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

const HeroScene = dynamic(() => import("./hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  const { github, linkedin, facebook } = siteConfig.socials;

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden lg:min-h-screen"
    >
      {/* Ambient glow behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_45%_at_70%_35%,color-mix(in_oklch,var(--color-primary)_16%,transparent),transparent)]"
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr]"
      >
        <div className="order-2 flex flex-col items-start gap-5 text-left lg:order-1">
          <motion.p variants={item} className="font-mono text-sm text-primary">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="text-[2.75rem] leading-[0.95] font-bold tracking-tight break-words sm:text-6xl lg:text-7xl"
          >
            <span className="text-primary">{siteConfig.name}</span>
          </motion.h1>

          <motion.p variants={item} className="text-xl font-medium text-foreground/90 sm:text-2xl">
            {siteConfig.title}
          </motion.p>

          <motion.p variants={item} className="max-w-md text-balance text-muted-foreground">
            {siteConfig.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-2">
            <Button render={<Link href="#work" />}>View projects</Button>
            <Button variant="outline" render={<a href={siteConfig.resumeUrl} download />}>
              <Download /> Download CV
            </Button>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-4 pt-2 text-muted-foreground">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-primary">
                <GithubIcon className="size-5" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-primary">
                <LinkedinIcon className="size-5" />
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="transition-colors hover:text-primary">
                <FacebookIcon className="size-5" />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="relative order-1 mx-auto aspect-square w-full max-w-[16rem] sm:max-w-xs lg:order-2 lg:max-w-sm"
        >
          <div className="absolute inset-0">
            <HeroScene />
          </div>
          <Image
            src="/profile.jpg"
            alt={siteConfig.name}
            width={220}
            height={220}
            priority
            className="absolute inset-0 m-auto size-32 rounded-full border-2 border-primary/40 object-cover shadow-2xl sm:size-40 lg:size-48"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
