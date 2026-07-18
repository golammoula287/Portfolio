import { ProjectForm } from "../project-form";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-8">
      <h1 className="text-2xl font-semibold">New project</h1>
      <div className="max-w-xl">
        <ProjectForm action={createProject} submitLabel="Create project" />
      </div>
    </main>
  );
}
