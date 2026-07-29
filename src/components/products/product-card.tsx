import Link from "next/link";
import { Heart, ImageIcon } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageKey: string;
}

export function ProductCard({ id, title, price, imageKey }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="group block shrink-0 w-[220px]">
      <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden">
          {imageKey ? (
            <img
              src={`https://utfs.io/f/${imageKey}`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-300">
              <ImageIcon className="h-6 w-6" />
              <span className="text-[10px]">Нет фото</span>
            </div>
          )}
          <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
            <Heart className="h-3.5 w-3.5 text-gray-400 hover:text-red-400" />
          </button>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-900 truncate leading-snug">{title}</h3>
          <p className="text-sm font-bold text-[#44CF5E] mt-1">{formatPrice(price)}</p>
        </div>
      </article>
    </Link>
  );
}
