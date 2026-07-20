"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { ExperienceActionState } from "./actions";
import type { Experience } from "@/models/experience";

type ExperienceFormProps = {
  action: (state: ExperienceActionState, formData: FormData) => Promise<ExperienceActionState>;
  defaultValues?: Partial<Experience>;
  submitLabel: string;
};

function toDateInputValue(date?: Date | string | null) {
  if (!date) return undefined;
  return new Date(date).toISOString().slice(0, 10);
}

export function ExperienceForm({ action, defaultValues, submitLabel }: ExperienceFormProps) {
  const [state, formAction, pending] = useActionState<ExperienceActionState, FormData>(action, null);
  const errors = state?.errors ?? {};

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field data-invalid={!!errors.role}>
          <FieldLabel htmlFor="role">Role</FieldLabel>
          <Input id="role" name="role" defaultValue={defaultValues?.role} required />
          <FieldError errors={errors.role?.map((message) => ({ message }))} />
        </Field>

        <Field data-invalid={!!errors.company}>
          <FieldLabel htmlFor="company">Company</FieldLabel>
          <Input id="company" name="company" defaultValue={defaultValues?.company} required />
          <FieldError errors={errors.company?.map((message) => ({ message }))} />
        </Field>

        <Field orientation="responsive">
          <Field data-invalid={!!errors.startDate}>
            <FieldLabel htmlFor="startDate">Start date</FieldLabel>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              defaultValue={toDateInputValue(defaultValues?.startDate)}
              required
            />
            <FieldError errors={errors.startDate?.map((message) => ({ message }))} />
          </Field>

          <Field data-invalid={!!errors.endDate}>
            <FieldLabel htmlFor="endDate">End date</FieldLabel>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              defaultValue={toDateInputValue(defaultValues?.endDate)}
            />
            <FieldError errors={errors.endDate?.map((message) => ({ message }))} />
          </Field>
        </Field>

        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={defaultValues?.description}
            required
          />
          <FieldError errors={errors.description?.map((message) => ({ message }))} />
        </Field>

        <Field>
          <FieldLabel htmlFor="technologies">Technologies</FieldLabel>
          <Input
            id="technologies"
            name="technologies"
            placeholder="Next.js, TypeScript, MongoDB"
            defaultValue={defaultValues?.technologies?.join(", ")}
          />
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
