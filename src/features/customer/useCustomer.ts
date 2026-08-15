"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { PublicCustomer } from "@/src/types/customer";
async function fetchCustomer(): Promise<PublicCustomer | null> { const response = await fetch("/api/customer/me"); if (response.status === 401) return null; if (!response.ok) throw new Error("دریافت حساب کاربری ناموفق بود."); return (await response.json()).user; }
export function useCustomer() { return useQuery({ queryKey: ["customer", "me"], queryFn: fetchCustomer, staleTime: 60_000, retry: false }); }
export function useCustomerActions() { const client = useQueryClient(); return { async logout() { await fetch("/api/customer/logout", { method: "POST" }); client.setQueryData(["customer", "me"], null); }, refresh() { return client.invalidateQueries({ queryKey: ["customer", "me"] }); } }; }
