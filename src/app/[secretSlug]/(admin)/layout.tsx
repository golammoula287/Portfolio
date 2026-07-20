import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/dal";
import { AdminNav } from "@/components/admin/admin-nav";

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

  return (
    <div className="flex min-h-screen flex-col">
      <AdminNav secretSlug={secretSlug} />
      {children}
    </div>
  );
}
