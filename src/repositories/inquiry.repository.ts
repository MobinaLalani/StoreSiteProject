import { readJson, updateJson } from "@/src/lib/json-store";

export interface Inquiry { id: number; name: string; mobile: string; productId?: number; productTitle: string; quantity?: number; description?: string; preferredContact?: string; status: "new" | "contacted" | "quoted" | "completed" | "cancelled"; adminNote: string; createdAt: string; updatedAt: string }
const filename = "inquiries.json";
export const inquiryRepository = {
  async getAll() { return (await readJson<Inquiry[]>(filename, [])).sort((a, b) => b.createdAt.localeCompare(a.createdAt)); },
  async create(data: Omit<Inquiry, "id" | "status" | "adminNote" | "createdAt" | "updatedAt">) { let created!: Inquiry; await updateJson<Inquiry[]>(filename, [], (items) => { const now = new Date().toISOString(); created = { id: items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1, status: "new", adminNote: "", createdAt: now, updatedAt: now, ...data }; return [...items, created]; }); return created; },
  async update(id: number, patch: Partial<Pick<Inquiry, "status" | "adminNote">>) { let updated: Inquiry | null = null; await updateJson<Inquiry[]>(filename, [], (items) => items.map((item) => item.id === id ? (updated = { ...item, ...patch, updatedAt: new Date().toISOString() }) : item)); return updated; },
  async delete(id: number) { let deleted = false; await updateJson<Inquiry[]>(filename, [], (items) => items.filter((item) => { if (item.id === id) deleted = true; return item.id !== id; })); return deleted; },
};
