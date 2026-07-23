"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FormErrorBanner } from "@/components/admin/form-error-banner";
import type { AchievementActionState } from "./actions";
import type { Achievement } from "@/models/achievement";

type AchievementFormProps = {
  action: (state: AchievementActionState, formData: FormData) => Promise<AchievementActionState>;
  defaultValues?: Partial<Achievement>;
  submitLabel: string;
};

function toDateInputValue(date?: Date | string) {
  if (!date) return undefined;
  return new Date(date).toISOString().slice(0, 10);
}

export function AchievementForm({ action, defaultValues, submitLabel }: AchievementFormProps) {
  const [state, formAction, pending] = useActionState<AchievementActionState, FormData>(action, null);
  const errors = state?.errors ?? {};
  const v = state?.values;

  return (
    <form action={formAction}>
      <FieldGroup>
        <FormErrorBanner messages={errors._form} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" name="title" defaultValue={v?.title ?? defaultValues?.title} required />
            <FieldError errors={errors.title?.map((message) => ({ message }))} />
          </Field>

          <Field data-invalid={!!errors.issuer}>
            <FieldLabel htmlFor="issuer">Issuer / organization</FieldLabel>
            <Input id="issuer" name="issuer" defaultValue={v?.issuer ?? defaultValues?.issuer} required />
            <FieldError errors={errors.issuer?.map((message) => ({ message }))} />
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

        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.date}>
            <FieldLabel htmlFor="date">Date</FieldLabel>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={v?.date || toDateInputValue(defaultValues?.date)}
              required
            />
            <FieldError errors={errors.date?.map((message) => ({ message }))} />
          </Field>

          <Field data-invalid={!!errors.url}>
            <FieldLabel htmlFor="url">URL</FieldLabel>
            <Input id="url" name="url" type="url" defaultValue={v?.url ?? defaultValues?.url ?? undefined} />
            <FieldError errors={errors.url?.map((message) => ({ message }))} />
          </Field>
        </div>

        <Field data-invalid={!!errors.image}>
          <FieldLabel htmlFor="image">Image</FieldLabel>
          <Input id="image" name="image" type="file" accept="image/*" />
          <FieldError errors={errors.image?.map((message) => ({ message }))} />
          <p className="text-xs text-muted-foreground">Optional. Leave empty to save without an image.</p>
          {defaultValues?.image?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={defaultValues.image.url}
              alt=""
              className="mt-2 h-24 w-auto rounded-md border object-cover"
            />
          )}
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

        <Field orientation="horizontal">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={v ? v.featured === "on" : defaultValues?.featured}
            className="size-4 rounded border-input"
          />
          <FieldLabel htmlFor="featured">Featured</FieldLabel>
        </Field>

        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Saving…" : submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
