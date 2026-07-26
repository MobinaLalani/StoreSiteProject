"use client";

import { HTMLAttributes, TableHTMLAttributes } from "react";
import clsx from "clsx";

export function Table({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table
          className={clsx("min-w-full border-collapse", className)}
          {...props}
        />
      </div>
    </div>
  );
}

export function TableHead({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={clsx("bg-gray-50", className)} {...props} />;
}

export function TableBody({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={clsx(className)} {...props} />;
}

export function TableRow({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={clsx(
        "border-b border-gray-100 transition-colors hover:bg-gray-50",
        className,
      )}
      {...props}
    />
  );
}

interface TableHeadCellProps extends HTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function TableHeadCell({
  className,
  align = "right",
  ...props
}: TableHeadCellProps) {
  return (
    <th
      className={clsx(
        "px-6 py-4 text-sm font-semibold text-gray-700",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
      {...props}
    />
  );
}

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function TableCell({
  className,
  align = "right",
  ...props
}: TableCellProps) {
  return (
    <td
      className={clsx(
        "px-6 py-4 text-sm text-gray-600",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
      {...props}
    />
  );
}
