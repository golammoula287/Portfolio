import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connect";
import { AchievementModel, type Achievement } from "@/models/achievement";
import { AchievementForm } from "../../achievement-form";
import { updateAchievement } from "../../actions";

export default async function EditAchievementPage({
  params,
}: {
  params: Promise<{ secretSlug: string; id: string }>;
}) {
  const { id } = await params;

  await connectToDatabase();
  const achievement = await AchievementModel.findById(id).lean<Achievement>();

  if (!achievement) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">Edit achievement</h1>
      <div className="max-w-2xl">
        <AchievementForm
          action={updateAchievement.bind(null, id)}
          defaultValues={achievement}
          submitLabel="Save changes"
        />
      </div>
    </main>
  );
}
