"use client";

import { useState } from "react";
import type { TagType } from "@/src/types/tag";

import Card from "../shared/ui/Card";
import Modal from "../shared/ui/Modal";
import Pagination from "../shared/components/Pagination";

import { usePagination } from "@/src/features/admin/shared/hooks/usePagination";

import {
  TagToolbar,
  TagTable,
  TagForm,
  DeleteTagDialog,
  useTags,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from ".";


export default function TagPage() {
  const { data: tags = [], isLoading } = useTags();

  const createTag = useCreateTag();
  const updateTag = useUpdateTag();
  const deleteTag = useDeleteTag();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);

  const pagination = usePagination({
    data: tags,
    initialPageSize: 10,
  });

  async function handleCreate(data: Omit<TagType, "value">) {
    await createTag.mutateAsync(data);

    setModalOpen(false);
  }

  async function handleUpdate(data: Omit<TagType, "value">) {
    if (!selectedTag) return;

    await updateTag.mutateAsync({
      value: selectedTag.value,
      data,
    });

    setModalOpen(false);
    setSelectedTag(null);
  }

  async function handleDelete() {
    if (!selectedTag) return;

    await deleteTag.mutateAsync(selectedTag.value);

    setDeleteOpen(false);
    setSelectedTag(null);
  }

  function handleAddTag() {
    setSelectedTag(null);
    setModalOpen(true);
  }

  function handleEditTag(tag: TagType) {
    setSelectedTag(tag);
    setModalOpen(true);
  }

  function handleDeleteTag(tag: TagType) {
    deleteTag.reset();
    setSelectedTag(tag);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <Card title="مدیریت تگ‌ها" subtitle="افزودن، ویرایش و حذف تگ‌های فروشگاه">
        <TagToolbar
          search={pagination.search}
          onSearchChange={pagination.setSearch}
          onAddTag={handleAddTag}
        />

        <div className="mt-6">
          {isLoading ? (
            <div className="py-20 text-center text-gray-500">
              در حال دریافت اطلاعات...
            </div>
          ) : (
            <>
              <TagTable
                tags={pagination.items}
                onEdit={handleEditTag}
                onDelete={handleDeleteTag}
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
        title={selectedTag ? "ویرایش تگ" : "افزودن تگ"}
        onClose={() => {
          setModalOpen(false);
          setSelectedTag(null);
        }}
      >
        <TagForm
          initialValues={selectedTag}
          loading={createTag.isPending || updateTag.isPending}
          onSubmit={selectedTag ? handleUpdate : handleCreate}
        />
      </Modal>

      <DeleteTagDialog
        open={deleteOpen}
        loading={deleteTag.isPending}
        error={deleteTag.error?.message}
        tag={selectedTag}
        onClose={() => {
          deleteTag.reset();
          setDeleteOpen(false);
          setSelectedTag(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
