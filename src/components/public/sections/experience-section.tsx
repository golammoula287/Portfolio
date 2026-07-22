import { Briefcase } from "lucide-react";
import { getPublishedExperience } from "@/lib/data/experience";
import { EmptyState } from "@/components/shared/empty-state";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";

function formatRange(startDate: Date | string, endDate?: Date | string | null) {
  const format = (date: Date | string) =>
    new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" });
  return `${format(startDate)} – ${endDate ? format(endDate) : "Present"}`;
}

export async function ExperienceSection() {
  const experience = await getPublishedExperience();

  return (
    <section id="experience" className="mx-auto flex w-full max-w-3xl scroll-mt-24 flex-col gap-6 px-6 py-24">
      <SectionHeading index={2} title="Experience" />

      {experience.length === 0 ? (
        <EmptyState icon={Briefcase} title="No experience yet" description="Check back soon." />
      ) : (
        <div className="flex flex-col gap-8 border-l pl-6">
          {experience.map((entry, index) => (
            <Reveal key={String(entry._id)} delay={index * 0.05} className="relative">
              <div className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-primary" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  {entry.role} · {entry.company}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {formatRange(entry.startDate, entry.endDate)}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
              {entry.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {entry.technologies.map((tech: string) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
