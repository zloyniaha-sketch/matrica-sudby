# Оплата ЮKassa + Vercel

Оплата работает **только на Vercel** (нужен сервер для секретного ключа). GitHub Pages — витрина без API.

## 1. Vercel → Settings → Environment Variables

| Variable | Value |
|----------|--------|
| `YOOKASSA_SHOP_ID` | из личного кабинета ЮKassa |
| `YOOKASSA_SECRET_KEY` | секретный ключ (не публиковать) |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdestiny.tech` |

**Root Directory** проекта: `web`

После добавления переменных: **Deployments → Redeploy**

## 2. Домен yourdestiny.tech на Vercel

Vercel → Project → **Settings → Domains** → добавить `yourdestiny.tech`

В Reg.ru DNS (вместо GitHub IP, если переключаете полностью):

- **A** `@` → `76.76.21.21` (Vercel)
- **CNAME** `www` → `cname.vercel-dns.com`

Или оставить GitHub A-записи и добавить домен по инструкции Vercel (они покажут нужные записи).

## 3. Webhook в ЮKassa (опционально)

**Интеграция → HTTP-уведомления:**

```
https://yourdestiny.tech/api/yookassa/webhook/
```

Событие: `payment.succeeded`

## 4. Проверка

1. Открыть https://yourdestiny.tech/
2. Рассчитать матрицу → «Получить за 990 ₽»
3. Email + согласие → оплата (тестовая карта в test-режиме ЮKassa)
4. После оплаты — редирект на `/payment/success/` → премиум открыт

Тестовые карты: https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing
