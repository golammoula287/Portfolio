import Image from "next/image";
import { GraduationCap, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getPublishedSkillsByCategory } from "@/lib/data/skills";
import { siteConfig } from "@/lib/site-config";

export async function AboutSection() {
  const skillGroups = await getPublishedSkillsByCategory();

  return (
    <section id="about" className="mx-auto flex w-full max-w-4xl scroll-mt-24 flex-col gap-12 px-6 sm:gap-16 py-16 sm:py-24">
      <div className="flex flex-col gap-8">
        <SectionHeading icon={User} title="About" />
        <Reveal delay={0.05} className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="relative mx-auto sm:mx-0">
            <div aria-hidden className="absolute -inset-2 rounded-2xl bg-primary/15 blur-xl" />
            <Image
              src="/profile.jpg"
              alt={siteConfig.name}
              width={160}
              height={160}
              className="relative size-36 rounded-2xl border-2 border-primary/30 object-cover sm:size-40"
            />
          </div>
          <p className="text-pretty leading-relaxed text-muted-foreground">{siteConfig.summary}</p>
        </Reveal>
      </div>

      {skillGroups.length > 0 && (
        <Reveal className="flex flex-col gap-6">
          <h3 className="font-heading text-xl font-semibold tracking-tight">Skills</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map(({ category, items }) => (
              <div key={category} className="rounded-xl border p-4">
                <p className="text-sm font-medium text-primary">{category}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal className="flex flex-col gap-6">
        <h3 className="font-heading text-xl font-semibold tracking-tight">Education</h3>
        <div className="flex flex-col gap-6 border-l-2 border-border pl-6">
          {siteConfig.education.map((entry) => (
            <div key={entry.degree} className="relative">
              <span className="absolute top-0.5 -left-[31px] flex size-5 items-center justify-center rounded-full bg-primary/15">
                <GraduationCap className="size-3 text-primary" />
              </span>
              <p className="font-medium">{entry.degree}</p>
              <p className="text-sm text-muted-foreground">{entry.institution}</p>
              <p className="text-sm text-muted-foreground">{entry.period}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
