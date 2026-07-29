import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { generateDownloadToken } from "@/lib/utils";
import { sendOrderReceipt } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("No signature", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return new NextResponse("No orderId in metadata", { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { product: true } },
        buyer: true,
      },
    });

    if (!order || order.status === "paid") {
      return NextResponse.json({ received: true });
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "paid" },
    });

    const tokens = await Promise.all(
      order.items.map((item) =>
        prisma.downloadToken.create({
          data: {
            token: generateDownloadToken(),
            productId: item.productId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        })
      )
    );

    const downloadLinks = tokens.map((t, i) => ({
      title: order.items[i].product.title,
      url: `${process.env.AUTH_URL}/api/download/${t.token}`,
    }));

    if (order.buyer.email) {
      await sendOrderReceipt({
        email: order.buyer.email,
        name: order.buyer.name ?? "Покупатель",
        orderId: order.id,
        items: order.items.map((i) => ({
          title: i.product.title,
          price: i.price,
          quantity: i.quantity,
        })),
        total: order.total,
        downloadLinks,
      });
    }
  }

  return NextResponse.json({ received: true });
}
