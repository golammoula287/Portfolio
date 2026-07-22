"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { SkillActionState } from "./actions";
import type { Skill } from "@/models/skill";

type SkillFormProps = {
  action: (state: SkillActionState, formData: FormData) => Promise<SkillActionState>;
  defaultValues?: Partial<Skill>;
  submitLabel: string;
};

export function SkillForm({ action, defaultValues, submitLabel }: SkillFormProps) {
  const [state, formAction, pending] = useActionState<SkillActionState, FormData>(action, null);
  const errors = state?.errors ?? {};

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" name="name" placeholder="React.js" defaultValue={defaultValues?.name} required />
          <FieldError errors={errors.name?.map((message) => ({ message }))} />
        </Field>

        <Field data-invalid={!!errors.category}>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <Input
            id="category"
            name="category"
            placeholder="Web Development"
            defaultValue={defaultValues?.category}
            required
          />
          <FieldError errors={errors.category?.map((message) => ({ message }))} />
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
