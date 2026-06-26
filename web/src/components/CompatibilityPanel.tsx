"use client";

import { useState } from "react";
import { calculateCompatibility, fromParts, type CompatibilityScores } from "destiny-matrix-core";
import { parseBirthDate, formatBirthDate, validateBirthDate, isCompleteDate } from "@/lib/matrix";
import {
  COMPAT_DIMENSIONS,
  buildCompatSummary,
  interpretCompatScore,
} from "@/lib/compat-text";
import { BirthDateInput } from "@/components/BirthDateInput";

interface CompatibilityPanelProps {
  personADate: string;
  premium: boolean;
  onUnlock: () => void;
}

export function CompatibilityPanel({ personADate, premium, onUnlock }: CompatibilityPanelProps) {
  const [dateB, setDateB] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const partsA = parseBirthDate(personADate);
  const partsB = parseBirthDate(dateB);

  let scores: CompatibilityScores | null = null;

  if (checked && partsA && partsB && premium) {
    try {
      const a = fromParts(partsA.day, partsA.month, partsA.year);
      const b = fromParts(partsB.day, partsB.month, partsB.year);
      scores = calculateCompatibility(a.points, b.points).scores;
    } catch {
      scores = null;
    }
  }

  const summary = scores ? buildCompatSummary(scores) : null;

  function handleCheck() {
    if (!isCompleteDate(dateB)) {
      setError("Введите дату партнёра полностью: ДД.ММ.ГГГГ");
      return;
    }
    if (!partsB) {
      const [dd, mm, yyyy] = dateB.split(".");
      const check = validateBirthDate(parseInt(dd, 10), parseInt(mm, 10), parseInt(yyyy, 10));
      setError(check.ok ? "Некорректная дата" : check.message);
      return;
    }
    if (!premium) {
      onUnlock();
      return;
    }
    setError(null);
    setChecked(true);
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl font-bold text-mystic-950">Совместимость пары</h3>
      <p className="text-sm text-mystic-700/80">
        Сравнение двух матриц по датам рождения с расшифровкой каждой зоны.
      </p>

      <div className="rounded-2xl border border-mystic-100 bg-mystic-50/50 p-4 text-sm">
        <p>
          <span className="text-mystic-600">Вы:</span> {personADate}
        </p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Дата рождения партнёра</span>
        <BirthDateInput
          id="birth-date-partner"
          value={dateB}
          onChange={(v) => {
            setDateB(v);
            setChecked(false);
          }}
          className="w-full rounded-xl border border-mystic-200 bg-white px-4 py-3 tabular-nums outline-none ring-mystic-400 focus:ring-2"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handleCheck}
        className="w-full rounded-xl bg-mystic-600 py-3 font-semibold text-white hover:bg-mystic-700"
      >
        {premium ? "Рассчитать совместимость" : "Разблокировать · 990 ₽"}
      </button>

      {premium && summary && scores && partsB && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-mystic-200 bg-gradient-to-br from-mystic-50 to-white p-5">
            <p className="text-center font-display text-3xl font-bold text-mystic-700">
              {summary.average}%
            </p>
            <p className="mt-2 text-center text-sm text-mystic-800/85">{summary.summary}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {COMPAT_DIMENSIONS.map((dim) => {
              const score = scores[dim.key];
              const interp = interpretCompatScore(score, dim.key);
              return (
                <div
                  key={dim.key}
                  className="rounded-2xl border border-mystic-100 bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-mystic-900">{dim.label}</p>
                    <span className="font-display text-xl font-bold text-mystic-700">{score}%</span>
                  </div>
                  <p className="mt-1 text-xs text-mystic-600">{dim.desc}</p>
                  <p
                    className={`mt-2 text-xs font-semibold ${
                      interp.color === "green"
                        ? "text-emerald-700"
                        : interp.color === "amber"
                          ? "text-amber-700"
                          : "text-red-700"
                    }`}
                  >
                    {interp.level}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-mystic-800/90">{interp.text}</p>
                  <p className="mt-2 text-xs text-mystic-600">
                    <span className="font-medium">Совет:</span> {interp.tip}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
              <h4 className="font-semibold text-emerald-800">Сильные стороны</h4>
              <ul className="mt-2 space-y-2 text-sm text-emerald-900/85">
                {summary.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
              <h4 className="font-semibold text-amber-800">Зоны роста</h4>
              <ul className="mt-2 space-y-2 text-sm text-amber-900/85">
                {summary.challenges.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-xs text-mystic-500">
            Партнёр: {formatBirthDate(partsB.day, partsB.month, partsB.year)}
          </p>
        </div>
      )}
    </div>
  );
}
