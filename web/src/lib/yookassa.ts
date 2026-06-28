import { LEGAL } from "@/lib/site-legal";

export function getYooKassaCredentials(): { shopId: string; secretKey: string } | null {
  const shopId = process.env.YOOKASSA_SHOP_ID?.trim();
  const secretKey = process.env.YOOKASSA_SECRET_KEY?.trim();
  if (!shopId || !secretKey) return null;
  return { shopId, secretKey };
}

export function yooKassaAuthHeader(shopId: string, secretKey: string): string {
  return `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString("base64")}`;
}

export function siteBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? LEGAL.siteUrl).replace(/\/$/, "");
}

export type YooPaymentStatus = "pending" | "waiting_for_capture" | "succeeded" | "canceled";

export interface YooPayment {
  id: string;
  status: YooPaymentStatus;
  paid: boolean;
  metadata?: Record<string, string>;
}

export async function fetchYooPayment(paymentId: string): Promise<YooPayment | null> {
  const creds = getYooKassaCredentials();
  if (!creds) return null;

  const res = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
    headers: {
      Authorization: yooKassaAuthHeader(creds.shopId, creds.secretKey),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return (await res.json()) as YooPayment;
}
