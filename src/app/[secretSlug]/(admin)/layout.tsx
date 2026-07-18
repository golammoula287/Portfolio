import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/dal";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ secretSlug: string }>;
}) {
  const { secretSlug } = await params;
  const session = await verifySession();

  if (!session) {
    redirect(`/${secretSlug}/login`);
  }

  return <div className="flex min-h-screen flex-col">{children}</div>;
}
