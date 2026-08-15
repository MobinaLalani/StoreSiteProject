import { readJson, updateJson } from "@/src/lib/json-store";
import type { Customer } from "@/src/types/customer";
const filename = "customers.json";
export class DuplicateCustomerError extends Error {}
export class CustomerRepository {
  getAll() { return readJson<Customer[]>(filename, []); }
  async getById(id: number) { return (await this.getAll()).find((item) => item.id === id); }
  async getByIdentity(identity: string) { const normalized = identity.trim().toLocaleLowerCase("en-US"); return (await this.getAll()).find((item) => item.mobile === normalized || item.email === normalized); }
  async create(data: Pick<Customer, "fullName" | "mobile" | "email" | "passwordHash">) { let created!: Customer; await updateJson<Customer[]>(filename, [], (items) => { if (items.some((item) => item.mobile === data.mobile || (data.email && item.email === data.email))) throw new DuplicateCustomerError("این موبایل یا ایمیل قبلاً ثبت شده است."); const now = new Date().toISOString(); created = { id: items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1, ...data, createdAt: now, updatedAt: now }; return [...items, created]; }); return created; }
}
export const customerRepository = new CustomerRepository();
