import { Reveal } from "@/components/shared/reveal";

type SectionHeadingProps = {
  index: number;
  title: string;
  description?: string;
};

export function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-primary">{String(index).padStart(2, "0")}.</span>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>
      {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
    </Reveal>
  );
}
