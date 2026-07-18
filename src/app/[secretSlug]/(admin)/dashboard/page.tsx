import Link from "next/link";
import { verifySession } from "@/lib/auth/dal";
import { LogoutButton } from "@/components/shared/logout-button";
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin dashboard</h1>
        <LogoutButton secretSlug={secretSlug} />
      </div>
      <p className="mt-2 text-muted-foreground">
        Signed in as {session?.userId} ({session?.role}).
      </p>
      <div className="mt-6">
        <Button render={<Link href={`/${secretSlug}/projects`} />}>Manage projects</Button>
      </div>
    </main>
  );
}
