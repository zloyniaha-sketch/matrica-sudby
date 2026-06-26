import { arcanaLabel, arcanaShort } from "@/lib/arcana";
import { ARCANA_FULL } from "@/lib/arcana-full";

export interface PurposeBlock {
  label: string;
  value: number;
  arcanaName: string;
  short: string;
  plus: string;
  advice: string;
  ageHint: string;
}

export interface PurposeReport {
  blocks: PurposeBlock[];
  narrative: string;
  ages: { period: string; focus: string }[];
}

const AGE_PERIODS = [
  { period: "До 20 лет", focus: "Формирование личности, базовые уроки по энергиям дня, месяца и года." },
  { period: "20–40 лет", focus: "Личное предназначение — главный вектор. Строишь себя, карьеру, отношения." },
  { period: "40–60 лет", focus: "Социальное предназначение — влияние на мир, наставничество, реализация в социуме." },
  { period: "После 60 лет", focus: "Духовное и планетарное — передача мудрости, завершение циклов, служение." },
];

export function buildPurposeReport(purposes: {
  sky: number;
  earth: number;
  personal: number;
  social: number;
  general: number;
  planetary: number;
}): PurposeReport {
  const defs = [
    { label: "Небо (духовное)", value: purposes.sky, ageHint: "Высший вектор души, связь с миссией." },
    { label: "Земля (материальное)", value: purposes.earth, ageHint: "Реализация в материальном мире." },
    { label: "Личное предназначение", value: purposes.personal, ageHint: "Главный вектор до 40 лет." },
    { label: "Социальное", value: purposes.social, ageHint: "Влияние на людей после 40." },
    { label: "Общее", value: purposes.general, ageHint: "Синтез неба и земли." },
    { label: "Планетарное", value: purposes.planetary, ageHint: "Миссия для большого числа людей." },
  ];

  const blocks: PurposeBlock[] = defs.map(({ label, value, ageHint }) => {
    const full = ARCANA_FULL[value];
    return {
      label,
      value,
      arcanaName: arcanaLabel(value),
      short: arcanaShort(value),
      plus: full?.plus ?? "",
      advice: full?.advice ?? "",
      ageHint,
    };
  });

  const narrative =
    `Твоё предназначение раскрывается через связку Небо ${purposes.sky} (${arcanaLabel(purposes.sky)}) ` +
    `и Земля ${purposes.earth} (${arcanaLabel(purposes.earth)}), дающую личный вектор ${purposes.personal}. ` +
    `Социальная миссия — ${purposes.social} (${arcanaLabel(purposes.social)}), общий синтез — ${purposes.general}. ` +
    `Планетарный уровень ${purposes.planetary} (${arcanaLabel(purposes.planetary)}) — редкий масштаб влияния.`;

  return { blocks, narrative, ages: AGE_PERIODS };
}
