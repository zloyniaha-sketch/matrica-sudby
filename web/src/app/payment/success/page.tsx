"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clearPendingPaymentId, getPendingPaymentId } from "@/lib/payment-pending";
import { unlockPremiumVerified } from "@/lib/premium";

export default function PaymentSuccessPage() {
  const [state, setState] = useState<"loading" | "ok" | "fail" | "pending">("loading");
  const [birthDate, setBirthDate] = useState<string | null>(null);

  useEffect(() => {
    const paymentId = getPendingPaymentId();
    if (!paymentId) {
      setState("fail");
      return;
    }

    fetch(`/api/payments/status/?paymentId=${encodeURIComponent(paymentId)}`)
      .then((r) => r.json())
      .then((data: { paid?: boolean; birthDate?: string | null; status?: string }) => {
        if (data.paid && data.birthDate) {
          unlockPremiumVerified(data.birthDate, paymentId);
          clearPendingPaymentId();
          setBirthDate(data.birthDate);
          setState("ok");
          return;
        }
        if (data.status === "pending" || data.status === "waiting_for_capture") {
          setState("pending");
          return;
        }
        setState("fail");
      })
      .catch(() => setState("fail"));
  }, []);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      {state === "loading" && (
        <>
          <p className="text-lg text-mystic-800">Проверяем оплату…</p>
          <p className="mt-2 text-sm text-mystic-600">Подождите несколько секунд</p>
        </>
      )}

      {state === "ok" && (
        <>
          <p className="font-display text-2xl font-bold text-mystic-950">Оплата прошла успешно</p>
          <p className="mt-3 text-sm text-mystic-800">
            Полная расшифровка открыта{birthDate ? ` для даты ${birthDate}` : ""}. Чек отправлен на
            e-mail.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-mystic-600 px-8 py-3 text-sm font-semibold text-white hover:bg-mystic-700"
          >
            Вернуться к калькулятору
          </Link>
        </>
      )}

      {state === "pending" && (
        <>
          <p className="font-display text-xl font-bold text-mystic-950">Платёж обрабатывается</p>
          <p className="mt-3 text-sm text-mystic-800">
            Обновите страницу через минуту или вернитесь на главную и попробуйте снова.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 text-sm text-mystic-600 underline"
          >
            Обновить
          </button>
        </>
      )}

      {state === "fail" && (
        <>
          <p className="font-display text-xl font-bold text-mystic-950">Оплата не подтверждена</p>
          <p className="mt-3 text-sm text-mystic-800">
            Если деньги списались, напишите на{" "}
            <a href="mailto:dielvliv@gmail.com" className="text-mystic-600 underline">
              dielvliv@gmail.com
            </a>
            .
          </p>
          <Link href="/" className="mt-8 text-sm text-mystic-600 underline">
            На главную
          </Link>
        </>
      )}
    </main>
  );
}
