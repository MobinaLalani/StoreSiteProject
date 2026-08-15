import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { NextRequest, NextResponse } from "next/server";
import { customerRepository } from "@/src/repositories/customer.repository";
import { customerSessionRepository } from "@/src/repositories/customer-session.repository";

const scrypt = promisify(scryptCallback);
export const CUSTOMER_COOKIE = "customer_session";
export const CUSTOMER_SESSION_TTL = 30 * 24 * 60 * 60;
export const normalizeMobile = (value: string) => value.trim().replace(/[^\d]/g, "").replace(/^98(?=9\d{9}$)/, "0");
export const normalizeEmail = (value: string) => value.trim().toLocaleLowerCase("en-US");
export const hashSessionToken = (token: string) => createHash("sha256").update(token).digest("hex");

export async function hashCustomerPassword(password: string) { const salt = randomBytes(16).toString("hex"); const derived = await scrypt(password, salt, 64) as Buffer; return `${salt}:${derived.toString("hex")}`; }
export async function verifyCustomerPassword(password: string, encoded: string) { const [salt, expectedHex] = encoded.split(":"); if (!salt || !expectedHex) return false; const expected = Buffer.from(expectedHex, "hex"); const actual = await scrypt(password, salt, expected.length) as Buffer; return actual.length === expected.length && timingSafeEqual(actual, expected); }
export async function createCustomerSession(customerId: number) { const token = randomBytes(32).toString("base64url"); await customerSessionRepository.create(customerId, hashSessionToken(token), new Date(Date.now() + CUSTOMER_SESSION_TTL * 1000).toISOString()); return token; }
export function setCustomerCookie(response: NextResponse, request: NextRequest, token: string) { const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", ""); response.cookies.set(CUSTOMER_COOKIE, token, { httpOnly: true, secure: protocol === "https", sameSite: "lax", path: "/", maxAge: CUSTOMER_SESSION_TTL, priority: "high" }); }
export async function customerFromRequest(request: NextRequest) { const token = request.cookies.get(CUSTOMER_COOKIE)?.value; if (!token) return null; const session = await customerSessionRepository.getValidByHash(hashSessionToken(token)); return session ? customerRepository.getById(session.customerId) : null; }
export async function revokeCustomerSession(request: NextRequest) { const token = request.cookies.get(CUSTOMER_COOKIE)?.value; if (token) await customerSessionRepository.deleteByHash(hashSessionToken(token)); }
export function publicCustomer<T extends { passwordHash: string }>(customer: T) { const { passwordHash: _password, ...safe } = customer; void _password; return safe; }
