import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t px-6 py-6 text-center text-sm text-muted-foreground">
      &copy; {year} {siteConfig.name}. All rights reserved.
    </footer>
  );
}
