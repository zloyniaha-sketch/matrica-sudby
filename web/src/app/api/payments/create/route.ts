import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { LEGAL } from "@/lib/site-legal";
import { getYooKassaCredentials, siteBaseUrl, yooKassaAuthHeader } from "@/lib/yookassa";

const DATE_PATTERN = /^\d{2}\.\d{2}\.\d{4}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const creds = getYooKassaCredentials();
  if (!creds) {
    return NextResponse.json({ error: "Платёжный сервис не настроен" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const { birthDate, email } = body as { birthDate?: string; email?: string };

  if (!birthDate || !DATE_PATTERN.test(birthDate)) {
    return NextResponse.json({ error: "Укажите дату рождения" }, { status: 400 });
  }
  if (!email || !EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json({ error: "Укажите корректный e-mail для чека" }, { status: 400 });
  }

  const amount = `${LEGAL.priceRub}.00`;
  const returnUrl = `${siteBaseUrl()}/payment/success/`;
  const idempotenceKey = randomUUID();

  const payload = {
    amount: { value: amount, currency: "RUB" },
    capture: true,
    confirmation: { type: "redirect", return_url: returnUrl },
    description: "Расширенная расшифровка матрицы судьбы (PDF-отчёт)",
    metadata: { birthDate, email: email.trim().toLowerCase() },
    receipt: {
      customer: { email: email.trim().toLowerCase() },
      items: [
        {
          description: "Расширенная цифровая расшифровка матрицы, PDF-отчёт",
          quantity: "1.00",
          amount: { value: amount, currency: "RUB" },
          vat_code: 1,
          payment_mode: "full_payment",
          payment_subject: "service",
        },
      ],
    },
  };

  const res = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      Authorization: yooKassaAuthHeader(creds.shopId, creds.secretKey),
      "Content-Type": "application/json",
      "Idempotence-Key": idempotenceKey,
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as {
    id?: string;
    confirmation?: { confirmation_url?: string };
    description?: string;
  };

  if (!res.ok) {
    return NextResponse.json(
      { error: data.description ?? "Не удалось создать платёж" },
      { status: 502 },
    );
  }

  const confirmationUrl = data.confirmation?.confirmation_url;
  if (!data.id || !confirmationUrl) {
    return NextResponse.json({ error: "Некорректный ответ платёжного сервиса" }, { status: 502 });
  }

  return NextResponse.json({ paymentId: data.id, confirmationUrl });
}
