"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";
import { SECTIONS } from "@/lib/sections";
import { cn } from "@/lib/utils";

function useActiveSection() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(null);
      return;
    }

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

    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
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
  const { github, linkedin, facebook } = siteConfig.socials;
  const onHome = pathname === "/";

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {SECTIONS.map(({ id, label, icon: Icon }) => {
        const isActive = onHome && activeId === id;
        return (
          <Link
            key={id}
            href={`/#${id}`}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <Icon
              className={cn(
                "size-4 shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-foreground"
              )}
            />
            {label}
          </Link>
        );
      })}

      <div className="mt-auto flex items-center gap-4 px-3 pt-6">
        {github && (
          <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary">
            <GithubIcon className="size-4" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary">
            <LinkedinIcon className="size-4" />
          </a>
        )}
        {facebook && (
          <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-muted-foreground transition-colors hover:text-primary">
            <FacebookIcon className="size-4" />
          </a>
        )}
      </div>
    </nav>
  );
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image src="/MyLogo.png" alt="" width={40} height={40} className="rounded-full ring-1 ring-border" />
      <span className="font-heading text-base font-bold tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}

export function SiteSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop fixed left rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col gap-10 border-r bg-background px-5 py-8 lg:flex">
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
