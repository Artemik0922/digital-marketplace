"use client";

import Link from "next/link";
import {
  Gamepad2,
  Flame,
  Monitor,
  Smartphone,
  Coins,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

const categories = [
  { name: "Донат", href: "/", icon: ShoppingBag },
  { name: "Скидки 90%", href: "/", icon: Flame },
  { name: "PlayStation", href: "/", icon: Gamepad2 },
  { name: "Roblox", href: "/", icon: Smartphone },
  { name: "Плати частями", href: "/", icon: Coins },
  { name: "Пополнение Steam", href: "/", icon: Monitor },
  { name: "Apple карты", href: "/", icon: CreditCard },
  { name: "Игры", href: "/", icon: Gamepad2 },
  { name: "Xbox", href: "/", icon: Gamepad2 },
  { name: "Discord", href: "/", icon: ShieldCheck },
];

export function CategoryNav() {
  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="container">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = i === 0;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? "border-[#44CF5E] bg-[#f0fdf4] text-[#44CF5E]"
                    : "border-gray-200 text-gray-600 hover:text-[#44CF5E] hover:border-[#44CF5E]/30 hover:bg-[#f0fdf4]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
