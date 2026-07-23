import { Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const { github, linkedin, facebook } = siteConfig.socials;

  return (
    <section id="contact" className="mx-auto flex w-full max-w-3xl scroll-mt-24 flex-col gap-10 px-6 py-24">
      <SectionHeading
        index={5}
        title="Contact"
        description="Have a role, a project, or just want to say hello? Send a message and I'll get back to you."
      />

      <div className="grid items-start gap-8 md:grid-cols-[1fr_1.5fr]">
        <Reveal className="flex flex-col gap-5">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Mail className="size-4 text-primary" />
            </span>
            <a href={`mailto:${siteConfig.email}`} className="break-all transition-colors hover:text-primary">
              {siteConfig.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="size-4 text-primary" />
            </span>
            <span>{siteConfig.location}</span>
          </div>
          {(github || linkedin || facebook) && (
            <div className="flex items-center gap-3 pt-1">
              {github && (
                <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                  <GithubIcon className="size-4" />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                  <LinkedinIcon className="size-4" />
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                  <FacebookIcon className="size-4" />
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
    </section>
  );
}
