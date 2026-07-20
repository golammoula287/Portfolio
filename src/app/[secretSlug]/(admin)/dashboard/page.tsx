import Link from "next/link";
import { verifySession } from "@/lib/auth/dal";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ secretSlug: string }>;
}) {
  const { secretSlug } = await params;
  const session = await verifySession();

  return (
    <main className="flex flex-1 flex-col p-8">
      <h1 className="text-2xl font-semibold">Admin dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Signed in as {session?.userId} ({session?.role}).
      </p>
      <div className="mt-6 flex gap-3">
        <Button render={<Link href={`/${secretSlug}/projects`} />}>Manage projects</Button>
        <Button variant="outline" render={<Link href={`/${secretSlug}/achievements`} />}>
          Manage achievements
        </Button>
        <Button variant="outline" render={<Link href={`/${secretSlug}/experience`} />}>
          Manage experience
        </Button>
      </div>
    </main>
  );
}
