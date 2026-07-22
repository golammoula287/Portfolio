"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, FolderKanban, Trophy, Briefcase, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { LogoutButton } from "@/components/shared/logout-button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "projects", label: "Projects", icon: FolderKanban },
  { href: "achievements", label: "Achievements", icon: Trophy },
  { href: "experience", label: "Experience", icon: Briefcase },
  { href: "messages", label: "Messages", icon: Mail },
];

function NavLinks({ secretSlug, onNavigate }: { secretSlug: string; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const fullHref = `/${secretSlug}/${href}`;
        const isActive = pathname === fullHref || pathname.startsWith(`${fullHref}/`);
        return (
          <Link
            key={href}
            href={fullHref}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar({ secretSlug }: { secretSlug: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop persistent sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r sm:flex">
        <div className="border-b px-4 py-4 text-sm font-semibold tracking-tight">Admin</div>
        <NavLinks secretSlug={secretSlug} />
        <div className="border-t p-3">
          <LogoutButton secretSlug={secretSlug} />
        </div>
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="flex items-center justify-between border-b px-4 py-3 sm:hidden">
        <span className="text-sm font-semibold tracking-tight">Admin</span>
        <Sheet open={open} onOpenChange={setOpen}>
          <Button variant="outline" size="icon-sm" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-4" />
          </Button>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>Admin</SheetTitle>
            </SheetHeader>
            <NavLinks secretSlug={secretSlug} onNavigate={() => setOpen(false)} />
            <div className="border-t p-3">
              <LogoutButton secretSlug={secretSlug} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
