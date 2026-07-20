import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { github, linkedin } = siteConfig.socials;

  return (
    <footer className="border-t px-6 py-6 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-foreground">
              <GithubIcon className="size-4" />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-foreground">
              <LinkedinIcon className="size-4" />
            </a>
          )}
          <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="transition-colors hover:text-foreground">
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
