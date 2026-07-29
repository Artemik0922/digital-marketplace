"use client";

import Link from "next/link";
import { Search, Heart, Package, User, Menu, ChevronDown } from "lucide-react";
import { useCart } from "@/store/cart";

export function Navbar() {
  const count = useCart((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top bar */}
      <div className="hidden lg:flex border-b border-gray-100 bg-[#fafafa]">
        <div className="container flex items-center justify-between h-8">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Русский</span>
            <span className="text-gray-300">·</span>
            <span>Рубли</span>
          </div>
          <Link
            href="/auth/signup"
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            Начать продавать
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="container">
        <div className="flex items-center gap-4 h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-black text-[#44CF5E] tracking-tighter">
              X
            </span>
            <span className="text-lg font-bold">
              <span className="text-[#44CF5E]">Digital</span>
              <span className="text-gray-900">Marketplace</span>
            </span>
          </Link>

          {/* Catalog button */}
          <div className="hidden lg:flex">
            <button className="flex items-center gap-2 px-5 py-2 bg-[#44CF5E] text-white text-sm font-semibold rounded-xl hover:bg-[#3abf52] transition-colors shadow-sm">
              <Menu className="h-4 w-4" />
              <span>Каталог</span>
              <ChevronDown className="h-3.5 w-3.5 text-white/70" />
            </button>
          </div>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="Найти товар"
                className="w-full h-10 pl-9 pr-4 bg-gray-100 text-sm rounded-xl focus:bg-white focus:border-[#44CF5E] focus:ring-2 focus:ring-[#44CF5E]/20 outline-none border border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/"
              className="hidden lg:flex flex-col items-center gap-0.5 text-gray-500 hover:text-[#44CF5E] transition-colors"
            >
              <Heart className="h-5 w-5" />
              <span className="text-[11px]">Избранное</span>
            </Link>

            <Link
              href="/cart"
              className="hidden lg:flex flex-col items-center gap-0.5 text-gray-500 hover:text-[#44CF5E] transition-colors relative"
            >
              <Package className="h-5 w-5" />
              <span className="text-[11px]">Заказы</span>
              {count > 0 && (
                <span className="absolute -top-1 -right-2 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#44CF5E] text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            <Link
              href="/auth/signin"
              className="hidden lg:flex flex-col items-center gap-0.5 text-gray-500 hover:text-[#44CF5E] transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="text-[11px]">Войти</span>
            </Link>

            {/* Mobile buttons */}
            <Link
              href="/cart"
              className="lg:hidden relative flex items-center justify-center w-9 h-9 text-gray-500"
            >
              <Package className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#44CF5E] text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <button className="lg:hidden flex items-center justify-center w-9 h-9 text-gray-500">
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/auth/signin"
              className="lg:hidden flex items-center justify-center w-9 h-9 text-gray-500"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
