"use client";

import { Pencil, Trash2 } from "lucide-react";

import DataTable, {
  Column,
} from "@/src/features/admin/shared/components/DataTable";

import type { TagType } from "@/src/types/tag";

interface TagTableProps {
  tags: TagType[];
  loading?: boolean;
  onEdit: (tag: TagType) => void;
  onDelete: (tag: TagType) => void;
}

export default function TagTable({
  tags,
  loading,
  onEdit,
  onDelete,
}: TagTableProps) {
  const columns: Column<TagType>[] = [
    {
      key: "label",
      title: "عنوان تگ",
      render: (tag) => (
        <span className="font-semibold text-gray-900">{tag.label}</span>
      ),
    },

    {
      key: "actions",
      title: "عملیات",
      width: "140px",
      render: (tag) => (
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(tag)}
            className="
              rounded-lg
              bg-blue-50
              p-2
              text-blue-600
              transition
              hover:bg-blue-100
            "
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(tag)}
            className="
              rounded-lg
              bg-red-50
              p-2
              text-red-600
              transition
              hover:bg-red-100
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable<TagType>
      columns={columns}
      data={tags}
      loading={loading}
      emptyMessage="هیچ تگی وجود ندارد."
    />
  );
}
