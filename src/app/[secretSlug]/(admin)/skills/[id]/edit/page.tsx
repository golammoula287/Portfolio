import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connect";
import { SkillModel, type Skill } from "@/models/skill";
import { SkillForm } from "../../skill-form";
import { updateSkill } from "../../actions";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ secretSlug: string; id: string }>;
}) {
  const { id } = await params;

  await connectToDatabase();
  const skill = await SkillModel.findById(id).lean<Skill>();

  if (!skill) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">Edit skill</h1>
      <div className="max-w-2xl">
        <SkillForm action={updateSkill.bind(null, id)} defaultValues={skill} submitLabel="Save changes" />
      </div>
    </main>
  );
}
