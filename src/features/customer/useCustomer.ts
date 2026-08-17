"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { PublicCustomer } from "@/src/types/customer";

const CUSTOMER_QUERY_KEY = ["customer", "me"];

async function fetchCustomer(): Promise<PublicCustomer | null> {
  const response = await fetch("/api/customer/me", {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("دریافت حساب کاربری ناموفق بود.");
  }

  const data = await response.json();

  return data.user;
}

export function useCustomer() {
  return useQuery({
    queryKey: CUSTOMER_QUERY_KEY,

    queryFn: fetchCustomer,

    staleTime: 60_000,

    retry: false,
  });
}

export function useCustomerActions() {
  const queryClient = useQueryClient();

  async function logout() {
    await fetch("/api/customer/logout", {
      method: "POST",
      credentials: "include",
    });

    queryClient.setQueryData(CUSTOMER_QUERY_KEY, null);
  }

  function refresh() {
    return queryClient.invalidateQueries({
      queryKey: CUSTOMER_QUERY_KEY,
    });
  }

  return {
    logout,

    refresh,
  };
}
