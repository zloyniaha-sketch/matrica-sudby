"use client";

import type { SphereReport } from "@/lib/report";
import { arcanaLabel } from "@/lib/arcana";

interface SpheresPanelProps {
  spheres: SphereReport[];
  premium: boolean;
  onUnlock: () => void;
}

export function SpheresPanel({ spheres, premium, onUnlock }: SpheresPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-xl font-bold text-mystic-950">12 сфер жизни</h3>
        {!premium && (
          <button
            type="button"
            onClick={onUnlock}
            className="shrink-0 rounded-full bg-mystic-600 px-4 py-2 text-xs font-semibold text-white"
          >
            Открыть полностью
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {spheres.map((sphere) => (
          <article
            key={sphere.id}
            className="rounded-2xl border border-mystic-100 bg-white/90 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="mr-2 text-lg">{sphere.icon}</span>
                <span className="font-display text-lg font-bold text-mystic-900">{sphere.title}</span>
              </div>
              <span className="rounded-full bg-mystic-100 px-3 py-1 text-sm font-bold text-mystic-700">
                {sphere.arcana}
              </span>
            </div>
            <p className="mt-2 text-xs text-mystic-600">{sphere.intro}</p>
            <p className="mt-2 font-medium text-mystic-800">
              {sphere.arcana} — {arcanaLabel(sphere.arcana)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-mystic-800/90">{sphere.short}</p>

            {premium ? (
              <div className="mt-4 space-y-2 border-t border-mystic-100 pt-4 text-sm text-mystic-800">
                <p className="rounded-lg bg-mystic-50/80 p-3 leading-relaxed">{sphere.context}</p>
                <p>
                  <span className="font-semibold text-emerald-700">В плюсе:</span> {sphere.plus}
                </p>
                <p>
                  <span className="font-semibold text-amber-700">В минусе:</span> {sphere.minus}
                </p>
                <p>
                  <span className="font-semibold text-mystic-700">Совет:</span> {sphere.advice}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-xs italic text-mystic-500">
                Полная расшифровка (контекст / плюс / минус / совет) — в платном отчёте
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
