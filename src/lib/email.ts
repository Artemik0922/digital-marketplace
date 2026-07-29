import { Resend } from "resend";
import { OrderReceipt } from "@/emails/order-receipt";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendOrderReceipt({
  email,
  name,
  orderId,
  items,
  total,
  downloadLinks,
}: {
  email: string;
  name: string;
  orderId: string;
  items: { title: string; price: number; quantity: number }[];
  total: number;
  downloadLinks: { title: string; url: string }[];
}) {
  await resend.emails.send({
    from: "DigitalMarketplace <onboarding@resend.dev>",
    to: email,
    subject: `Ваш заказ #${orderId.slice(0, 8)} — DigitalMarketplace`,
    react: OrderReceipt({ buyerName: name, orderId, items, total, downloadLinks }),
  });
}
