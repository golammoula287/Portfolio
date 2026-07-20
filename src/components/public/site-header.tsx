import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/achievements", label: "Achievements" },
];

export function SiteHeader() {
  return (
    <header className="border-b px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="font-heading text-sm font-semibold tracking-tight">
          Portfolio
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
