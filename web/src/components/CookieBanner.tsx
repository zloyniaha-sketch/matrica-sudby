"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookieConsent, setCookieConsent, type CookieConsent } from "@/lib/consent";
import { initYandexMetrika } from "@/lib/metrika";
import { YM_COUNTER_ID } from "@/lib/site-legal";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (consent === "all") initYandexMetrika();
    else if (!consent) setVisible(true);
  }, []);

  function apply(choice: CookieConsent) {
    setCookieConsent(choice);
    if (choice === "all") initYandexMetrika();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-mystic-200 bg-white/95 p-4 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-mystic-800 sm:max-w-2xl">
          Мы используем cookie для работы сайта
          {YM_COUNTER_ID ? " и Яндекс.Метрику для аналитики" : ""}.
          Подробнее — в{" "}
          <Link href="/privacy/" className="text-mystic-600 underline hover:text-mystic-800">
            политике конфиденциальности
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => apply("necessary")}
            className="rounded-lg border border-mystic-200 px-3 py-2 text-xs font-medium text-mystic-800"
          >
            Только необходимые
          </button>
          <button
            type="button"
            onClick={() => apply("all")}
            className="rounded-lg bg-mystic-600 px-3 py-2 text-xs font-semibold text-white"
          >
            Принять все
          </button>
        </div>
      </div>
    </div>
  );
}
