import { randomBytes, randomInt } from "node:crypto";
import { readJson, updateJson } from "@/src/lib/json-store";
import type { Order, OrderStatus } from "@/src/types/order";

const filename = "orders.json";

export class OrderRepository {
  getAll() { return readJson<Order[]>(filename, []); }
  async getByTrackingCode(code: string) { return (await this.getAll()).find((order) => order.trackingCode === code); }
  async getByAuthority(authority: string) { return (await this.getAll()).find((order) => order.paymentAuthority === authority); }

  async create(data: Omit<Order, "id" | "trackingCode" | "accessToken" | "createdAt" | "updatedAt">) {
    let created!: Order;
    await updateJson<Order[]>(filename, [], (orders) => {
      const now = new Date().toISOString();
      created = {
        id: orders.length ? Math.max(...orders.map((item) => item.id)) + 1 : 1,
        trackingCode: `${new Date().getFullYear()}${randomInt(100000, 999999)}`,
        accessToken: randomBytes(24).toString("hex"),
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      return [...orders, created];
    });
    return created;
  }

  async updateStatus(id: number, status: OrderStatus, paymentReference?: string) {
    let updated: Order | null = null;
    await updateJson<Order[]>(filename, [], (orders) => orders.map((order) => {
      if (order.id !== id) return order;
      updated = { ...order, status, ...(paymentReference ? { paymentReference } : {}), updatedAt: new Date().toISOString() };
      return updated;
    }));
    return updated;
  }
}

export const orderRepository = new OrderRepository();
