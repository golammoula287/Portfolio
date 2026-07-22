import { Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { GithubIcon, LinkedinIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const { github, linkedin } = siteConfig.socials;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16">
      <SectionHeading
        index={5}
        title="Contact"
        description="Have a role, a project, or just want to say hello? Send a message and I'll get back to you."
      />

      <div className="grid gap-8 sm:grid-cols-[1fr_1.4fr]">
        <Reveal className="flex flex-col gap-4">
          <div className="flex items-start gap-3 text-sm">
            <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
            <a href={`mailto:${siteConfig.email}`} className="hover:underline">
              {siteConfig.email}
            </a>
          </div>
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{siteConfig.location}</span>
          </div>
          {(github || linkedin) && (
            <div className="flex items-center gap-4 pt-2">
              {github && (
                <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-foreground">
                  <GithubIcon className="size-5" />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-foreground">
                  <LinkedinIcon className="size-5" />
                </a>
              )}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <Card>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
