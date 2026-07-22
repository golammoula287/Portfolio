import { Hero } from "@/components/public/hero";
import { AboutSection } from "@/components/public/sections/about-section";
import { ExperienceSection } from "@/components/public/sections/experience-section";
import { WorkSection } from "@/components/public/sections/work-section";
import { AchievementsSection } from "@/components/public/sections/achievements-section";
import { ContactSection } from "@/components/public/sections/contact-section";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col divide-y">
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <WorkSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  );
}
