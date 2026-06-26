"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PREMIUM_PRICE } from "@/lib/premium";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  birthDate: string;
}

export function PaymentModal({ open, onClose, onSuccess, birthDate }: PaymentModalProps) {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!open) setAgreed(false);
  }, [open]);

  if (!open) return null;

  function handlePay() {
    if (!agreed) return;
    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <h3 className="font-display text-xl font-bold text-mystic-950">Полная расшифровка</h3>
        <p className="mt-2 text-sm text-mystic-800/80">
          12 сфер жизни · кармические программы · прогноз на 10 лет · PDF
        </p>
        <p className="mt-4 text-3xl font-bold text-mystic-700">{PREMIUM_PRICE} ₽</p>
        <p className="mt-1 text-xs text-mystic-600">Тестовый режим — оплата не списывается</p>
        <p className="mt-2 rounded-lg bg-mystic-50 px-3 py-2 text-xs text-mystic-800">
          Дата: {birthDate}
        </p>

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
              оферту
            </Link>{" "}
            и{" "}
            <Link href="/privacy/" className="text-mystic-600 underline" target="_blank">
              политику конфиденциальности
            </Link>
            . Согласен на обработку данных для оказания услуги.
          </span>
        </label>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-mystic-200 py-3 text-sm font-medium text-mystic-800"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={handlePay}
            disabled={!agreed}
            className="flex-1 rounded-xl bg-mystic-600 py-3 text-sm font-semibold text-white hover:bg-mystic-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Оплатить (тест)
          </button>
        </div>
      </div>
    </div>
  );
}
