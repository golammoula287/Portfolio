"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { GithubIcon, LinkedinIcon } from "@/components/shared/social-icons";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const SECTION_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function useActiveSection() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    const elements = SECTION_LINKS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return activeId;
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const activeId = useActiveSection();
  const { github, linkedin } = siteConfig.socials;

  return (
    <nav className="flex flex-1 flex-col gap-1">
      <Link
        href="/"
        onClick={onNavigate}
        className={cn(
          "rounded-lg px-3 py-2 text-sm transition-colors",
          pathname === "/" && !activeId
            ? "bg-primary/10 font-medium text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
        )}
      >
        Home
      </Link>
      {SECTION_LINKS.map(({ id, label }) => (
        <Link
          key={id}
          href={`/#${id}`}
          onClick={onNavigate}
          className={cn(
            "rounded-lg px-3 py-2 text-sm transition-colors",
            activeId === id
              ? "bg-primary/10 font-medium text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          {label}
        </Link>
      ))}
      <Link
        href="/projects"
        onClick={onNavigate}
        className={cn(
          "rounded-lg px-3 py-2 text-sm transition-colors",
          pathname.startsWith("/projects")
            ? "bg-primary/10 font-medium text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
        )}
      >
        Projects
      </Link>

      <div className="mt-auto flex items-center gap-4 px-3 pt-6">
        {github && (
          <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-foreground">
            <GithubIcon className="size-4" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-foreground">
            <LinkedinIcon className="size-4" />
          </a>
        )}
        <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="text-muted-foreground transition-colors hover:text-foreground">
          <Mail className="size-4" />
        </a>
      </div>
    </nav>
  );
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/MyLogo.png" alt="" width={36} height={36} className="rounded-full" />
      <span className="text-base font-bold tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}

export function SiteSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop fixed left rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col gap-8 border-r bg-background px-5 py-8 lg:flex">
        <Brand />
        <NavLinks />
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-background/80 px-5 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <Brand />
        <Sheet open={open} onOpenChange={setOpen}>
          <Button variant="outline" size="icon-sm" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-4" />
          </Button>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-1 flex-col p-3">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
