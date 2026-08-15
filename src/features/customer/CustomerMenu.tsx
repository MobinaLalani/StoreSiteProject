"use client";
import Link from "next/link";
import { LogIn, User } from "lucide-react";
import { useCustomer } from "./useCustomer";
export default function CustomerMenu() { const { data: customer, isLoading } = useCustomer(); return customer ? <Link href="/account" title={customer.fullName} className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 sm:h-11 sm:w-11" aria-label="حساب کاربری"><User/></Link> : <Link href="/login" className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100 sm:h-11 sm:w-11" aria-label="ورود">{isLoading ? <span className="h-5 w-5 animate-pulse rounded-full bg-slate-200"/> : <LogIn/>}</Link>; }
