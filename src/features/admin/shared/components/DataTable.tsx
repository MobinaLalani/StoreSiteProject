"use client";

import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | string;
  title: string;
  width?: string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  loading,
  emptyMessage = "اطلاعاتی وجود ندارد.",
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow">
        در حال بارگذاری...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.title}
                  style={{
                    width: column.width,
                  }}
                  className="px-5 py-4 text-right text-sm font-semibold text-gray-700"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.title}
                    className="px-5 py-4 text-sm text-gray-700"
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
