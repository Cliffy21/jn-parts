"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  maxSizeMB?: number;
}

export default function ImageUploader({ 
  value, 
  onChange,
  accept = "image/*",
  maxSizeMB = 10
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  async function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      if (data.secure_url) {
        onChange(data.secure_url);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("Upload failed: No URL returned");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <input 
        type="file" 
        onChange={uploadImage} 
        accept={accept}
        className="text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600 file:cursor-pointer cursor-pointer"
        disabled={uploading}
      />
      {uploading && (
        <p className="text-xs text-gray-400 flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          Uploading...
        </p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
      {value && (
        <div className="w-32 h-32 relative rounded-lg overflow-hidden border border-white/10">
          <Image
            src={getOptimizedImageUrl(value, 256, 256)}
            alt="Uploaded preview"
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
      )}
    </div>
  );
}
