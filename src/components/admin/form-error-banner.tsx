import { AlertTriangle } from "lucide-react";

export function FormErrorBanner({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-0.5">
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </div>
    </div>
  );
}
