"use client";

import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
  title: string;
  price: number;
  image?: string | null;
}

export function AddToCartButton({ productId, title, price, image }: AddToCartButtonProps) {
  const addItem = useCart((s) => s.addItem);

  function handleClick() {
    addItem({ productId, title, price, image, quantity: 1 });
    toast.success(`${title} добавлен в корзину`);
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#44CF5E] text-white text-sm font-medium rounded-xl hover:bg-[#3abf52] transition-colors"
    >
      <ShoppingCart className="h-4 w-4" />
      Купить — {formatPrice(price)}
    </button>
  );
}
