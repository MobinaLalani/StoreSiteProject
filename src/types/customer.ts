export interface Customer {
  id: number;
  fullName: string;
  mobile: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}
export type PublicCustomer = Omit<Customer, "passwordHash">;
export interface CustomerSession { id: string; customerId: number; tokenHash: string; expiresAt: string; createdAt: string; }
