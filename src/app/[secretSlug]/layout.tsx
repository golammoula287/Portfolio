import { notFound } from "next/navigation";

// Shared by both the login page and the (admin) route group — the slug gate
// must cover both, otherwise moving login out of (admin) would leave it
// reachable under any slug.
export default async function SecretSlugLayout({
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

  return children;
}
