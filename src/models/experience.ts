import { Schema, model, models, type InferSchemaType } from "mongoose";

const experienceSchema = new Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    description: { type: String, required: true },
    technologies: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export type Experience = InferSchemaType<typeof experienceSchema>;

export const ExperienceModel = models.Experience ?? model("Experience", experienceSchema);
