import Link from "next/link";

export default function CartSuccessPage() {
  return (
    <div className="container py-20 text-center">
      <div className="max-w-sm mx-auto space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Оплата прошла успешно</h1>
        <p className="text-sm text-gray-500">Ссылка на скачивание придёт на ваш email в течение нескольких минут.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-[#44CF5E] text-white text-sm font-medium rounded-lg hover:bg-[#3abf52] transition-colors"
        >
          В каталог
        </Link>
      </div>
    </div>
  );
}
