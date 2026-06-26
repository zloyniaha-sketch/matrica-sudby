"use client";

import type { FullReport, SphereReport } from "@/lib/report";
import type { YearForecast } from "@/lib/forecast";
import type { EnergyPoint, LinePoint } from "@/lib/matrix-insights";
import type { ChakraReport } from "@/lib/chakras";
import type { PurposeBlock } from "@/lib/purposes-text";

interface ReportPdfViewProps {
  report: FullReport;
  forecast: YearForecast[];
}

const W = 794;

const styles = {
  wrap: {
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#310f62",
    background: "#ffffff",
    width: `${W}px`,
    boxSizing: "border-box" as const,
    fontVariantNumeric: "tabular-nums" as const,
  },
  page: { padding: "28px 34px", background: "#ffffff", width: `${W}px`, boxSizing: "border-box" as const },
  h1: { fontSize: "24px", textAlign: "center" as const, margin: "0 0 6px", color: "#4f1d8f" },
  subtitle: { textAlign: "center" as const, color: "#666", margin: "0 0 16px", fontSize: "13px" },
  h2: { fontSize: "17px", color: "#4f1d8f", margin: "0 0 12px", borderBottom: "2px solid #e9d9ff", paddingBottom: "4px" },
  h3: { fontSize: "14px", color: "#5b21b6", margin: "10px 0 5px" },
  p: { fontSize: "12px", lineHeight: 1.55, margin: "0 0 7px", color: "#3b0764" },
  label: { fontWeight: "bold" as const, color: "#4f1d8f" },
  arcana: { fontWeight: "bold" as const, color: "#5b21b6" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: "12px", marginBottom: "10px" },
  th: { padding: "5px 6px", border: "1px solid #ccc", background: "#f3ecff", textAlign: "left" as const },
  td: { padding: "5px 6px", border: "1px solid #ccc", verticalAlign: "top" as const },
  block: { marginBottom: "12px" },
};

function Page({ children }: { children: React.ReactNode }) {
  return <div data-pdf-page style={styles.page}>{children}</div>;
}

function Arcana({ value, name }: { value: number; name: string }) {
  return <span style={styles.arcana}>{value} — {name}</span>;
}

