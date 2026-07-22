import Link from "next/link";
import { FolderKanban, Trophy, Briefcase, Mail, Sparkles } from "lucide-react";
import { getAdminStats } from "@/lib/data/admin-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/admin/count-up";
import { DonutRing } from "@/components/admin/donut-ring";

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
      color: "text-blue-400 bg-blue-400/10",
      href: `/${secretSlug}/projects`,
    },
    {
      label: "Achievements",
      value: stats.totalAchievements,
      icon: Trophy,
      color: "text-amber-400 bg-amber-400/10",
      href: `/${secretSlug}/achievements`,
    },
    {
      label: "Experience",
      value: stats.totalExperience,
      icon: Briefcase,
      color: "text-purple-400 bg-purple-400/10",
      href: `/${secretSlug}/experience`,
    },
    {
      label: "Skills",
      value: stats.totalSkills,
      icon: Sparkles,
      color: "text-pink-400 bg-pink-400/10",
      href: `/${secretSlug}/skills`,
    },
    {
      label: "Messages",
      value: stats.unreadMessages,
      sub: "unread",
      icon: Mail,
      color: "text-teal-400 bg-teal-400/10",
      href: `/${secretSlug}/messages`,
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ label, value, sub, icon: Icon, color, href }) => (
            <Link key={label} href={href}>
              <Card className="transition-colors hover:border-primary/50">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                  <span className={`flex size-8 items-center justify-center rounded-full ${color}`}>
                    <Icon className="size-4" />
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    <CountUp value={value} />
                  </p>
                  {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="flex flex-col items-center justify-center gap-3 p-6">
          <div className="relative">
            <DonutRing value={stats.publishedContent} total={stats.totalContent} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-semibold">
                {stats.totalContent > 0 ? Math.round((stats.publishedContent / stats.totalContent) * 100) : 0}%
              </span>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {stats.publishedContent} of {stats.totalContent} items published
          </p>
        </Card>
      </div>
    </main>
  );
}
