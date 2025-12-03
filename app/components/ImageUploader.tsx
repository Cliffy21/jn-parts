"use client";

import { useState } from "react";

export default function ImageUploader({ value, onChange }: any) {
  const [uploading, setUploading] = useState(false);

  async function uploadImage(e: any) {
    const file = e.target.files[0];
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
        <img src={value} className="w-32 rounded border border-white/10" />
      )}
    </div>
  );
}
