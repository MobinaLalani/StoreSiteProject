import { NextRequest, NextResponse } from "next/server";
import { createCustomerSession, normalizeEmail, normalizeMobile, publicCustomer, setCustomerCookie, verifyCustomerPassword } from "@/src/lib/customer-auth";
import { customerLoginSchema } from "@/src/lib/customer-validation";
import { customerRepository } from "@/src/repositories/customer.repository";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const parsed = customerLoginSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ message: "اطلاعات ورود معتبر نیست." }, { status: 422 });
  const identity = parsed.data.identity.includes("@") ? normalizeEmail(parsed.data.identity) : normalizeMobile(parsed.data.identity);
  const customer = await customerRepository.getByIdentity(identity);
  if (!customer || !(await verifyCustomerPassword(parsed.data.password, customer.passwordHash))) return NextResponse.json({ message: "موبایل/ایمیل یا رمز عبور اشتباه است." }, { status: 401 });
  const token = await createCustomerSession(customer.id); const response = NextResponse.json({ user: publicCustomer(customer) }); setCustomerCookie(response, request, token); return response;
}
