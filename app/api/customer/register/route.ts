import { NextRequest, NextResponse } from "next/server";
import { createCustomerSession, hashCustomerPassword, normalizeEmail, normalizeMobile, publicCustomer, setCustomerCookie } from "@/src/lib/customer-auth";
import { registerSchema } from "@/src/lib/customer-validation";
import { customerRepository, DuplicateCustomerError } from "@/src/repositories/customer.repository";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const raw = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (raw && typeof raw.mobile === "string") raw.mobile = normalizeMobile(raw.mobile);
  if (raw && typeof raw.email === "string") raw.email = normalizeEmail(raw.email);
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "اطلاعات ثبت‌نام معتبر نیست." }, { status: 422 });
  try { const customer = await customerRepository.create({ fullName: parsed.data.fullName, mobile: parsed.data.mobile, email: parsed.data.email, passwordHash: await hashCustomerPassword(parsed.data.password) }); const token = await createCustomerSession(customer.id); const response = NextResponse.json({ user: publicCustomer(customer) }, { status: 201 }); setCustomerCookie(response, request, token); return response; }
  catch (error) { if (error instanceof DuplicateCustomerError) return NextResponse.json({ message: error.message }, { status: 409 }); throw error; }
}
