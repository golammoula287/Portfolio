import { Schema, model, models, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    techStack: { type: [String], default: [] },
    image: {
      // publicId is empty for images added via a pasted URL (no Cloudinary).
      type: new Schema(
        {
          publicId: { type: String, default: "" },
          url: { type: String, required: true },
        },
        { _id: false }
      ),
      required: false,
    },
    liveUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export type Project = InferSchemaType<typeof projectSchema>;

export const ProjectModel = models.Project ?? model("Project", projectSchema);
