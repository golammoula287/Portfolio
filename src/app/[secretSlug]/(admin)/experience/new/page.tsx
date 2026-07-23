import { ExperienceForm } from "../experience-form";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">New experience</h1>
      <div className="max-w-2xl">
        <ExperienceForm action={createExperience} submitLabel="Create experience" />
      </div>
    </main>
  );
}
