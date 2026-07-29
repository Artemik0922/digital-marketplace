"use client";

import { useCart } from "@/store/cart";
import { createCheckoutSession } from "@/actions/checkout";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, total, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();

  function handleCheckout() {
    startTransition(async () => {
      try {
        await createCheckoutSession(
          items.map((i) => ({ productId: i.productId, quantity: i.quantity }))
        );
      } catch {
        toast.error("Ошибка при оформлении заказа");
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <div className="max-w-sm mx-auto space-y-5">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-gray-100">
            <ShoppingCart className="h-8 w-8 text-gray-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Корзина пуста</h1>
            <p className="text-sm text-gray-500 mt-1.5">Добавьте товары из каталога</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#44CF5E] text-white text-sm font-semibold rounded-lg hover:bg-[#3abf52] transition-colors shadow-sm"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Корзина</h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Очистить
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between border border-gray-100 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              {item.image && (
                <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden shrink-0">
                  <img
                    src={`https://utfs.io/f/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-500">
                  {(item.price / 100).toFixed(2)} ₽ x {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.productId)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Итого</p>
          <p className="text-2xl font-bold text-gray-900">
            {(total() / 100).toFixed(2)} ₽
          </p>
        </div>
        <button
          onClick={handleCheckout}
          disabled={isPending}
          className="px-7 py-3 bg-[#44CF5E] text-white text-sm font-semibold rounded-lg hover:bg-[#3abf52] disabled:opacity-50 transition-colors shadow-sm"
        >
          {isPending ? "Обработка..." : "Перейти к оплате"}
        </button>
      </div>
    </div>
  );
}
