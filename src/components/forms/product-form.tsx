"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { createProductSchema, type CreateProductInput } from "@/schemas/product";
import { createProduct } from "@/actions/product";

export function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
  });

  async function onSubmit(data: CreateProductInput) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("imageKey", data.imageKey);
    formData.append("fileKey", data.fileKey);

    const result = await createProduct(formData);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Товар опубликован!");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-gray-900">Название</label>
        <input
          id="title"
          {...register("title")}
          placeholder="Название товара"
          className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#44CF5E] focus:ring-2 focus:ring-green-100 outline-none transition-all"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-gray-900">Описание</label>
        <textarea
          id="description"
          {...register("description")}
          className="flex min-h-[120px] w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#44CF5E] focus:ring-2 focus:ring-green-100 outline-none transition-all"
          placeholder="Опишите ваш товар..."
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="price" className="text-sm font-medium text-gray-900">Цена ($)</label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price")}
          placeholder="9.99"
          className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#44CF5E] focus:ring-2 focus:ring-green-100 outline-none transition-all"
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">Обложка</label>
        <UploadButton
          endpoint="productImage"
          onClientUploadComplete={(res) => {
            if (res?.[0]) {
              setValue("imageKey", res[0].key);
              toast.success("Обложка загружена");
            }
          }}
          onUploadError={(err) => { toast.error(err.message); }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">Файл товара</label>
        <UploadButton
          endpoint="productFile"
          onClientUploadComplete={(res) => {
            if (res?.[0]) {
              setValue("fileKey", res[0].key);
              toast.success("Файл загружен");
            }
          }}
          onUploadError={(err) => { toast.error(err.message); }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center px-6 py-2.5 bg-[#44CF5E] text-white text-sm font-medium rounded-lg hover:bg-[#3abf52] disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Сохранение..." : "Опубликовать товар"}
      </button>
    </form>
  );
}
