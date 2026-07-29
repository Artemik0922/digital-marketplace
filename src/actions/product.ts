"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createProductSchema } from "@/schemas/product";

export async function createProduct(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Не авторизован" };
  }

  const parsed = createProductSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    imageKey: formData.get("imageKey"),
    fileKey: formData.get("fileKey"),
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return { error: "Проверьте поля", fieldErrors: errors };
  }

  const { title, description, price, imageKey, fileKey } = parsed.data;

  try {
    await prisma.product.create({
      data: {
        title,
        description,
        price: Math.round(price * 100),
        imageKey,
        fileKey,
        sellerId: session.user.id,
        isPublished: true,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (e) {
    return { error: "Ошибка при создании товара" };
  }
}
