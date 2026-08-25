"use client";

import { X } from "lucide-react";

import type { TagType } from "@/src/types/tag";

import TagForm from "./TagForm";

interface TagModalProps {
  open: boolean;
  loading?: boolean;
  tag?: TagType | null;
  title: string;

  onClose: () => void;

  onSubmit: (data: Omit<TagType, "value">) => Promise<void>;
}

export default function TagModal({
  open,
  loading = false,
  tag,
  title,
  onClose,
  onSubmit,
}: TagModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <TagForm loading={loading} initialValues={tag} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
