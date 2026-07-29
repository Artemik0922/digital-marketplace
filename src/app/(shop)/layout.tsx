import { Navbar } from "@/components/layout/navbar";
import { CategoryNav } from "@/components/layout/category-nav";
import { Footer } from "@/components/layout/footer";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CategoryNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
