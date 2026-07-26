"use client";

import { useMemo, useState } from "react";

import { Category } from "@/src/types/category";

import {
  CategoryToolbar,
  CategoryTable,
  CategoryModal,
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

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      return (
        category.title.toLowerCase().includes(search.toLowerCase()) ||
        category.slug.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [categories, search]);

  const handleCreate = async (data: Omit<Category, "id">) => {
    await createCategory.mutateAsync(data);

    setModalOpen(false);
  };

  const handleUpdate = async (data: Omit<Category, "id">) => {
    if (!selectedCategory) return;

    await updateCategory.mutateAsync({
      id: selectedCategory.id,
      data,
    });

    setModalOpen(false);

    setSelectedCategory(null);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    await deleteCategory.mutateAsync(selectedCategory.id);

    setDeleteOpen(false);

    setSelectedCategory(null);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);

    setModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);

    setModalOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);

    setDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          مدیریت دسته‌بندی‌ها
        </h1>

        <p className="mt-2 text-gray-500">
          افزودن، ویرایش و حذف دسته‌بندی‌های فروشگاه
        </p>
      </div>

      <CategoryToolbar
        search={search}
        onSearchChange={setSearch}
        onAddCategory={handleAddCategory}
      />

      {isLoading ? (
        <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
          <p className="text-gray-500">در حال دریافت اطلاعات...</p>
        </div>
      ) : (
        <CategoryTable
          categories={filteredCategories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      )}

      <CategoryModal
        open={modalOpen}
        loading={createCategory.isPending || updateCategory.isPending}
        title={selectedCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
        category={selectedCategory}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={selectedCategory ? handleUpdate : handleCreate}
      />

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