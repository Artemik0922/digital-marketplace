export type Role = "BUYER" | "SELLER";

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  image?: string | null;
  quantity: number;
}
