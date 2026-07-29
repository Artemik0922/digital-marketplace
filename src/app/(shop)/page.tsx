import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/product-card";
import { ChevronRight, ChevronDown, Monitor, Gamepad2, Send, CreditCard } from "lucide-react";

const banners = [
  { title: "Пополнение PSN", color: "from-blue-600 to-blue-400", badge: "Акция", badgeColor: "bg-yellow-400 text-yellow-900" },
  { title: "Counter-Strike 2", color: "from-orange-600 to-yellow-400", badge: "Хит", badgeColor: "bg-red-500 text-white" },
  { title: "Фестиваль скидок", color: "from-purple-600 to-pink-400", badge: "-90%", badgeColor: "bg-green-500 text-white" },
  { title: "Valorant", color: "from-red-600 to-red-400", badge: "Новинка", badgeColor: "bg-blue-500 text-white" },
  { title: "GTA VI", color: "from-green-700 to-emerald-400", badge: "Предзаказ", badgeColor: "bg-purple-500 text-white" },
  { title: "Новинки", color: "from-indigo-600 to-indigo-400", badge: null, badgeColor: "" },
];

const tabs = [
  { name: "Steam", icon: Monitor },
  { name: "Playstation", icon: Gamepad2 },
  { name: "Telegram", icon: Send },
  { name: "Apple", icon: CreditCard },
];

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return (
    <div>
      {/* Banner Slider */}
      <section className="py-6">
        <div className="container">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {banners.map((banner) => (
              <div
                key={banner.title}
                className={`relative w-[280px] h-[180px] rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br ${banner.color} cursor-pointer group`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white" />
                  <div className="absolute top-8 right-12 w-4 h-4 bg-white/30 rounded" />
                  <div className="absolute top-16 right-20 w-2 h-2 bg-white/30 rounded" />
                </div>
                {banner.badge && (
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md ${banner.badgeColor}`}>
                    {banner.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-lg font-bold leading-tight">{banner.title}</p>
                </div>
              </div>
            ))}
            <div className="shrink-0 w-12 h-[180px] rounded-2xl bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <ChevronRight className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Top-up Calculator */}
      <section className="border-b border-gray-100">
        <div className="container py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Пополнение сервисов</h2>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.name}
                  className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${
                    i === 0
                      ? "text-[#44CF5E] border-b-2 border-[#44CF5E]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Calculator form */}
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Получите</label>
              <div className="relative">
                <input
                  type="number"
                  defaultValue={1000}
                  className="w-28 h-10 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:border-[#44CF5E] focus:ring-2 focus:ring-[#44CF5E]/20 outline-none transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">P</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Валюта</label>
              <select className="h-10 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:border-[#44CF5E] focus:ring-2 focus:ring-[#44CF5E]/20 outline-none transition-all">
                <option>RU, P</option>
                <option>KZT, ₸</option>
                <option>USD, $</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Логин Steam</label>
              <input
                type="text"
                placeholder="Введите логин"
                className="w-44 h-10 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:border-[#44CF5E] focus:ring-2 focus:ring-[#44CF5E]/20 outline-none transition-all"
              />
            </div>

            <button className="h-10 px-6 bg-[#44CF5E] text-white text-sm font-semibold rounded-lg hover:bg-[#3abf52] transition-colors whitespace-nowrap shadow-sm">
              Купить за 1 064 ₽
            </button>
          </div>

          {/* Quick amount buttons */}
          <div className="flex items-center gap-2 mt-4">
            {["200 ₽", "500 ₽", "1000 ₽"].map((amount) => (
              <button
                key={amount}
                className="px-4 py-1.5 text-sm border border-gray-200 rounded-full text-gray-600 hover:border-[#44CF5E] hover:text-[#44CF5E] transition-colors"
              >
                {amount}
              </button>
            ))}
            <button className="text-xs text-gray-400 hover:text-gray-600 ml-2">
              Как узнать логин?
            </button>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="border-b border-gray-100">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Хиты продаж</h2>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Все товары <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-sm mb-4">В каталоге пока нет товаров</p>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#44CF5E] text-white text-sm font-medium rounded-lg hover:bg-[#3abf52] transition-colors"
              >
                Стать продавцом
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  imageKey={product.imageKey}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO Text */}
      <section className="border-b border-gray-100">
        <div className="container py-8 md:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              Маркетплейс цифровых товаров
            </h2>
            <div className="text-sm text-gray-500 leading-relaxed space-y-3">
              <p>
                DigitalMarketplace — это маркетплейс цифровых товаров, где каждый найдёт нужное:
                от игровых аккаунтов до программ для работы и подписок на развлекательные сервисы.
              </p>
              <p>
                Если вы ищете удобный и надёжный магазин цифровых товаров — вы попали по адресу.
                Всё, что нужно для геймеров, стримеров, фрилансеров и просто тех, кто хочет
                сэкономить на онлайн-развлечениях.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
