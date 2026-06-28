"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PREMIUM_PRICE } from "@/lib/premium";
import { setPendingPaymentId } from "@/lib/payment-pending";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  birthDate: string;
}

export function PaymentModal({ open, onClose, birthDate }: PaymentModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setAgreed(false);
      setError(null);
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  async function handlePay() {
    if (!agreed || loading) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/payments/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate, email: email.trim() }),
      });
      const data = (await res.json()) as {
        confirmationUrl?: string;
        paymentId?: string;
        error?: string;
      };

      if (!res.ok || !data.confirmationUrl || !data.paymentId) {
        setError(data.error ?? "Не удалось начать оплату");
        setLoading(false);
        return;
      }

      setPendingPaymentId(data.paymentId);
      window.location.href = data.confirmationUrl;
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <h3 className="font-display text-xl font-bold text-mystic-950">Полная расшифровка</h3>
        <p className="mt-2 text-sm text-mystic-800/80">
          12 сфер жизни · кармические программы · прогноз на 10 лет · PDF
        </p>
        <p className="mt-4 text-3xl font-bold text-mystic-700">{PREMIUM_PRICE} ₽</p>
        <p className="mt-2 rounded-lg bg-mystic-50 px-3 py-2 text-xs text-mystic-800">
          Дата рождения: {birthDate}
        </p>

        <label className="mt-4 block text-left">
          <span className="mb-1.5 block text-xs font-medium text-mystic-900">
            E-mail для чека и доступа к услуге
          </span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-mystic-200 bg-white px-4 py-2.5 text-sm outline-none ring-mystic-400 focus:ring-2"
          />
        </label>

        <label className="mt-4 flex cursor-pointer items-start gap-2 text-left text-xs leading-relaxed text-mystic-800">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 shrink-0"
          />
          <span>
            Принимаю{" "}
            <Link href="/offer/" className="text-mystic-600 underline" target="_blank">
              публичную оферту
            </Link>
            ,{" "}
            <Link href="/privacy/" className="text-mystic-600 underline" target="_blank">
              политику конфиденциальности
            </Link>
            , даю согласие на обработку персональных данных для оказания услуги и подтверждаю
            согласие на немедленное предоставление цифрового контента после оплаты.
          </span>
        </label>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800">{error}</p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-mystic-200 py-3 text-sm font-medium text-mystic-800 disabled:opacity-50"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={handlePay}
            disabled={!agreed || !email.trim() || loading}
            className="flex-1 rounded-xl bg-mystic-600 py-3 text-sm font-semibold text-white hover:bg-mystic-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Переход…" : `Оплатить ${PREMIUM_PRICE} ₽`}
          </button>
        </div>
      </div>
    </div>
  );
}
