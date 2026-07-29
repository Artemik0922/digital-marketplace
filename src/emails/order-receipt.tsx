import {
  Html,
  Body,
  Container,
  Head,
  Heading,
  Text,
  Section,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

interface OrderReceiptProps {
  buyerName: string;
  orderId: string;
  items: { title: string; price: number; quantity: number }[];
  total: number;
  downloadLinks: { title: string; url: string }[];
}

export function OrderReceipt({
  buyerName,
  orderId,
  items,
  total,
  downloadLinks,
}: OrderReceiptProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-[600px] px-4 py-8">
            <Heading className="text-2xl font-bold text-gray-900">
              Спасибо за покупку, {buyerName}!
            </Heading>
            <Text className="text-gray-600">Заказ #{orderId.slice(0, 8)}</Text>

            <Section className="my-6">
              <Heading className="text-lg font-semibold">Ваши файлы</Heading>
              {downloadLinks.map((link, i) => (
                <Button
                  key={i}
                  href={link.url}
                  className="inline-block w-full mb-2 rounded-md bg-black px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Скачать: {link.title}
                </Button>
              ))}
            </Section>

            <Hr />

            <Section className="my-6">
              <Heading className="text-lg font-semibold">Детали заказа</Heading>
              {items.map((item, i) => (
                <Text key={i} className="flex justify-between text-gray-600">
                  <span>
                    {item.title} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity) / 100}</span>
                </Text>
              ))}
              <Text className="font-bold text-gray-900">
                Итого: ${total / 100}
              </Text>
            </Section>

            <Hr />

            <Text className="text-sm text-gray-400">
              Ссылки действительны в течение 7 дней. Если у вас возникли
              проблемы, ответьте на это письмо.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
