"use client";

import type { YearForecast } from "@/lib/forecast";

interface ForecastPanelProps {
  forecast: YearForecast[];
  premium: boolean;
  onUnlock: () => void;
}

export function ForecastPanel({ forecast, premium, onUnlock }: ForecastPanelProps) {
  const visible = premium ? forecast : forecast.slice(0, 2);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-mystic-950">Прогноз на 10 лет</h3>
        {!premium && (
          <button
            type="button"
            onClick={onUnlock}
            className="rounded-full bg-mystic-600 px-4 py-2 text-xs font-semibold text-white"
          >
            Все 10 лет
          </button>
        )}
      </div>
      <p className="text-sm text-mystic-700/80">
        Персональная энергия года: тема, возможности, риски и совет.
      </p>

      <div className="space-y-4">
        {visible.map((row) => (
          <article
            key={row.year}
            className="rounded-2xl border border-mystic-100 bg-white/90 p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-display text-lg font-bold text-mystic-900">{row.year} год</h4>
              <span className="text-sm text-mystic-600">Возраст {row.age}</span>
            </div>
            <p className="mt-1 font-medium text-mystic-700">
              {row.energy} — {row.arcanaName}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-mystic-800/90">{row.theme}</p>

            {premium ? (
              <div className="mt-3 space-y-2 border-t border-mystic-100 pt-3 text-sm">
                <p>
                  <span className="font-semibold text-emerald-700">Возможности:</span>{" "}
                  {row.opportunities}
                </p>
                <p>
                  <span className="font-semibold text-amber-700">Риски:</span> {row.risks}
                </p>
                <p>
                  <span className="font-semibold text-mystic-700">Совет:</span> {row.advice}
                </p>
              </div>
            ) : (
              <p className="mt-2 text-xs italic text-mystic-500">{row.short}</p>
            )}
          </article>
        ))}
      </div>

      {!premium && (
        <p className="text-center text-xs text-mystic-500">
          Показаны 2 года из 10 · полный прогноз в платном отчёте
        </p>
      )}
    </div>
  );
}
