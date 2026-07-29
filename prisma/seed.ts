import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("demo123456", 12);

  const seller = await prisma.user.upsert({
    where: { email: "seller@demo.com" },
    update: {},
    create: {
      name: "Демо Продавец",
      email: "seller@demo.com",
      password,
      role: "SELLER",
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: "buyer@demo.com" },
    update: {},
    create: {
      name: "Демо Покупатель",
      email: "buyer@demo.com",
      password,
      role: "BUYER",
    },
  });

  const products = [
    {
      title: "Steam Wallet 1000 RUB",
      description: "Моментальное пополнение кошелька Steam. После оплаты код придёт на ваш email.",
      price: 1299,
      imageKey: "placeholder-blue",
      fileKey: "placeholder-file",
      sellerId: seller.id,
      isPublished: true,
    },
    {
      title: "Roblox 10000 Robux",
      description: "Пополнение Roblox на 10000 Robux. Мгновенная доставка.",
      price: 8999,
      imageKey: "placeholder-orange",
      fileKey: "placeholder-file",
      sellerId: seller.id,
      isPublished: true,
    },
    {
      title: "PlayStation Plus Premium (12 месяцев)",
      description: "Подписка PlayStation Plus Premium на 12 месяцев. Полный доступ к играм.",
      price: 2499,
      imageKey: "placeholder-green",
      fileKey: "placeholder-file",
      sellerId: seller.id,
      isPublished: true,
    },
    {
      title: "Discord Nitro Classic",
      description: "Discord Nitro Classic на 1 месяц. Анимированные emoji, стикеры, загрузка файлов до 50MB.",
      price: 399,
      imageKey: "placeholder-purple",
      fileKey: "placeholder-file",
      sellerId: seller.id,
      isPublished: true,
    },
    {
      title: "YouTube Premium (30 дней)",
      description: "YouTube Premium без рекламы, фоновое воспроизведение, YouTube Music.",
      price: 599,
      imageKey: "placeholder-red",
      fileKey: "placeholder-file",
      sellerId: seller.id,
      isPublished: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.title.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        id: product.title.toLowerCase().replace(/\s+/g, "-"),
        ...product,
      },
    });
  }

  console.log("✅ Seed completed:");
  console.log(`   Продавец: seller@demo.com / demo123456`);
  console.log(`   Покупатель: buyer@demo.com / demo123456`);
  console.log(`   Товаров: ${products.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
