export type OrderStatus = "pending_payment" | "paid" | "processing" | "shipped" | "delivered" | "cancelled" | "payment_failed";

export interface OrderItem {
  productId: number;
  title: string;
  slug: string;
  thumbnail: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  mobile: string;
  email: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  note: string;
}

export interface Order {
  id: number;
  customerId?: number;
  trackingCode: string;
  accessToken: string;
  items: OrderItem[];
  customer: OrderCustomer;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  paymentAuthority: string;
  paymentReference: string | null;
  createdAt: string;
  updatedAt: string;
}
