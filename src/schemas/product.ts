import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа").max(100, "Максимум 100 символов"),
  description: z.string().min(10, "Минимум 10 символов").max(5000),
  price: z.coerce.number().positive("Цена должна быть положительной").max(999999),
  imageKey: z.string().min(1, "Загрузите обложку"),
  fileKey: z.string().min(1, "Загрузите файл товара"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
