import { SkillForm } from "../skill-form";
import { createSkill } from "../actions";

export default function NewSkillPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">New skill</h1>
      <div className="max-w-2xl">
        <SkillForm action={createSkill} submitLabel="Create skill" />
      </div>
    </main>
  );
}
