import { ProductForm } from "@/components/forms/product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Новый товар</h1>
        <p className="text-sm text-gray-500 mt-1">Заполните форму чтобы опубликовать товар.</p>
      </div>
      <ProductForm />
    </div>
  );
}
