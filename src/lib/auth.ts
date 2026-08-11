import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { readJson, updateJson } from "@/src/lib/json-store";

const scrypt = promisify(scryptCallback);
const TOKEN_TTL = 8 * 60 * 60;

interface AuthConfig {
  username: string;
  passwordHash?: string;
  tokenSecret: string;
  tokenVersion: number;
  tokenTtl: number;
}

export interface JwtPayload {
  username: string;
  version: number;
}

async function config(): Promise<AuthConfig> {
  return readJson("auth.json", {
    username: process.env.ADMIN_USERNAME ?? "admin",
    tokenSecret: process.env.JWT_SECRET ?? "change-this-secret-before-production",
    tokenVersion: 1,
    tokenTtl: TOKEN_TTL,
  });
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

async function matchesPassword(password: string, hash: string) {
  const [salt, expectedHex] = hash.split(":");
  if (!salt || !expectedHex) return false;
  const expected = Buffer.from(expectedHex, "hex");
  const actual = (await scrypt(password, salt, expected.length)) as Buffer;
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function attemptLogin(username: unknown, password: unknown) {
  if (typeof username !== "string" || typeof password !== "string") return false;
  const auth = await config();
  if (username !== auth.username) return false;
  if (auth.passwordHash) return matchesPassword(password, auth.passwordHash);
  return password === (process.env.ADMIN_PASSWORD ?? "12345");
}

export async function signToken(username: string) {
  const auth = await config();
  return jwt.sign({ username, version: auth.tokenVersion }, auth.tokenSecret, {
    expiresIn: auth.tokenTtl,
  });
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const auth = await config();
    const payload = jwt.verify(token, auth.tokenSecret) as JwtPayload;
    return payload.version === auth.tokenVersion ? payload : null;
  } catch {
    return null;
  }
}

export async function userFromRequest(request: NextRequest) {
  const bearer = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  const token = bearer ?? request.cookies.get("admin_token")?.value;
  return token ? verifyToken(token) : null;
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const auth = await config();
  const valid = auth.passwordHash
    ? await matchesPassword(currentPassword, auth.passwordHash)
    : currentPassword === (process.env.ADMIN_PASSWORD ?? "12345");
  if (!valid) return false;
  const passwordHash = await hashPassword(newPassword);
  await updateJson<AuthConfig>("auth.json", auth, (value) => ({
    ...value,
    passwordHash,
    tokenVersion: value.tokenVersion + 1,
  }));
  return true;
}

export async function revokeAllTokens() {
  const auth = await config();
  await updateJson<AuthConfig>("auth.json", auth, (value) => ({
    ...value,
    tokenVersion: value.tokenVersion + 1,
  }));
}

export async function tokenTtl() {
  return (await config()).tokenTtl;
}
