import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connect";
import { ExperienceModel, type Experience } from "@/models/experience";
import { ExperienceForm } from "../../experience-form";
import { updateExperience } from "../../actions";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ secretSlug: string; id: string }>;
}) {
  const { id } = await params;

  await connectToDatabase();
  const experience = await ExperienceModel.findById(id).lean<Experience>();

  if (!experience) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">Edit experience</h1>
      <div className="max-w-2xl">
        <ExperienceForm
          action={updateExperience.bind(null, id)}
          defaultValues={experience}
          submitLabel="Save changes"
        />
      </div>
    </main>
  );
}
