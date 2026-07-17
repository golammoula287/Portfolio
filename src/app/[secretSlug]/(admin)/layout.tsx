import { notFound } from "next/navigation";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ secretSlug: string }>;
}) {
  const { secretSlug } = await params;

  if (secretSlug !== process.env.ADMIN_ROUTE_SLUG) {
    notFound();
  }

  // Real session verification (verifySession DAL) lands in Phase 5.
  return <div className="flex min-h-screen flex-col">{children}</div>;
}
