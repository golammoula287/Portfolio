"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { SuccessState } from "@/components/shared/success-state";
import { sendMessage, type ContactActionState } from "./actions";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactActionState, FormData>(sendMessage, null);
  const errors = state?.errors ?? {};

  if (state?.success) {
    return (
      <SuccessState
        title="Message sent"
        description="Thanks for reaching out — I'll get back to you soon."
      />
    );
  }

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" name="name" autoComplete="name" required />
          <FieldError errors={errors.name?.map((message) => ({ message }))} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" autoComplete="email" required />
          <FieldError errors={errors.email?.map((message) => ({ message }))} />
        </Field>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea id="message" name="message" rows={5} required />
          <FieldError errors={errors.message?.map((message) => ({ message }))} />
        </Field>

        {/* Honeypot — hidden from real visitors, bots that fill every field trip it */}
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Sending…" : "Send message"}
        </Button>
      </FieldGroup>
    </form>
  );
}
