import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-16">
      <div className="flex flex-col gap-6">
        <SectionHeading index={1} title="About" />
        <Reveal delay={0.05} className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Image
            src="/profile.jpg"
            alt={siteConfig.name}
            width={96}
            height={96}
            className="size-24 shrink-0 rounded-full border object-cover"
          />
          <p className="text-muted-foreground">{siteConfig.summary}</p>
        </Reveal>
      </div>

      <Reveal className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
        <div className="flex flex-col gap-4">
          {Object.entries(siteConfig.skills).map(([category, skills]) => (
            <div key={category}>
              <p className="text-sm font-medium text-muted-foreground">{category}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight">Education</h2>
        <div className="flex flex-col gap-6 border-l pl-6">
          {siteConfig.education.map((entry) => (
            <div key={entry.degree} className="relative">
              <GraduationCap className="absolute top-0.5 -left-[33px] size-4 text-primary" />
              <p className="font-medium">{entry.degree}</p>
              <p className="text-sm text-muted-foreground">{entry.institution}</p>
              <p className="text-sm text-muted-foreground">{entry.period}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
