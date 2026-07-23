import "server-only";
import { cloudinary } from "./config";

export type UploadedImage = { publicId: string; url: string };

// Thrown when a Cloudinary upload fails (bad credentials, network, etc.) so
// callers can surface a friendly message instead of crashing the action.
export class ImageUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageUploadError";
  }
}

function isConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

// Uploads an image file to Cloudinary. Returns undefined when no file was
// provided. Throws ImageUploadError on a real failure.
export async function uploadImage(
  file: FormDataEntryValue | null,
  folder: string
): Promise<UploadedImage | undefined> {
  if (!(file instanceof File) || file.size === 0) {
    return undefined;
  }

  if (!isConfigured()) {
    throw new ImageUploadError("Image uploads aren't configured. Set your Cloudinary credentials.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    return await new Promise<UploadedImage>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error || !result) {
            reject(new ImageUploadError(error?.message || "Cloudinary upload failed."));
            return;
          }
          resolve({ publicId: result.public_id, url: result.secure_url });
        })
        .end(buffer);
    });
  } catch (error) {
    if (error instanceof ImageUploadError) throw error;
    throw new ImageUploadError((error as Error).message || "Cloudinary upload failed.");
  }
}
