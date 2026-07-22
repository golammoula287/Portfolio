import { Schema, model, models, type InferSchemaType } from "mongoose";

const skillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export type Skill = InferSchemaType<typeof skillSchema>;

export const SkillModel = models.Skill ?? model("Skill", skillSchema);
