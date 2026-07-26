"use client";

import { useState } from "react";

import Image from "next/image";

import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value?: string | string[];

  multiple?: boolean;

  onChange: (value: string | string[]) => void;
}

export default function ImageUpload({
  value,

  multiple = false,

  onChange,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const images = Array.isArray(value) ? value : value ? [value] : [];

  async function uploadFiles(files: FileList) {
    setLoading(true);

    try {
      const urls: string[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();

        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();

        urls.push(data.url);
      }

      if (multiple) {
        onChange([...images, ...urls]);
      } else {
        onChange(urls[0]);
      }
    } finally {
      setLoading(false);
    }
  }

  function removeImage(url: string) {
    const filtered = images.filter((item) => item !== url);

    if (multiple) {
      onChange(filtered);
    } else {
      onChange("");
    }
  }

  return (
    <div className="space-y-4">
      <label
        className="
          flex
          cursor-pointer
          items-center
          justify-center
          gap-2
          rounded-xl
          border-2
          border-dashed
          border-gray-300
          p-6
          transition
          hover:bg-gray-50
        "
      >
        <Upload size={20} />

        {loading ? "در حال آپلود..." : "انتخاب تصویر"}

        <input
          type="file"
          hidden
          multiple={multiple}
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              uploadFiles(e.target.files);
            }
          }}
        />
      </label>

      {images.length > 0 && (
        <div
          className="
              flex
              flex-wrap
              gap-3
            "
        >
          {images.map((image) => (
            <div
              key={image}
              className="
                      relative
                      h-24
                      w-24
                    "
            >
              <Image
                src={image}
                alt="preview"
                fill
                className="
                        rounded-xl
                        border
                        object-cover
                      "
              />

              <button
                type="button"
                onClick={() => removeImage(image)}
                className="
                        absolute
                        -right-2
                        -top-2
                        rounded-full
                        bg-red-600
                        p-1
                        text-white
                      "
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
