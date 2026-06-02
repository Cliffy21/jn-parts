import type { NextRequest } from "next/server";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/** Magic-byte signatures for common image formats */
const MAGIC_BYTES: { mime: string; bytes: number[] }[] = [
  { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { mime: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "image/gif", bytes: [0x47, 0x49, 0x46] },
  { mime: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] }, // RIFF header (WebP)
];

export function isUploadAuthorized(request: NextRequest): boolean {
  const secret = process.env.UPLOAD_API_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export function validateImageFile(file: File): { ok: true } | { ok: false; error: string } {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return { ok: false, error: "Invalid file type. Only images are allowed." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, error: "File size exceeds 10MB limit." };
  }

  if (file.size === 0) {
    return { ok: false, error: "Empty file uploaded." };
  }

  return { ok: true };
}

export function validateImageBuffer(buffer: Buffer): boolean {
  if (buffer.length < 4) return false;

  return MAGIC_BYTES.some(({ bytes }) =>
    bytes.every((byte, index) => buffer[index] === byte)
  );
}
