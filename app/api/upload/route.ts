import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate Cloudinary configuration
function validateConfig(): { valid: boolean; error?: string } {
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return { valid: false, error: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set" };
  }
  if (!process.env.CLOUDINARY_API_KEY) {
    return { valid: false, error: "CLOUDINARY_API_KEY is not set" };
  }
  if (!process.env.CLOUDINARY_API_SECRET) {
    return { valid: false, error: "CLOUDINARY_API_SECRET is not set" };
  }
  return { valid: true };
}

export async function POST(req: NextRequest) {
  try {
    // Validate configuration
    const configCheck = validateConfig();
    if (!configCheck.valid) {
      console.error("Cloudinary configuration error:", configCheck.error);
      return NextResponse.json(
        { error: "Cloudinary is not properly configured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    interface CloudinaryUploadResult {
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
      format: string;
      bytes: number;
      [key: string]: unknown;
    }

    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "jncaraccessories",
          resource_type: "auto",
          transformation: [
            { quality: "auto", fetch_format: "auto" }
          ],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload stream error:", error);
            reject(error);
          } else if (!result) {
            reject(new Error("Upload failed: No result returned"));
          } else {
            resolve(result);
          }
        }
      );

      stream.end(buffer);
    });

    // Return the essential data
    return NextResponse.json({
      success: true,
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
      // Include additional Cloudinary metadata
      url: uploadResult.url,
      version: uploadResult.version,
      created_at: uploadResult.created_at,
      resource_type: uploadResult.resource_type,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    const errorMessage = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
}
