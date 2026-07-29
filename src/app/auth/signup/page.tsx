import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

async function register(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) return;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return;

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hashed },
  });

  await signIn("credentials", { email, password, redirectTo: "/" });
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Создать аккаунт</h1>
          <p className="text-sm text-gray-500 mt-1">Начните продавать цифровые товары</p>
        </div>
        <form action={register} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-900">Имя</label>
            <input
              id="name"
              name="name"
              placeholder="Иван Иванов"
              required
              className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#44CF5E] focus:ring-2 focus:ring-green-100 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-900">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ivan@example.com"
              required
              className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#44CF5E] focus:ring-2 focus:ring-green-100 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-900">Пароль</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Минимум 8 символов"
              required
              minLength={8}
              className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#44CF5E] focus:ring-2 focus:ring-green-100 outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#44CF5E] text-white text-sm font-semibold rounded-lg hover:bg-[#3abf52] transition-colors shadow-sm"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Уже есть аккаунт?{" "}
          <a href="/auth/signin" className="text-[#44CF5E] hover:text-[#3abf52] font-medium">
            Войти
          </a>
        </p>
      </div>
    </div>
  );
}
