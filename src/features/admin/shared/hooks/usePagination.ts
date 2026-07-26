"use client";

import { useMemo, useState } from "react";

type SortDirection = "asc" | "desc";

interface UsePaginationProps<T> {
  data: T[];
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination<T>({
  data,
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationProps<T>) {
  const [page, setPage] = useState(initialPage);

  const [pageSize, setPageSize] = useState(initialPageSize);

  const [search, setSearch] = useState("");

  const [sortKey, setSortKey] = useState<keyof T | null>(null);

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  /**
   * Search
   */

  const searchedData = useMemo(() => {
    if (!search) return data;

    return data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  /**
   * Sort
   */

  const sortedData = useMemo(() => {
    if (!sortKey) return searchedData;

    return [...searchedData].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (valueA === valueB) return 0;

      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : -1;
      }

      return valueA < valueB ? 1 : -1;
    });
  }, [searchedData, sortKey, sortDirection]);

  /**
   * Pagination
   */

  const totalItems = sortedData.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const currentPage = Math.min(page, totalPages);

  const items = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  function nextPage() {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }

  function previousPage() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function goToPage(page: number) {
    setPage(Math.min(Math.max(page, 1), totalPages));
  }

  function changePageSize(size: number) {
    setPageSize(size);
    setPage(1);
  }

  function sortBy(key: keyof T) {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }

    setPage(1);
  }

  function reset() {
    setPage(1);
    setSearch("");
    setSortKey(null);
    setSortDirection("asc");
    setPageSize(initialPageSize);
  }

  return {
    items,

    page: currentPage,

    pageSize,

    totalItems,

    totalPages,

    hasNextPage: currentPage < totalPages,

    hasPreviousPage: currentPage > 1,

    search,

    setSearch,

    sortKey,

    sortDirection,

    sortBy,

    nextPage,

    previousPage,

    goToPage,

    changePageSize,

    reset,
  };
}
