"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FormErrorBanner } from "@/components/admin/form-error-banner";
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
  const v = state?.values;

  return (
    <form action={formAction}>
      <FieldGroup>
        <FormErrorBanner messages={errors._form} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.role}>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <Input id="role" name="role" defaultValue={v?.role ?? defaultValues?.role} required />
            <FieldError errors={errors.role?.map((message) => ({ message }))} />
          </Field>

          <Field data-invalid={!!errors.company}>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <Input id="company" name="company" defaultValue={v?.company ?? defaultValues?.company} required />
            <FieldError errors={errors.company?.map((message) => ({ message }))} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.startDate}>
            <FieldLabel htmlFor="startDate">Start date</FieldLabel>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              defaultValue={v?.startDate || toDateInputValue(defaultValues?.startDate)}
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
              defaultValue={v?.endDate || toDateInputValue(defaultValues?.endDate)}
            />
            <FieldError errors={errors.endDate?.map((message) => ({ message }))} />
            <p className="text-xs text-muted-foreground">Leave empty if this is your current role.</p>
          </Field>
        </div>

        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={v?.description ?? defaultValues?.description}
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
            defaultValue={v?.technologies ?? defaultValues?.technologies?.join(", ")}
          />
          <p className="text-xs text-muted-foreground">Comma-separated.</p>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="order">Order</FieldLabel>
            <Input id="order" name="order" type="number" defaultValue={v?.order ?? defaultValues?.order ?? 0} />
          </Field>

          <Field>
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <select
              id="status"
              name="status"
              defaultValue={v?.status ?? defaultValues?.status ?? "draft"}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </div>

        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Saving…" : submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
