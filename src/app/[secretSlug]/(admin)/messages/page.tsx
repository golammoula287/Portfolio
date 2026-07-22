import { Mail } from "lucide-react";
import { connectToDatabase } from "@/lib/db/connect";
import { MessageModel } from "@/models/message";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { markMessageRead, archiveMessage, deleteMessage } from "./actions";

const STATUS_VARIANT = {
  new: "default",
  read: "outline",
  archived: "secondary",
} as const;

export default async function MessagesPage() {
  await connectToDatabase();
  const messages = await MessageModel.find().sort({ createdAt: -1 }).lean();

  return (
    <main className="flex flex-1 flex-col gap-6 p-8">
      <h1 className="text-2xl font-semibold">Messages</h1>

      {messages.length === 0 ? (
        <EmptyState icon={Mail} title="No messages yet" description="Submissions from the contact form show up here." />
      ) : (
        <ul className="flex flex-col gap-3">
          {messages.map((message) => (
            <li key={String(message._id)}>
              <Card>
                <CardHeader className="flex-row flex-wrap items-center justify-between gap-4 space-y-0">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{message.name}</p>
                      <Badge variant={STATUS_VARIANT[message.status as keyof typeof STATUS_VARIANT]}>
                        {message.status}
                      </Badge>
                    </div>
                    <a href={`mailto:${message.email}`} className="text-sm text-muted-foreground hover:underline">
                      {message.email}
                    </a>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {new Date(message.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="whitespace-pre-wrap text-sm text-muted-foreground">{message.message}</p>
                  <div className="flex flex-wrap gap-2">
                    {message.status === "new" && (
                      <form action={markMessageRead}>
                        <input type="hidden" name="id" value={String(message._id)} />
                        <Button variant="outline" size="sm" type="submit">
                          Mark read
                        </Button>
                      </form>
                    )}
                    {message.status !== "archived" && (
                      <form action={archiveMessage}>
                        <input type="hidden" name="id" value={String(message._id)} />
                        <Button variant="outline" size="sm" type="submit">
                          Archive
                        </Button>
                      </form>
                    )}
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={String(message._id)} />
                      <Button variant="destructive" size="sm" type="submit">
                        Delete
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
