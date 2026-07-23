import { Sparkles } from "lucide-react";
import { getPublishedSkillsByCategory } from "@/lib/data/skills";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

// Row-per-category layout: a fixed-width category label beside a wrapping row
// of chips. This stays tidy whether a category has 3 skills or 30, and whether
// there are 2 categories or 10 — the fix for "it looks odd with many skills".
export async function SkillsSection() {
  const skillGroups = await getPublishedSkillsByCategory();

  if (skillGroups.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="mx-auto flex w-full max-w-4xl scroll-mt-24 flex-col gap-8 px-6 py-16 sm:py-24">
      <SectionHeading icon={Sparkles} title="Skills" description="Tools and technologies I work with." />

      <div className="flex flex-col divide-y divide-border/60 rounded-2xl border bg-card/40">
        {skillGroups.map(({ category, items }, index) => (
          <Reveal
            key={category}
            delay={index * 0.05}
            className="grid gap-3 p-5 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:p-6"
          >
            <p className="font-heading text-sm font-semibold text-primary">{category}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border/70 bg-background px-2.5 py-1 text-sm text-foreground/90 transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
