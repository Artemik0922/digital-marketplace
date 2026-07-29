import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { Shield, Zap, ChevronRight, Heart } from "lucide-react";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || !product.isPublished) notFound();

  return (
    <div className="container py-6 md:py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-900 transition-colors">Главная</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/" className="hover:text-gray-900 transition-colors">Каталог</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-600 truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="aspect-square rounded-2xl bg-gray-50 overflow-hidden border border-gray-100">
          <img
            src={`https://utfs.io/f/${product.imageKey}`}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-3xl font-bold mt-3 text-[#44CF5E]">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-wrap">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2.5 bg-[#f0fdf4] rounded-xl p-3.5 border border-[#44CF5E]/10">
              <Shield className="h-4 w-4 text-[#44CF5E] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-900">Безопасная сделка</p>
                <p className="text-xs text-gray-500">Гарантия возврата</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 bg-amber-50 rounded-xl p-3.5 border border-amber-200/50">
              <Zap className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-900">Моментально</p>
                <p className="text-xs text-gray-500">Доставка после оплаты</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <AddToCartButton
              productId={product.id}
              title={product.title}
              price={product.price}
              image={product.imageKey}
            />
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="h-4 w-4" />
              В избранное
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
