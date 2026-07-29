<div align="center">
  <h1>🛒 DigitalMarketplace</h1>
  <p><strong>Маркетплейс цифровых товаров</strong> — Full-stack pet-project</p>
  <p><em>Аналог Gumroad / Payhip для продажи файлов, шаблонов, курсов и цифровых ключей</em></p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js%2016-000000?logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React%2019-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <br/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Auth.js-000000?logo=nextauth&logoColor=white" alt="Auth.js" />
  <br/>
  <img src="https://img.shields.io/badge/Stripe-008CDD?logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Uploadthing-000000?logo=uploadthing&logoColor=white" alt="Uploadthing" />
  <img src="https://img.shields.io/badge/Resend-000000?logo=resend&logoColor=white" alt="Resend" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <br/>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs Welcome" />
</p>

---

## 📋 Оглавление

- [Возможности](#-возможности)
- [Tech Stack](#-tech-stack)
- [Архитектура](#-архитектура)
- [Data Flow](#-data-flow)
- [Схема базы данных](#-схема-базы-данных)
- [API Endpoints](#-api-endpoints)
- [Структура проекта](#-структура-проекта)
- [Быстрый старт](#-быстрый-старт)
- [Переменные окружения](#-переменные-окружения)
- [Deployment](#-deployment)
- [Development](#-development)
- [Roadmap](#-roadmap)
- [Лицензия](#-лицензия)

---

## ✨ Возможности

<div align="center">

| | | | |
|---|---|---|---|
| **🔐 Регистрация и вход**<br/>Email + пароль, GitHub, Google<br/>`Auth.js v5 · JWT · Credentials` | **📦 Цифровые товары**<br/>Создание, обложка, файл, цена<br/>`Server Actions · Uploadthing` | **🛒 Корзина**<br/>Добавление, удаление, количество<br/>`Zustand · localStorage persist` | **💳 Stripe Checkout**<br/>Оплата картой, Webhook<br/>`Stripe API · Stripe Webhook` |
| **📎 Загрузка файлов**<br/>Обложки + товары до 128MB<br/>`Uploadthing · auth middleware` | **📧 Email уведомления**<br/>Чек со ссылками на скачивание<br/>`Resend · React Email` | **🔗 Безопасные ссылки**<br/>Временные токены на 7 дней<br/>`DownloadToken · API Route` | **👤 Dashboard продавца**<br/>Управление товарами, статистика<br/>`Middleware · Server Actions` |

</div>

---

## 🛠 Tech Stack

| Категория | Технологии |
|-----------|-----------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4 + shadcn/ui + Lucide Icons |
| **База данных** | PostgreSQL + Prisma ORM |
| **Аутентификация** | Auth.js (NextAuth) v5 — GitHub, Google, Credentials (JWT) |
| **Платежи** | Stripe Checkout + Webhooks |
| **Файлы** | Uploadthing (до 128MB, с авторизацией) |
| **Email** | Resend + React Email шаблоны |
| **State** | Zustand с persist в localStorage |
| **Формы** | react-hook-form + Zod валидация |

---

## 🏗 Архитектура

```mermaid
graph TD
    Browser[🌐 Browser] --> Next[Next.js App Router]
    Next --> Auth[🔐 Auth.js JWT]
    Next --> Stripe[💳 Stripe Checkout]
    Next --> UB[📎 Uploadthing]
    Next --> Prisma[🗄️ Prisma ORM]
    Prisma --> PG[🐘 PostgreSQL]

    Stripe --> WH[⚡ Stripe Webhook]
    WH --> Prisma
    WH --> Resend[📧 Resend API]
    Resend --> Email[📨 Email]

    subgraph Services
        Auth
        UB
        Resend
        Stripe
    end
```

### Поток данных

#### Покупка товара

```mermaid
sequenceDiagram
    actor U as Покупатель
    participant Next as Next.js
    participant Stripe
    participant WH as Webhook
    participant DB as PostgreSQL
    participant Email as Resend

    U->>Next: Добавляет в корзину
    U->>Next: Нажимает «Оплатить»
    Next->>Stripe: Создаёт Checkout Session
    Stripe->>U: Страница оплаты
    U->>Stripe: Оплачивает
    Stripe->>WH: POST /api/webhooks/stripe
    WH->>DB: Создаёт Order + OrderItem
    WH->>DB: Создаёт DownloadToken
    WH->>Email: Отправляет чек
    Email->>U: Письмо со ссылкой на скачивание
```

#### Скачивание файла

```mermaid
sequenceDiagram
    actor U as Покупатель
    participant API as API Route
    participant DB as PostgreSQL
    participant UT as Uploadthing

    U->>API: GET /api/download/{token}
    API->>DB: Проверяет токен
    DB-->>API: Token valid + productId
    API->>UT: Fetch file by key
    UT-->>API: File stream
    API-->>U: File download
```

#### Создание товара

```mermaid
sequenceDiagram
    actor S as Продавец
    participant Next as Dashboard
    participant UT as Uploadthing
    participant DB as PostgreSQL

    S->>Next: Заполняет форму
    Next->>UT: Загружает обложку + файл
    UT-->>Next: imageKey + fileKey
    S->>Next: Нажимает «Создать»
    Next->>DB: Server Action → INSERT Product
    DB-->>Next: Product created
    Next-->>S: Redirect to dashboard
```

---

## 💾 Схема базы данных

```mermaid
erDiagram
    User ||--o{ Product : creates
    User ||--o{ Order : places
    Order ||--|{ OrderItem : contains
    OrderItem ||--|| Product : references
    Product ||--o{ DownloadToken : generates

    User {
        string id PK
        string email UK
        string name
        string role "BUYER | SELLER"
        datetime createdAt
    }

    Product {
        string id PK
        string title
        int price "in cents"
        string imageKey
        string fileKey
        boolean isPublished
        string sellerId FK
    }

    Order {
        string id PK
        string stripeSessionId UK
        string status "pending | paid"
        int total
        string buyerId FK
    }

    OrderItem {
        string id PK
        int quantity
        int price
        string orderId FK
        string productId FK
    }

    DownloadToken {
        string id PK
        string token UK
        string productId FK
        datetime expiresAt
    }
```

---

## 📡 API Endpoints

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/auth/[...nextauth]` | * | — | Auth.js handler (NextAuth) |
| `/api/webhooks/stripe` | POST | Stripe secret | Обработка успешной оплаты |
| `/api/download/[token]` | GET | Token param | Скачивание цифрового товара |
| `/api/uploadthing` | * | Uploadthing | Загрузка файлов (обложка + товар) |

| Server Action | Description |
|---------------|-------------|
| `createProduct` | Создание товара (seller only) |
| `createCheckoutSession` | Создание Stripe Checkout сессии |

---

## 📁 Структура проекта

```
src/
├── app/
│   ├── (shop)/                  # Публичные страницы
│   │   ├── page.tsx             # Каталог товаров
│   │   ├── products/[id]        # Страница товара
│   │   └── cart/                # Корзина + success/cancel
│   ├── (dashboard)/             # Dashboard продавца
│   │   └── dashboard/
│   │       └── products/new     # Создание товара
│   ├── api/
│   │   ├── auth/[...nextauth]   # Auth.js handler
│   │   ├── webhooks/stripe      # Stripe webhook
│   │   └── download/[token]     # Скачивание файла
│   └── auth/                    # Страницы входа/регистрации
├── components/
│   ├── ui/                      # shadcn/ui компоненты
│   ├── layout/                  # Navbar, Footer, CategoryNav
│   ├── products/                # ProductCard, AddToCartButton
│   ├── cart/                    # CartIcon
│   └── forms/                   # ProductForm
├── actions/                     # Server Actions
│   ├── product.ts               # createProduct
│   └── checkout.ts              # createCheckoutSession
├── lib/                         # Утилиты
│   ├── auth.ts                  # Auth.js config
│   ├── prisma.ts                # Prisma client sin gleton
│   ├── stripe.ts                # Stripe instance
│   ├── uploadthing.ts           # FileRouter + UploadButton
│   └── email.ts                 # Resend client
├── schemas/                     # Zod-схемы
├── store/                       # Zustand store (cart)
├── emails/                      # React Email шаблоны
└── types/                       # TypeScript типы
```

---

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 20+
- PostgreSQL (локально или [Neon](https://neon.tech) / [Railway](https://railway.app))
- Аккаунты: [Stripe](https://dashboard.stripe.com), [Uploadthing](https://uploadthing.com), [Resend](https://resend.com)

### Установка

```bash
git clone https://github.com/Artemik0922/digital-marketplace.git
cd digital-marketplace
npm install
```

### Настройка окружения

```bash
copy .env.example .env
```

Заполните `.env` (см. таблицу ниже).

### База данных

```bash
npx prisma db push
npx prisma db seed
```

Seed создаст тестового продавца и демо-товары.

### Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

---

## 🔧 Переменные окружения

| Переменная | Описание | Пример |
|-----------|----------|--------|
| `DATABASE_URL` | Строка подключения к PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `AUTH_SECRET` | Секретный ключ Auth.js | `npx auth secret` |
| `AUTH_URL` | URL приложения | `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | Секретный ключ Stripe | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Секрет вебхука Stripe | `whsec_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Публичный ключ Stripe | `pk_test_...` |
| `UPLOADTHING_SECRET` | Secret Uploadthing | `sk_live_...` |
| `UPLOADTHING_APP_ID` | App ID Uploadthing | `abc123` |
| `RESEND_API_KEY` | API ключ Resend | `re_...` |

### Stripe Webhook (локальная разработка)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 🌐 Deployment

Проект готов к деплою на [Vercel](https://vercel.com):

1. Импортируйте репозиторий `Artemik0922/digital-marketplace`
2. Добавьте все переменные окружения из таблицы выше
3. Build Command: `npm run build`
4. Deploy

**Важно**: Stripe webhook URL нужно обновить на URL вашего деплоя:

```bash
stripe listen --forward-to https://your-app.vercel.app/api/webhooks/stripe
```

---

## 👨‍💻 Development

### Правила

- **Типизация**: весь код на TypeScript, strict mode
- **Перед коммитом**:
  ```bash
  npx tsc --noEmit     # Проверка типов
  npm run lint         # Линтер
  ```
- **Ветки**: feature → PR → main

---

## 🗺 Roadmap

- [x] Регистрация и аутентификация (Auth.js v5)
- [x] Создание товаров + загрузка файлов (Uploadthing)
- [x] Каталог и страница товара
- [x] Корзина (Zustand + persist)
- [x] Stripe Checkout + Webhook
- [x] Email уведомления со ссылками на скачивание
- [ ] Список заказов в Dashboard
- [ ] Отзывы и рейтинг товаров
- [ ] Купоны и скидки
- [ ] Избранное (Wishlist)
- [ ] Страница профиля продавца
- [ ] Мультиязычность (i18n)

---

## 📄 Лицензия

MIT © 2026 [Artemik0922](https://github.com/Artemik0922)

---

<p align="center">
  <strong>⭐ Если проект вам понравился — поставьте звезду на GitHub!</strong>
</p>
