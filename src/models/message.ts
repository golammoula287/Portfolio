import { Schema, model, models, type InferSchemaType } from "mongoose";

const messageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "read", "archived"], default: "new" },
  },
  { timestamps: true }
);

export type Message = InferSchemaType<typeof messageSchema>;

export const MessageModel = models.Message ?? model("Message", messageSchema);
