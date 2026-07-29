"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cart";

export function CartIcon() {
  const count = useCart((s) => s.items.length);

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#44CF5E] text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
