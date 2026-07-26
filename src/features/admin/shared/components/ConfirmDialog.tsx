"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "حذف اطلاعات",
  description = "آیا از انجام این عملیات مطمئن هستید؟",
  confirmText = "حذف",
  cancelText = "انصراف",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-bold">{title}</h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">{description}</p>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-gray-300 px-5 py-2.5 transition hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-white transition hover:bg-red-600 disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}

            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
