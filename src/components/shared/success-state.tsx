import { CheckCircle2 } from "lucide-react";

type SuccessStateProps = {
  title: string;
  description?: string;
};

export function SuccessState({ title, description }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-12 text-center">
      <CheckCircle2 className="size-8 text-primary" strokeWidth={1.5} />
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
