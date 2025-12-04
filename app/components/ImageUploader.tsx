"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  
  async function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (data.secure_url) {
      onChange(data.secure_url);
    } else {
      alert("Upload failed");
    }
  }

  return (
    <div className="space-y-2">
      <input type="file" onChange={uploadImage} className="text-sm" />
      {uploading && <p className="text-xs text-gray-400">Uploading...</p>}
      {value && (
        <div className="w-32 h-32 relative">
          <Image
            src={value}
            alt="Uploaded preview"
            fill
            className="object-cover rounded border border-white/10"
          />
        </div>
      )}
    </div>
  );
}