function KeyNumbersTable({ rows }: { rows: [string, string | number | undefined][] }) {
  return (
    <table style={styles.table}>
      <tbody>
        {rows.map(([label, val]) => (
          <tr key={String(label)}>
            <td style={{ ...styles.td, width: "48%" }}>{label}</td>
            <td style={styles.td}>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SphereCompact({ s }: { s: SphereReport }) {
  return (
    <div style={styles.block}>
      <h3 style={styles.h3}>{s.icon} {s.title}: <Arcana value={s.arcana} name={s.arcanaName} /></h3>
      <p style={styles.p}>{s.context}</p>
      <p style={styles.p}><span style={styles.label}>Совет:</span> {s.advice}</p>
    </div>
  );
}

function EnergyCompact({ e }: { e: EnergyPoint }) {
  return (
    <div style={styles.block}>
      <h3 style={styles.h3}>{e.label}: <Arcana value={e.value} name={e.arcanaName} /></h3>
      <p style={{ ...styles.p, color: "#666", fontSize: "11px" }}>{e.zone}</p>
      <p style={styles.p}>{e.inLife}</p>
    </div>
  );
}

function LineCompact({ l }: { l: LinePoint }) {
  return (
    <div style={styles.block}>
      <h3 style={styles.h3}>{l.label}: <Arcana value={l.value} name={l.arcanaName} /></h3>
      <p style={styles.p}>{l.meaning}</p>
      <p style={styles.p}><span style={styles.label}>Совет:</span> {l.advice}</p>
    </div>
  );
}

function PurposeCompact({ b }: { b: PurposeBlock }) {
  return (
    <div style={styles.block}>
      <h3 style={styles.h3}>{b.label}: <Arcana value={b.value} name={b.arcanaName} /></h3>
      <p style={{ ...styles.p, color: "#666", fontSize: "11px" }}>{b.ageHint}</p>
      <p style={styles.p}>{b.short}</p>
      <p style={styles.p}><span style={styles.label}>Совет:</span> {b.advice}</p>
    </div>
  );
}

function ChakraCompact({ c }: { c: ChakraReport }) {
  return (
    <div style={styles.block}>
      <h3 style={styles.h3}>{c.name} · тело {c.physics}, энергия {c.energy}, эмоции {c.emotions}</h3>
      <p style={styles.p}>{c.physicsText} {c.energyText} {c.emotionsText}</p>
      <p style={styles.p}><span style={styles.label}>Рекомендация:</span> {c.advice}</p>
    </div>
  );
}

function ForecastDetail({ f }: { f: YearForecast }) {
  return (
    <div style={styles.block}>
      <h3 style={styles.h3}>{f.year} · {f.energy} — {f.arcanaName} (возраст {f.age})</h3>
      <p style={styles.p}>{f.theme}</p>
      <p style={styles.p}>{f.short}</p>
      <p style={styles.p}><span style={styles.label}>Возможности:</span> {f.opportunities}</p>
      <p style={styles.p}><span style={styles.label}>Риски:</span> {f.risks}</p>
      <p style={styles.p}><span style={styles.label}>Совет:</span> {f.advice}</p>
    </div>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function ReportPdfView({ report, forecast }: ReportPdfViewProps) {
  const mi = report.matrixInsights;
  const p = report.purposes;

  const keyNumbers: [string, string | number | undefined][] = [
    ["День (личность)", mi.baseTriad[0]?.value],
    ["Месяц (характер)", mi.baseTriad[1]?.value],
    ["Год (карма)", mi.baseTriad[2]?.value],
    ["Центр матрицы", mi.keyEnergies[0]?.value],
    ["Линия любви", mi.loveLine[0]?.value],
    ["Линия денег", mi.moneyLine[0]?.value],
    ["Личное предназначение", p.personal],
    ["Социальное предназначение", p.social],
    ["Кармический хвост", `${report.karmic.d}–${report.karmic.m}–${report.karmic.n}`],
  ];

  return (
    <div style={styles.wrap}>
      <Page>
        <h1 style={styles.h1}>Калькулятор матрицы — персональный отчёт</h1>
        <p style={styles.subtitle}>Дата рождения: {report.birthDate}</p>
        <h2 style={styles.h2}>Общий синтез</h2>
        {mi.synthesisParagraphs.map((para, i) => (
          <p key={i} style={styles.p}>{para}</p>
        ))}
        <h2 style={{ ...styles.h2, marginTop: "14px" }}>Ключевые числа</h2>
        <KeyNumbersTable rows={keyNumbers} />
        <h2 style={styles.h2}>Предназначение — обзор</h2>
        <p style={styles.p}>{report.purposeReport.narrative}</p>
        {report.purposeReport.ages.map((a) => (
          <p key={a.period} style={styles.p}><span style={styles.label}>{a.period}:</span> {a.focus}</p>
        ))}
      </Page>

      <Page>
        <h2 style={styles.h2}>Уровни предназначения</h2>
        {report.purposeReport.blocks.map((b) => (
          <PurposeCompact key={b.label} b={b} />
        ))}
      </Page>

      <Page>
        <h2 style={styles.h2}>Базовая триада: день · месяц · год</h2>
        {mi.baseTriad.map((e) => (
          <EnergyCompact key={e.label} e={e} />
        ))}
      </Page>

      {chunk(mi.keyEnergies, 5).map((group, i) => (
        <Page key={`key-${i}`}>
          <h2 style={styles.h2}>Ключевые энергии матрицы {i > 0 ? "(продолжение)" : ""}</h2>
          {group.map((e) => (
            <EnergyCompact key={e.label} e={e} />
          ))}
        </Page>
      ))}

      <Page>
        <h2 style={styles.h2}>Линия любви</h2>
        {mi.loveLine.map((l) => (
          <LineCompact key={l.label} l={l} />
        ))}
        <h2 style={{ ...styles.h2, marginTop: "16px" }}>Линия денег и изобилия</h2>
        {mi.moneyLine.map((l) => (
          <LineCompact key={l.label} l={l} />
        ))}
      </Page>

      <Page>
        <h2 style={styles.h2}>Кармический хвост {report.karmic.d}–{report.karmic.m}–{report.karmic.n}</h2>
        <p style={styles.p}>{report.karmic.summary}</p>
        {report.karmic.parts.map((part) => (
          <div key={part.label} style={styles.block}>
            <h3 style={styles.h3}>{part.label}: <Arcana value={part.value} name={part.name} /></h3>
            <p style={styles.p}><span style={styles.label}>Прошлое:</span> {part.past}</p>
            <p style={styles.p}><span style={styles.label}>Урок:</span> {part.lesson}</p>
            <p style={styles.p}><span style={styles.label}>Освобождение:</span> {part.release}</p>
          </div>
        ))}
        <h3 style={styles.h3}>Задачи проработки</h3>
        {report.karmic.tasks.map((t, i) => (
          <p key={i} style={styles.p}>{i + 1}. {t}</p>
        ))}
        <p style={styles.p}><span style={styles.label}>Интеграция:</span> {report.karmic.integration}</p>
      </Page>

      <Page>
        <h2 style={styles.h2}>Родовые программы</h2>
        <p style={styles.p}>{report.ancestral.summary}</p>
        {report.ancestral.lines.map((line) => (
          <div key={line.key} style={styles.block}>
            <h3 style={styles.h3}>{line.title}: <Arcana value={line.value} name={line.arcanaName} /></h3>
            <p style={styles.p}>{line.inLine}</p>
            <p style={styles.p}><span style={styles.label}>Совет:</span> {line.advice}</p>
          </div>
        ))}
        <h3 style={styles.h3}>Исцеление рода</h3>
        {report.ancestral.healing.map((h, j) => (
          <p key={j} style={styles.p}>{j + 1}. {h}</p>
        ))}
      </Page>

      {chunk(report.spheres, 4).map((group, i) => (
        <Page key={`sph-${i}`}>
          <h2 style={styles.h2}>12 сфер жизни — часть {i + 1}</h2>
          {group.map((s) => (
            <SphereCompact key={s.id} s={s} />
          ))}
        </Page>
      ))}

      <Page>
        <h2 style={styles.h2}>Чакральная карта — верхние центры</h2>
        {report.chakras.slice(0, 4).map((c) => (
          <ChakraCompact key={c.key} c={c} />
        ))}
      </Page>

      <Page>
        <h2 style={styles.h2}>Чакральная карта — нижние центры</h2>
        {report.chakras.slice(4).map((c) => (
          <ChakraCompact key={c.key} c={c} />
        ))}
      </Page>

      <Page>
        <h2 style={styles.h2}>Прогноз на 10 лет — сводка</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Год</th>
              <th style={styles.th}>Возр.</th>
              <th style={styles.th}>Аркан</th>
              <th style={styles.th}>Тема года</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((f) => (
              <tr key={f.year}>
                <td style={styles.td}>{f.year}</td>
                <td style={styles.td}>{f.age}</td>
                <td style={styles.td}>{f.energy} {f.arcanaName}</td>
                <td style={styles.td}>{f.theme}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>

      {chunk(forecast, 3).map((group, i) => (
        <Page key={`fc-${i}`}>
          <h2 style={styles.h2}>Прогноз по годам — часть {i + 1}</h2>
          {group.map((f) => (
            <ForecastDetail key={f.year} f={f} />
          ))}
        </Page>
      ))}

      <Page>
        <h2 style={styles.h2}>Итоговые рекомендации</h2>
        {mi.recommendations.map((r, i) => (
          <p key={i} style={styles.p}>{i + 1}. {r}</p>
        ))}
        <p style={{ ...styles.p, textAlign: "center", color: "#888", fontSize: "10px", marginTop: "24px" }}>
          © Калькулятор матрицы · Нумерологическая интерпретация для самопознания.
          Не является медицинской, юридической или финансовой консультацией.
          Числа рассчитаны по открытой формуле матрицы (22 аркана).
        </p>
      </Page>
    </div>
  );
}
