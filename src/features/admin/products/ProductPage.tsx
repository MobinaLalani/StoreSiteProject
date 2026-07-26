"use client";

import { useState } from "react";

import { Product } from "@/src/types/product";

import ProductToolbar from "./components/ProductToolbar";
import ProductTable from "./components/ProductTable";
import ProductModal from "./components/ProductModal";
import DeleteProductDialog from "./components/DeleteProductDialog";

import { useProducts } from "./hooks/useProducts";
import { useCreateProduct } from "./hooks/useCreateProduct";
import { useUpdateProduct } from "./hooks/useUpdateProduct";
import { useDeleteProduct } from "./hooks/useDeleteProduct";

export default function ProductPage() {
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useProducts();

  const createMutation = useCreateProduct();

  const updateMutation = useUpdateProduct();

  const deleteMutation = useDeleteProduct();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleSubmit(
    data: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) {
    if (selectedProduct) {
      await updateMutation.mutateAsync({
        id: selectedProduct.id,

        data,
      });
    } else {
      await createMutation.mutateAsync(data);
    }

    setModalOpen(false);

    setSelectedProduct(null);
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product);

    setModalOpen(true);
  }

  function handleDelete(product: Product) {
    setSelectedProduct(product);

    setDeleteOpen(true);
  }

  async function confirmDelete() {
    if (!selectedProduct) return;

    await deleteMutation.mutateAsync(selectedProduct.id);

    setDeleteOpen(false);

    setSelectedProduct(null);
  }

  return (
    <div className="space-y-6">
      <ProductToolbar
        search={search}
        onSearchChange={setSearch}
        onAddProduct={() => {
          setSelectedProduct(null);

          setModalOpen(true);
        }}
      />

      <ProductTable
        products={filteredProducts}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductModal
        open={modalOpen}
        title={selectedProduct ? "ویرایش محصول" : "افزودن محصول"}
        product={selectedProduct}
        loading={createMutation.isPending || updateMutation.isPending}
        onClose={() => {
          setModalOpen(false);

          setSelectedProduct(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteProductDialog
        open={deleteOpen}
        product={selectedProduct}
        loading={deleteMutation.isPending}
        onClose={() => {
          setDeleteOpen(false);

          setSelectedProduct(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
