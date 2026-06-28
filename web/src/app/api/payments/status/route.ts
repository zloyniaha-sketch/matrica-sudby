import { NextResponse } from "next/server";
import { fetchYooPayment } from "@/lib/yookassa";

export async function GET(request: Request) {
  const paymentId = new URL(request.url).searchParams.get("paymentId")?.trim();
  if (!paymentId || !/^[\w-]+$/.test(paymentId)) {
    return NextResponse.json({ error: "Укажите paymentId" }, { status: 400 });
  }

  const payment = await fetchYooPayment(paymentId);
  if (!payment) {
    return NextResponse.json({ error: "Платёж не найден" }, { status: 404 });
  }

  const paid = payment.status === "succeeded" || payment.paid === true;
  const birthDate = payment.metadata?.birthDate ?? null;

  return NextResponse.json({
    status: payment.status,
    paid,
    birthDate: paid ? birthDate : null,
  });
}
