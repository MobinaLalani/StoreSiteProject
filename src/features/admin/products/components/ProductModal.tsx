"use client";

import { Product } from "@/src/types/product";

import ProductForm from "./ProductForm";
import Modal from "@/src/features/admin/shared/ui/Modal";

interface ProductModalProps {
  open: boolean;

  loading?: boolean;

  error?: string;

  product?: Product | null;

  title: string;

  onClose: () => void;

  onSubmit: (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
}

export default function ProductModal({
  open,

  loading = false,

  error,

  product,

  title,

  onClose,

  onSubmit,
}: ProductModalProps) {
  if (!open) return null;

  return (
    <Modal open={open} title={title} size="xl" closeOnOverlay={!loading} onClose={onClose}>
          <ProductForm
            loading={loading}
            submissionError={error}
            initialValues={product}
            onSubmit={onSubmit}
          />
    </Modal>
  );
}
