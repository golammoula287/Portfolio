import Link from "next/link";
import { LogoutButton } from "@/components/shared/logout-button";

const NAV_LINKS = [
  { href: "dashboard", label: "Dashboard" },
  { href: "projects", label: "Projects" },
  { href: "achievements", label: "Achievements" },
  { href: "experience", label: "Experience" },
];

export function AdminNav({ secretSlug }: { secretSlug: string }) {
  return (
    <header className="border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={`/${secretSlug}/${link.href}`}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <LogoutButton secretSlug={secretSlug} />
      </div>
    </header>
  );
}
