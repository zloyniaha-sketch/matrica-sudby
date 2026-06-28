import { NextResponse } from "next/server";

/** Webhook ЮKassa — подтверждение платежа (основная проверка — return + /api/payments/status). */
export async function POST(request: Request) {
  try {
    await request.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
