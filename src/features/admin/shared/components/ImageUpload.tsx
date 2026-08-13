"use client";

import { useState } from "react";

import Image from "next/image";

import { ImagePlus, Loader2, X } from "lucide-react";

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
          min-h-28 flex-col gap-2
          rounded-xl
          border-2
          border-dashed
          border-gray-300
          p-4
          transition
          active:scale-[.99] sm:min-h-32 sm:p-6 sm:hover:bg-gray-50
        "
      >
        {loading ? <Loader2 size={24} className="animate-spin text-red-500" /> : <ImagePlus size={26} className="text-red-500" />}
        <span className="text-sm font-bold text-slate-700">{loading ? "در حال آپلود..." : multiple ? "انتخاب تصاویر گالری" : "انتخاب تصویر اصلی"}</span>
        {!loading && <span className="text-xs text-slate-400">برای انتخاب لمس کنید</span>}

        <input
          type="file"
          hidden
          multiple={multiple}
          accept="image/*"
          disabled={loading}
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
              grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3
            "
        >
          {images.map((image) => (
            <div
              key={image}
              className="
                      relative
                      aspect-square w-full
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
                        right-1 top-1 grid h-8 w-8 place-items-center
                        rounded-full
                        bg-red-600
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
