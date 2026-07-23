import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

type SectionHeadingProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
};

export function SectionHeading({ icon: Icon, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="size-5" />
        </span>
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </div>
      {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
    </Reveal>
  );
}
