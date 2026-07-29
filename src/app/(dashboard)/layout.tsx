import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Package, BarChart3, Plus, ArrowLeft } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 border-r border-gray-200 bg-white p-6 flex flex-col gap-6 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-lg font-bold tracking-tight text-gray-900">
          <span className="text-xl font-black text-[#44CF5E] tracking-tighter">X</span>
          <span>DigitalMarketplace</span>
          <span className="text-[10px] font-medium text-[#44CF5E] bg-[#f0fdf4] px-1.5 py-0.5 rounded">Beta</span>
        </Link>
        <nav className="flex flex-col gap-0.5">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:text-[#44CF5E] hover:bg-[#f0fdf4] rounded-lg transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            Обзор
          </Link>
          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:text-[#44CF5E] hover:bg-[#f0fdf4] rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Новый товар
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:text-[#44CF5E] hover:bg-[#f0fdf4] rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            На сайт
          </Link>
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="mt-auto"
        >
          <button
            type="submit"
            className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-left"
          >
            Выйти
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
