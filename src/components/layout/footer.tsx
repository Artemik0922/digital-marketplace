import Link from "next/link";

const footerLinks = {
  Покупателям: [
    { name: "Как купить", href: "/" },
    { name: "Безопасность", href: "/" },
    { name: "Отзывы", href: "/" },
    { name: "Помощь", href: "/" },
  ],
  Продавцам: [
    { name: "Начать продавать", href: "/auth/signup" },
    { name: "Правила", href: "/" },
    { name: "Тарифы", href: "/" },
  ],
  Компания: [
    { name: "О нас", href: "/" },
    { name: "Реквизиты", href: "/" },
    { name: "Контакты", href: "/" },
  ],
};

function VkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M15.684 0H8.316C3.724 0 0 3.724 0 8.316v7.368C0 20.276 3.724 24 8.316 24h7.368C20.276 24 24 20.276 24 15.684V8.316C24 3.724 20.276 0 15.684 0zm3.6 16.548h-1.644c-.66 0-.864-.516-2.484-2.124-.672-.672-1.164-.924-1.356-.924-.276 0-.396.144-.396.552v1.344c0 .384-.12.6-1.092.6-1.632 0-3.444-.996-4.704-2.844-1.68-2.196-2.136-3.84-2.136-4.176 0-.168.072-.348.552-.348h1.644c.396 0 .54.168.708.588.78 2.064 2.088 3.864 2.628 3.864.192 0 .3-.108.3-.648v-2.484c0-1.032-.612-1.128-.612-1.5 0-.144.12-.276.288-.276h2.568c.3 0 .408.156.408.492v2.676c0 .3.132.408.228.408.192 0 .336-.108.54-.312 1.152-1.26 1.968-3.228 1.968-3.228.108-.252.264-.384.672-.384h1.644c.492 0 .612.24.492.588-.468 1.776-2.604 4.008-2.604 4.008-.228.3-.288.432 0 .768.192.24.828.816 1.26 1.284.78.84 1.356 1.536 1.5 2.016.168.492-.084.744-.576.744z"/>
    </svg>
  );
}

function TgIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-[#fafafa] mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-[#44CF5E]">Digital</span>
              <span className="text-gray-900">Marketplace</span>
            </span>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Маркетплейс цифровых товаров. Покупайте и продавайте безопасно.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <VkIcon className="w-5 h-5" />
              </a>
              <a href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <TgIcon className="w-5 h-5" />
              </a>
              <a href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <DiscordIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DigitalMarketplace. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
