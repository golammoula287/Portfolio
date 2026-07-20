import { Schema, model, models, type InferSchemaType } from "mongoose";

const achievementSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    url: { type: String, trim: true },
    image: {
      type: new Schema(
        {
          publicId: { type: String, required: true },
          url: { type: String, required: true },
        },
        { _id: false }
      ),
      required: false,
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export type Achievement = InferSchemaType<typeof achievementSchema>;

export const AchievementModel = models.Achievement ?? model("Achievement", achievementSchema);
