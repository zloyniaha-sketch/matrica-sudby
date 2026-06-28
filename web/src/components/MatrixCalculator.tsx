"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateMatrix, formatBirthDate, parseBirthDate, validateBirthDate, isCompleteDate } from "@/lib/matrix";
import { KEY_POSITIONS, arcanaLabel, arcanaShort } from "@/lib/arcana";
import { MatrixChart } from "@/components/MatrixChart";
import { SpheresPanel } from "@/components/SpheresPanel";
import { ChakraPanel } from "@/components/ChakraPanel";
import { ForecastPanel } from "@/components/ForecastPanel";
import { CompatibilityPanel } from "@/components/CompatibilityPanel";
import { ReportExport } from "@/components/ReportExport";
import { PaymentModal } from "@/components/PaymentModal";
import { BirthDateInput } from "@/components/BirthDateInput";
import { buildFullReport } from "@/lib/report";
import { buildTenYearForecast } from "@/lib/forecast";
import { isPremiumUnlocked, PREMIUM_PRICE } from "@/lib/premium";
import type { MatrixPoints } from "destiny-matrix-core";

const TABS = [
  { id: "matrix", label: "Матрица" },
  { id: "spheres", label: "12 сфер" },
  { id: "chakras", label: "Чакры" },
  { id: "forecast", label: "Прогноз" },
  { id: "compat", label: "Пара" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const POSITION_LABELS: Partial<Record<keyof MatrixPoints, string>> = Object.fromEntries(
  KEY_POSITIONS.map((p) => [p.key, p.label]),
);

export function MatrixCalculator() {
  const [dateInput, setDateInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calculateMatrix> | null>(null);
  const [selected, setSelected] = useState<keyof MatrixPoints | null>("epoint");
  const [tab, setTab] = useState<TabId>("matrix");
  const [premium, setPremium] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  const birthParts = useMemo(() => parseBirthDate(dateInput), [dateInput]);
  const birthDateStr = birthParts
    ? formatBirthDate(birthParts.day, birthParts.month, birthParts.year)
    : "";

  useEffect(() => {
    if (birthDateStr) setPremium(isPremiumUnlocked(birthDateStr));
  }, [birthDateStr]);

  const report = useMemo(() => {
    if (!result || !birthParts) return null;
    return buildFullReport(result, birthParts.day, birthParts.month, birthParts.year);
  }, [result, birthParts]);

  const forecast = useMemo(() => {
    if (!birthParts) return [];
    return buildTenYearForecast(birthParts.day, birthParts.month, birthParts.year);
  }, [birthParts]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isCompleteDate(dateInput)) {
      setError("Введите дату полностью: ДД.ММ.ГГГГ");
      setResult(null);
      return;
    }
    const parts = parseBirthDate(dateInput);
    if (!parts) {
      const [dd, mm, yyyy] = dateInput.split(".");
      const check = validateBirthDate(parseInt(dd, 10), parseInt(mm, 10), parseInt(yyyy, 10));
      setError(check.ok ? "Некорректная дата рождения" : check.message);
      setResult(null);
      return;
    }
    try {
      const matrix = calculateMatrix(parts.day, parts.month, parts.year);
      setResult(matrix);
      setSelected("epoint");
      setError(null);
      setTab("matrix");
    } catch {
      setError("Некорректная дата рождения");
      setResult(null);
    }
  }

  function handleUnlock() {
    setPayOpen(true);
  }

  const selectedValue = result && selected ? result.points[selected] : null;

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(280px,1fr)_1.4fr]">
        <section className="rounded-3xl border border-mystic-200/80 bg-white/80 p-6 shadow-xl shadow-mystic-200/30 backdrop-blur lg:sticky lg:top-6 lg:self-start">
          <h2 className="font-display text-2xl font-bold text-mystic-950">Рассчитать матрицу</h2>
          <p className="mt-2 text-sm leading-relaxed text-mystic-800/80">
            Только дата рождения · расчёт в браузере · время не нужно
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-mystic-900">Дата рождения</span>
              <BirthDateInput
                id="birth-date-main"
                value={dateInput}
                onChange={setDateInput}
                className="w-full rounded-xl border border-mystic-200 bg-white px-4 py-3 text-lg tabular-nums outline-none ring-mystic-400 transition focus:ring-2"
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-mystic-600 to-mystic-500 py-3.5 text-base font-semibold text-white shadow-lg shadow-mystic-400/40 transition hover:from-mystic-700 hover:to-mystic-600"
            >
              Рассчитать бесплатно
            </button>
          </form>

          {result && birthParts && (
            <div className="mt-6 space-y-3 rounded-2xl bg-mystic-50 p-4 text-sm text-mystic-900">
              <p>
                <span className="text-mystic-600">Дата:</span> {birthDateStr}
              </p>
              <p>
                <span className="text-mystic-600">Небо / Земля:</span>{" "}
                {result.purposes.skypoint} / {result.purposes.earthpoint}
              </p>
              <p>
                <span className="text-mystic-600">Предназначение:</span>{" "}
                {result.purposes.perspurpose}
              </p>
              {premium ? (
                <p className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-medium text-emerald-800">
                  ✓ Полный доступ открыт
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleUnlock}
                  className="w-full rounded-xl border border-mystic-300 bg-white py-2.5 text-sm font-semibold text-mystic-700 hover:bg-mystic-50"
                >
                  Полный отчёт · {PREMIUM_PRICE} ₽
                </button>
              )}
            </div>
          )}
        </section>

        <section className="space-y-6">
          {result && report ? (
            <>
              <div className="flex flex-wrap gap-2 border-b border-mystic-200/60 pb-2">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      tab === t.id
                        ? "bg-mystic-600 text-white shadow"
                        : "bg-white/80 text-mystic-800 hover:bg-mystic-100"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {tab === "matrix" && (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-mystic-200/80 bg-white/90 p-4 shadow-xl">
                    <MatrixChart
                      points={result.points}
                      selected={selected}
                      onSelect={(key) => setSelected(key)}
                    />
                  </div>

                  {selected && selectedValue !== null && (
                    <div className="rounded-3xl border border-mystic-200 bg-gradient-to-br from-white to-mystic-50 p-6 shadow-lg">
                      <p className="text-xs uppercase tracking-wider text-mystic-500">
                        {POSITION_LABELS[selected] ?? selected}
                      </p>
                      <h3 className="mt-1 font-display text-3xl font-bold text-mystic-900">
                        {selectedValue} — {arcanaLabel(selectedValue)}
                      </h3>
                      <p className="mt-3 leading-relaxed text-mystic-800">
                        {arcanaShort(selectedValue)}
                      </p>
                    </div>
                  )}

                  <div className="rounded-3xl border border-mystic-200/80 bg-white/90 p-6 shadow-lg">
                    <h3 className="font-display text-xl font-bold text-mystic-950">Ключевые энергии</h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {KEY_POSITIONS.map(({ key, label, hint }) => {
                        const val = result.points[key];
                        return (
                          <li
                            key={key}
                            className="cursor-pointer rounded-2xl border border-mystic-100 bg-mystic-50/50 p-3 transition hover:border-mystic-300"
                            onClick={() => setSelected(key)}
                          >
                            <div className="flex justify-between gap-2">
                              <span className="text-sm font-medium">{label}</span>
                              <span className="font-display text-lg font-bold text-mystic-700">
                                {val}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-mystic-600">{hint}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-mystic-200/80 bg-white/90 p-6 shadow-lg">
                    <h3 className="font-display text-xl font-bold text-mystic-950">Предназначение</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mystic-800/90">
                      {report.purposeReport.narrative}
                    </p>
                    {premium && (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {report.purposeReport.blocks.slice(0, 4).map((b) => (
                          <div key={b.label} className="rounded-xl bg-mystic-50/80 p-3 text-sm">
                            <p className="font-medium text-mystic-900">
                              {b.label}: {b.value} {b.arcanaName}
                            </p>
                            <p className="mt-1 text-xs text-mystic-600">{b.ageHint}</p>
                            <p className="mt-2 text-mystic-800/85">{b.short}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {premium && (
                    <div className="rounded-3xl border border-mystic-200/80 bg-white/90 p-6 shadow-lg">
                      <h3 className="font-display text-xl font-bold text-mystic-950">Синтез матрицы</h3>
                      <div className="mt-3 space-y-3 text-sm leading-relaxed text-mystic-800/90">
                        {report.matrixInsights.synthesisParagraphs.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-mystic-50/80 p-4 text-sm">
                          <h4 className="font-semibold text-mystic-900">Линия любви</h4>
                          {report.matrixInsights.loveLine.map((l) => (
                            <p key={l.label} className="mt-2 text-mystic-800/85">
                              {l.value} {l.arcanaName}: {l.meaning}
                            </p>
                          ))}
                        </div>
                        <div className="rounded-xl bg-mystic-50/80 p-4 text-sm">
                          <h4 className="font-semibold text-mystic-900">Линия денег</h4>
                          {report.matrixInsights.moneyLine.map((l) => (
                            <p key={l.label} className="mt-2 text-mystic-800/85">
                              {l.value} {l.arcanaName}: {l.meaning}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="rounded-3xl border border-mystic-200/80 bg-white/90 p-6 shadow-lg">
                    <h3 className="font-display text-xl font-bold text-mystic-950">
                      Кармический хвост {report.karmic.d}–{report.karmic.m}–{report.karmic.n}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mystic-800/90">
                      {premium ? report.karmic.summary : `${report.karmic.dName}, ${report.karmic.mName}, ${report.karmic.nName} — три урока души.`}
                    </p>
                    {premium ? (
                      <div className="mt-4 space-y-4">
                        {report.karmic.parts.map((part) => (
                          <div key={part.label} className="rounded-xl border border-mystic-100 p-4 text-sm">
                            <p className="font-medium text-mystic-900">
                              {part.label}: {part.value} — {part.name}
                            </p>
                            <p className="mt-2 text-mystic-800/85">{part.lesson}</p>
                          </div>
                        ))}
                        <p className="text-sm text-mystic-700">{report.karmic.integration}</p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleUnlock}
                        className="mt-3 text-sm font-medium text-mystic-600 underline"
                      >
                        Полная проработка хвоста — в отчёте
                      </button>
                    )}
                  </div>

                  <div className="rounded-3xl border border-mystic-200/80 bg-white/90 p-6 shadow-lg">
                    <h3 className="font-display text-xl font-bold text-mystic-950">Родовые программы</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mystic-800/90">
                      {premium ? report.ancestral.summary : "Линии отца, матери и скрытые каналы рода."}
                    </p>
                    {premium ? (
                      <div className="mt-4 space-y-3">
                        {report.ancestral.lines.map((line) => (
                          <div key={line.key} className="rounded-xl border border-mystic-100 p-4 text-sm">
                            <p className="font-medium text-mystic-900">
                              {line.title}: {line.value} {line.arcanaName}
                            </p>
                            <p className="mt-2 text-mystic-800/85">{line.inLine}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="mt-3 space-y-1 text-sm text-mystic-800">
                        {report.ancestral.lines.map((line) => (
                          <li key={line.key}>
                            {line.label}: <strong>{line.value}</strong> {line.arcanaName}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <ReportExport
                    report={report}
                    forecast={forecast}
                    premium={premium}
                    onUnlock={handleUnlock}
                  />
                </div>
              )}

              {tab === "spheres" && (
                <SpheresPanel spheres={report.spheres} premium={premium} onUnlock={handleUnlock} />
              )}

              {tab === "chakras" && (
                <ChakraPanel
                  chakras={report.chakras}
                  premium={premium}
                  onUnlock={handleUnlock}
                />
              )}

              {tab === "forecast" && (
                <ForecastPanel forecast={forecast} premium={premium} onUnlock={handleUnlock} />
              )}

              {tab === "compat" && (
                <CompatibilityPanel
                  personADate={birthDateStr}
                  premium={premium}
                  onUnlock={handleUnlock}
                />
              )}
            </>
          ) : (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-mystic-200 bg-white/50 p-8 text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-mystic-100 font-display text-3xl text-mystic-400">
                ✦
              </div>
              <p className="max-w-xs text-mystic-800/70">
                Введи дату рождения — построим матрицу, 12 сфер, чакры, прогноз и совместимость
              </p>
            </div>
          )}
        </section>
      </div>

      <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} birthDate={birthDateStr} />
    </>
  );
}
