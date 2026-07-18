"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { ProjectActionState } from "./actions";
import type { Project } from "@/models/project";

type ProjectFormProps = {
  action: (state: ProjectActionState, formData: FormData) => Promise<ProjectActionState>;
  defaultValues?: Partial<Project>;
  submitLabel: string;
};

export function ProjectForm({ action, defaultValues, submitLabel }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState<ProjectActionState, FormData>(action, null);
  const errors = state?.errors ?? {};

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" name="title" defaultValue={defaultValues?.title} required />
          <FieldError errors={errors.title?.map((message) => ({ message }))} />
        </Field>

        <Field data-invalid={!!errors.slug}>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <Input id="slug" name="slug" defaultValue={defaultValues?.slug} placeholder="my-project" required />
          <FieldError errors={errors.slug?.map((message) => ({ message }))} />
        </Field>

        <Field data-invalid={!!errors.summary}>
          <FieldLabel htmlFor="summary">Summary</FieldLabel>
          <Input id="summary" name="summary" defaultValue={defaultValues?.summary} required />
          <FieldError errors={errors.summary?.map((message) => ({ message }))} />
        </Field>

        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            rows={6}
            defaultValue={defaultValues?.description}
            required
          />
          <FieldError errors={errors.description?.map((message) => ({ message }))} />
        </Field>

        <Field>
          <FieldLabel htmlFor="techStack">Tech stack</FieldLabel>
          <Input
            id="techStack"
            name="techStack"
            placeholder="Next.js, TypeScript, MongoDB"
            defaultValue={defaultValues?.techStack?.join(", ")}
          />
        </Field>

        <Field data-invalid={!!errors.liveUrl}>
          <FieldLabel htmlFor="liveUrl">Live URL</FieldLabel>
          <Input id="liveUrl" name="liveUrl" type="url" defaultValue={defaultValues?.liveUrl ?? undefined} />
          <FieldError errors={errors.liveUrl?.map((message) => ({ message }))} />
        </Field>

        <Field data-invalid={!!errors.githubUrl}>
          <FieldLabel htmlFor="githubUrl">GitHub URL</FieldLabel>
          <Input id="githubUrl" name="githubUrl" type="url" defaultValue={defaultValues?.githubUrl ?? undefined} />
          <FieldError errors={errors.githubUrl?.map((message) => ({ message }))} />
        </Field>

        <Field>
          <FieldLabel htmlFor="image">Cover image</FieldLabel>
          <Input id="image" name="image" type="file" accept="image/*" />
          {defaultValues?.image?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={defaultValues.image.url}
              alt=""
              className="mt-2 h-24 w-auto rounded-md border object-cover"
            />
          )}
        </Field>

        <Field orientation="horizontal">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={defaultValues?.featured}
            className="size-4 rounded border-input"
          />
          <FieldLabel htmlFor="featured">Featured</FieldLabel>
        </Field>

        <Field>
          <FieldLabel htmlFor="order">Order</FieldLabel>
          <Input id="order" name="order" type="number" defaultValue={defaultValues?.order ?? 0} />
        </Field>

        <Field>
          <FieldLabel htmlFor="status">Status</FieldLabel>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues?.status ?? "draft"}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>

        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
