import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Войти</h1>
          <p className="text-sm text-gray-500 mt-1">Выберите способ входа</p>
        </div>
        <div className="space-y-3">
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/" });
            }}
          >
            <Button type="submit" variant="outline" className="w-full">
              GitHub
            </Button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <Button type="submit" variant="outline" className="w-full">
              Google
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">Или email</span>
            </div>
          </div>
          <form
            action={async (formData: FormData) => {
              "use server";
              await signIn("credentials", {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                redirectTo: "/",
              });
            }}
            className="space-y-3"
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#44CF5E] focus:ring-2 focus:ring-green-100 outline-none transition-all"
            />
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              required
              className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#44CF5E] focus:ring-2 focus:ring-green-100 outline-none transition-all"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#44CF5E] text-white text-sm font-semibold rounded-lg hover:bg-[#3abf52] transition-colors shadow-sm"
            >
              Войти
            </button>
          </form>
          <p className="text-center text-sm text-gray-500">
            Нет аккаунта?{" "}
            <a href="/auth/signup" className="text-[#44CF5E] hover:text-[#3abf52] font-medium">
              Зарегистрироваться
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
