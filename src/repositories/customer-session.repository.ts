import { randomUUID } from "node:crypto";
import { readJson, updateJson } from "@/src/lib/json-store";
import type { CustomerSession } from "@/src/types/customer";
const filename = "customer-sessions.json";
export class CustomerSessionRepository {
  async create(customerId: number, tokenHash: string, expiresAt: string) { const session = { id: randomUUID(), customerId, tokenHash, expiresAt, createdAt: new Date().toISOString() }; await updateJson<CustomerSession[]>(filename, [], (items) => [...items.filter((item) => new Date(item.expiresAt).getTime() > Date.now()), session]); return session; }
  async getValidByHash(tokenHash: string) { const session = (await readJson<CustomerSession[]>(filename, [])).find((item) => item.tokenHash === tokenHash); return session && new Date(session.expiresAt).getTime() > Date.now() ? session : undefined; }
  async deleteByHash(tokenHash: string) { await updateJson<CustomerSession[]>(filename, [], (items) => items.filter((item) => item.tokenHash !== tokenHash)); }
}
export const customerSessionRepository = new CustomerSessionRepository();
