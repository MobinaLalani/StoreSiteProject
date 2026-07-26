"use client";

import { Category } from "@/src/types/category";

import Card from "../shared/ui/Card";
import Modal from "../shared/ui/Modal";
import Pagination from "../shared/components/Pagination";

import { usePagination } from "@/src/features/admin/shared/hooks/usePagination";
import { useState } from "react";

import {
  CategoryToolbar,
  CategoryTable,
  CategoryForm,
  DeleteCategoryDialog,
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from ".";

export default function CategoryPage() {
  const { data: categories = [], isLoading } = useCategories();

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const pagination = usePagination({
    data: categories,
    initialPageSize: 10,
  });

  async function handleCreate(data: Omit<Category, "id">) {
    await createCategory.mutateAsync(data);

    setModalOpen(false);
  }

  async function handleUpdate(data: Omit<Category, "id">) {
    if (!selectedCategory) return;

    await updateCategory.mutateAsync({
      id: selectedCategory.id,
      data,
    });

    setModalOpen(false);
    setSelectedCategory(null);
  }

  async function handleDelete() {
    if (!selectedCategory) return;

    await deleteCategory.mutateAsync(selectedCategory.id);

    setDeleteOpen(false);
    setSelectedCategory(null);
  }

  function handleAddCategory() {
    setSelectedCategory(null);
    setModalOpen(true);
  }

  function handleEditCategory(category: Category) {
    setSelectedCategory(category);
    setModalOpen(true);
  }

  function handleDeleteCategory(category: Category) {
    setSelectedCategory(category);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <Card
        title="مدیریت دسته‌بندی‌ها"
        subtitle="افزودن، ویرایش و حذف دسته‌بندی‌های فروشگاه"
      >
        <CategoryToolbar
          search={pagination.search}
          onSearchChange={pagination.setSearch}
          onAddCategory={handleAddCategory}
        />

        <div className="mt-6">
          {isLoading ? (
            <div className="py-20 text-center text-gray-500">
              در حال دریافت اطلاعات...
            </div>
          ) : (
            <>
              <CategoryTable
                categories={pagination.items}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
              />

              <div className="mt-6">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={pagination.goToPage}
                />
              </div>
            </>
          )}
        </div>
      </Card>

      <Modal
        open={modalOpen}
        title={selectedCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
      >
        <CategoryForm
          initialValues={selectedCategory}
          loading={createCategory.isPending || updateCategory.isPending}
          onSubmit={selectedCategory ? handleUpdate : handleCreate}
        />
      </Modal>

      <DeleteCategoryDialog
        open={deleteOpen}
        loading={deleteCategory.isPending}
        category={selectedCategory}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
