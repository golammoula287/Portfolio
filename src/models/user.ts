import { Schema, model, models, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: "admin", enum: ["admin"] },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;

// `models.User` reuses the compiled model across Next.js dev hot-reloads
// instead of re-registering the schema (which mongoose throws on).
export const UserModel = models.User ?? model("User", userSchema);
