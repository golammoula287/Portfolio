import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connect";
import { ProjectModel, type Project } from "@/models/project";
import { ProjectForm } from "../../project-form";
import { updateProject } from "../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ secretSlug: string; id: string }>;
}) {
  const { id } = await params;

  await connectToDatabase();
  const project = await ProjectModel.findById(id).lean<Project>();

  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">Edit project</h1>
      <div className="max-w-2xl">
        <ProjectForm
          action={updateProject.bind(null, id)}
          defaultValues={project}
          submitLabel="Save changes"
        />
      </div>
    </main>
  );
}
