"use client";

import { useState } from "react";

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !preset) {
      alert("Cloudinary env vars not set");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    try {
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        console.error(data);
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-xs"
        />
        {uploading && (
          <span className="text-xs text-gray-400">Uploading…</span>
        )}
      </div>
      {value && (
        <img
          src={value}
          alt="Preview"
          className="w-24 h-16 object-cover rounded border border-white/10"
        />
      )}
    </div>
  );
}
