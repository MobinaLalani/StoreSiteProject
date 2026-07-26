"use client";

import { Loader2 } from "lucide-react";

interface FormActionsProps {
  loading?: boolean;
  onCancel?: () => void;
}

export default function FormActions({ loading, onCancel }: FormActionsProps) {
  return (
    <div className="mt-8 flex justify-end gap-3 border-t pt-5">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl border border-gray-300 px-6 py-2.5 transition hover:bg-gray-100"
      >
        انصراف
      </button>

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-red-500
          px-6
          py-2.5
          font-medium
          text-white
          transition
          hover:bg-red-600
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        ذخیره اطلاعات
      </button>
    </div>
  );
}
