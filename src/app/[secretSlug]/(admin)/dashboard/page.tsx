import Link from "next/link";
import { FolderKanban, Trophy, Briefcase, Mail } from "lucide-react";
import { getAdminStats } from "@/lib/data/admin-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ secretSlug: string }>;
}) {
  const { secretSlug } = await params;
  const stats = await getAdminStats();

  const cards = [
    {
      label: "Projects",
      value: stats.totalProjects,
      sub: `${stats.publishedProjects} published`,
      icon: FolderKanban,
      href: `/${secretSlug}/projects`,
    },
    {
      label: "Achievements",
      value: stats.totalAchievements,
      icon: Trophy,
      href: `/${secretSlug}/achievements`,
    },
    {
      label: "Experience",
      value: stats.totalExperience,
      icon: Briefcase,
      href: `/${secretSlug}/experience`,
    },
    {
      label: "Messages",
      value: stats.unreadMessages,
      sub: "unread",
      icon: Mail,
      href: `/${secretSlug}/messages`,
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, sub, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <Card className="transition-colors hover:border-primary/50">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                <Icon className="size-4 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{value}</p>
                {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
