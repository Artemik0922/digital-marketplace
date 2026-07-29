import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Ошибка входа</h1>
        <p className="text-sm text-gray-500 mb-6">Что-то пошло не так. Попробуйте снова.</p>
        <Link
          href="/auth/signin"
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-[#44CF5E] text-white text-sm font-medium rounded-lg hover:bg-[#3abf52] transition-colors"
        >
          На страницу входа
        </Link>
      </div>
    </div>
  );
}
