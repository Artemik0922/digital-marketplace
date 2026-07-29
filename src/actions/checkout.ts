"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function createCheckoutSession(items: { productId: string; quantity: number }[]) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) }, isPublished: true },
  });

  if (products.length === 0) {
    throw new Error("Товары не найдены");
  }

  const total = products.reduce((acc, p) => {
    const qty = items.find((i) => i.productId === p.id)?.quantity ?? 1;
    return acc + p.price * qty;
  }, 0);

  const order = await prisma.order.create({
    data: {
      buyerId: session.user.id,
      status: "pending",
      total,
      items: {
        create: products.map((p) => ({
          productId: p.id,
          quantity: items.find((i) => i.productId === p.id)?.quantity ?? 1,
          price: p.price,
        })),
      },
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email ?? undefined,
    mode: "payment",
    metadata: { orderId: order.id },
    line_items: products.map((p) => ({
      price_data: {
        currency: "usd",
        product_data: { name: p.title },
        unit_amount: p.price,
      },
      quantity: items.find((i) => i.productId === p.id)?.quantity ?? 1,
    })),
    success_url: `${process.env.AUTH_URL}/cart/success?orderId=${order.id}`,
    cancel_url: `${process.env.AUTH_URL}/cart/cancel`,
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: stripeSession.id },
  });

  redirect(stripeSession.url!);
}
