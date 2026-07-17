import { z } from "zod";

// Shared primitives reused across resource-specific schemas (Phase 4+).
export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lowercase, hyphen-separated");
