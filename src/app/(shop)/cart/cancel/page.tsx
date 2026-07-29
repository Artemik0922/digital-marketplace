import Link from "next/link";

export default function CartCancelPage() {
  return (
    <div className="container py-20 text-center">
      <div className="max-w-sm mx-auto space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Оплата отменена</h1>
        <p className="text-sm text-gray-500">Вы можете вернуться в корзину и попробовать снова.</p>
        <Link
          href="/cart"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-[#44CF5E] text-white text-sm font-medium rounded-lg hover:bg-[#3abf52] transition-colors"
        >
          В корзину
        </Link>
      </div>
    </div>
  );
}
