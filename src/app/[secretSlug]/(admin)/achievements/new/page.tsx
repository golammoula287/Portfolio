import { AchievementForm } from "../achievement-form";
import { createAchievement } from "../actions";

export default function NewAchievementPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-8">
      <h1 className="text-2xl font-semibold">New achievement</h1>
      <div className="max-w-xl">
        <AchievementForm action={createAchievement} submitLabel="Create achievement" />
      </div>
    </main>
  );
}
