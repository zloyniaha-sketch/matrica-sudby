"use client";

import { useRef, useState } from "react";
import type { FullReport } from "@/lib/report";
import type { YearForecast } from "@/lib/forecast";
import { exportElementToPdf, pdfFilename } from "@/lib/pdf";
import { ReportPdfView } from "@/components/ReportPdfView";

interface ReportExportProps {
  report: FullReport;
  forecast: YearForecast[];
  premium: boolean;
  onUnlock: () => void;
}

export function ReportExport({ report, forecast, premium, onUnlock }: ReportExportProps) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    if (!premium) {
      onUnlock();
      return;
    }
    if (!pdfRef.current) return;

    setLoading(true);
    setError(null);
    try {
      await exportElementToPdf(pdfRef.current, pdfFilename(report.birthDate));
    } catch {
      setError("Не удалось создать PDF. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-mystic-200 bg-gradient-to-br from-mystic-50 to-white p-6 text-center shadow-lg">
      <h3 className="font-display text-lg font-bold text-mystic-900">Скачать PDF-отчёт</h3>
      <p className="mt-2 text-sm text-mystic-800/80">
        Предназначение · кармический хвост · род · 12 сфер · чакры · прогноз на 10 лет
      </p>
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="mt-4 rounded-xl bg-gradient-to-r from-mystic-600 to-mystic-500 px-8 py-3 font-semibold text-white shadow-lg disabled:opacity-60"
      >
        {loading ? "Генерация PDF…" : premium ? "Скачать PDF" : "Получить за 990 ₽"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {/* Hidden source for PDF — stays off-screen; clone also goes off-screen in pdf.ts */}
      <div
        ref={pdfRef}
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 794,
          opacity: 0,
          zIndex: -1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <ReportPdfView report={report} forecast={forecast} />
      </div>
    </div>
  );
}
