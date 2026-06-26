import type { MatrixPoints, MatrixPurposes } from "destiny-matrix-core";
import { arcanaLabel, arcanaShort } from "@/lib/arcana";
import { ARCANA_FULL } from "@/lib/arcana-full";
import { getArcanaSphereText } from "@/lib/arcana-depth";

export interface EnergyPoint {
  label: string;
  zone: string;
  value: number;
  arcanaName: string;
  short: string;
  plus: string;
  minus: string;
  advice: string;
  inLife: string;
}

export interface LinePoint {
  label: string;
  value: number;
  arcanaName: string;
  meaning: string;
  short: string;
  plus: string;
  minus: string;
  advice: string;
}

export interface MatrixInsights {
  baseTriad: EnergyPoint[];
  keyEnergies: EnergyPoint[];
  loveLine: LinePoint[];
  moneyLine: LinePoint[];
  synthesis: string;
  synthesisParagraphs: string[];
  recommendations: string[];
}

const ZONE: Partial<Record<keyof MatrixPoints, string>> = {
  apoint: "День рождения — внешнее «Я»",
  bpoint: "Месяц рождения — характер и эмоции",
  cpoint: "Год рождения — кармическая задача",
  dpoint: "Сумма базовых энергий — вход в хвост",
  epoint: "Центр матрицы — комфортная зона",
  fpoint: "Родовая линия отца",
  gpoint: "Родовая линия матери",
  hpoint: "Скрытый родовой канал",
  ipoint: "Кармический канал рода",
  jpoint: "Таланты и способности",
  kpoint: "Денежный потенциал (канал)",
  lpoint: "Линия любви — притяжение",
  mpoint: "Линия денег — изобилие",
  npoint: "Кармический хвост (земля)",
  qpoint: "Духовный канал",
  spoint: "Предназначение — Небо",
  tpoint: "Предназначение — Земля",
};

const SPHERE_FOR: Partial<Record<keyof MatrixPoints, string>> = {
  apoint: "personality",
  bpoint: "character",
  lpoint: "love",
  mpoint: "money",
};

function point(key: keyof MatrixPoints, label: string, value: number): EnergyPoint {
  const full = ARCANA_FULL[value];
  const name = arcanaLabel(value);
  const sphereId = SPHERE_FOR[key] ?? "character";
  return {
    label,
    zone: ZONE[key] ?? label,
    value,
    arcanaName: name,
    short: arcanaShort(value),
    plus: full?.plus ?? "",
    minus: full?.minus ?? "",
    advice: full?.advice ?? "",
    inLife: getArcanaSphereText(sphereId, value),
  };
}

const LOVE_MEANINGS: Record<number, string> = {
  1: "В любви проявляешь инициативу — берёшь ответственность за отношения на себя.",
  2: "Нужна эмоциональная глубина и тайна — поверхностность отталкивает.",
  3: "Любовь через заботу, нежность и создание уюта для двоих.",
  4: "Стабильность и верность — главные критерии партнёра.",
  5: "Важны общие ценности, уважение и интеллектуальная близость.",
  6: "Центральная тема — выбор партнёра и гармония в паре.",
  7: "Страсть, драйв, совместные цели и движение вперёд.",
  8: "Честность, равенство, справедливость — без этого связь рушится.",
  9: "Нужно личное пространство и глубокий собеседник.",
  10: "Отношения цикличны — периоды подъёма и кризисов.",
  11: "Магнетизм и сильные эмоции — важно управлять ревностью.",
  12: "Кармические связи, паузы, переосмысление через отношения.",
  13: "Трансформация через любовь — старые форматы отмирают.",
  14: "Гармония через терпение, компромиссы, исцеление.",
  15: "Страсть, соблазн, глубокая химия — работай с ревностью.",
  16: "Бурные отношения, кризисы, прорывы после разрывов.",
  17: "Романтика, мечта, вдохновение — партнёр как муза.",
  18: "Эмоциональные глубины, страхи, интуитивная связь.",
  19: "Тёплая, радостная любовь, публичность пары.",
  20: "Кармические встречи, прощение, второй шанс в паре.",
  21: "Зрелый союз, целостность, завершение циклов.",
  22: "Свобода в паре, лёгкость, спонтанность.",
};

const MONEY_MEANINGS: Record<number, string> = {
  1: "Деньги через личную инициативу, бизнес, лидерство.",
  2: "Доход через интуицию, консультирование, информацию.",
  3: "Изобилие через творчество, красоту, заботу.",
  4: "Стабильный доход через систему, недвижимость, карьеру.",
  5: "Деньги через обучение, экспертность, передачу знаний.",
  6: "Финансы через партнёрства, совместные проекты.",
  7: "Быстрые деньги через активность, спорт, продажи.",
  8: "Доход через право, финансы, справедливые сделки.",
  9: "Деньги через экспертность, аналитику, удалённую работу.",
  10: "Нестабильный поток — циклы, риск, удача.",
  11: "Крупные суммы через личный бренд, влияние.",
  12: "Нелинейный путь — доход после поворота и пауз.",
  13: "Трансформация финансов — старое уходит, новое приходит.",
  14: "Стабильный рост, умеренность в тратах.",
  15: "Большие деньги и большие риски — осознанность обязательна.",
  16: "Кризис и перестройка — не держись за отжившее.",
  17: "Доход через мечту, творчество, вдохновение.",
  18: "Нерегулярный поток, интуиция в инвестициях.",
  19: "Успех приносит деньги — публичность помогает.",
  20: "Доход после нахождения призвания.",
  21: "Масштаб, международность, завершённые проекты.",
  22: "Нестандартные источники, фриланс.",
};

function linePoint(label: string, value: number, meanings: Record<number, string>): LinePoint {
  const full = ARCANA_FULL[value];
  return {
    label,
    value,
    arcanaName: arcanaLabel(value),
    meaning: meanings[value] ?? arcanaShort(value),
    short: arcanaShort(value),
    plus: full?.plus ?? "",
    minus: full?.minus ?? "",
    advice: full?.advice ?? "",
  };
}

function buildSynthesisParagraphs(
  points: MatrixPoints,
  purposes: MatrixPurposes,
): string[] {
  const day = arcanaLabel(points.apoint);
  const month = arcanaLabel(points.bpoint);
  const year = arcanaLabel(points.cpoint);
  const center = arcanaLabel(points.epoint);

  return [
    `Твоя матрица построена на базовой триаде: день ${points.apoint} (${day}), месяц ${points.bpoint} (${month}), год ${points.cpoint} (${year}). ` +
      `Это «скелет» личности — то, как ты проявляешься в мире, реагируешь эмоционально и какую кармическую задачу несёшь из рождения. ` +
      `Сочетание этих трёх энергий определяет твой базовый сценарий: сильные стороны, типичные ловушки и направление роста.`,

    `Центр матрицы — энергия ${points.epoint} (${center}). Это твоя «комфортная зона» и точка силы: когда ты живёшь из этой энергии в плюсе, ` +
      `решения приходят легче, отношения и деньги выстраиваются естественнее. В минусе центр показывает, куда уходит энергия в стрессе — ` +
      `именно здесь стоит начинать ежедневную проработку.`,

    `Линия любви (${points.lpoint} — ${arcanaLabel(points.lpoint)}) и линия денег (${points.mpoint} — ${arcanaLabel(points.mpoint)}) — два главных канала реализации. ` +
      `Любовь отвечает за притяжение, близость и партнёрство; деньги — за материализацию талантов и изобилие. ` +
      `Их сочетание с центром ${points.epoint} показывает, как личная сила переводится в отношения и финансы.`,

    `Предназначение раскрывается по уровням: личное ${purposes.perspurpose} (${arcanaLabel(purposes.perspurpose)}), ` +
      `социальное ${purposes.socialpurpose} (${arcanaLabel(purposes.socialpurpose)}), общее ${purposes.generalpurpose} (${arcanaLabel(purposes.generalpurpose)}). ` +
      `Небо ${purposes.skypoint} и Земля ${purposes.earthpoint} — духовный и материальный векторы. ` +
      `Планетарный уровень ${purposes.planetarypurpose} (${arcanaLabel(purposes.planetarypurpose)}) активируется при проживании личного предназначения.`,

    `Кармический хвост ${points.dpoint}–${points.mpoint}–${points.npoint} — задачи из прошлого опыта, которые повторяются, пока не осознаны. ` +
      `Родовые линии F=${points.fpoint}, G=${points.gpoint}, H=${points.hpoint}, I=${points.ipoint} показывают наследуемые сценарии отца, матери и скрытые программы рода. ` +
      `Проработка хвоста и рода освобождает энергию для линий любви и денег.`,
  ];
}

export function buildMatrixInsights(
  points: MatrixPoints,
  purposes: MatrixPurposes,
): MatrixInsights {
  const baseTriad = [
    point("apoint", "Личность (день)", points.apoint),
    point("bpoint", "Характер (месяц)", points.bpoint),
    point("cpoint", "Карма (год)", points.cpoint),
  ];

  const keyEnergies = [
    point("epoint", "Центр матрицы", points.epoint),
    point("dpoint", "Хвост (D)", points.dpoint),
    point("spoint", "Небо", points.spoint),
    point("tpoint", "Земля", points.tpoint),
    point("lpoint", "Линия любви", points.lpoint),
    point("mpoint", "Линия денег", points.mpoint),
    point("jpoint", "Таланты", points.jpoint),
    point("kpoint", "Денежный канал", points.kpoint),
    point("qpoint", "Духовный канал", points.qpoint),
  ];

  const loveLine = [
    linePoint("Линия любви (L)", points.lpoint, LOVE_MEANINGS),
    linePoint("Эмоциональный канал (J)", points.jpoint, LOVE_MEANINGS),
    linePoint("Партнёрство (N)", points.npoint, LOVE_MEANINGS),
  ];

  const moneyLine = [
    linePoint("Линия денег (M)", points.mpoint, MONEY_MEANINGS),
    linePoint("Денежный канал (K)", points.kpoint, MONEY_MEANINGS),
    linePoint("Материализация (T)", points.tpoint, MONEY_MEANINGS),
  ];

  const synthesisParagraphs = buildSynthesisParagraphs(points, purposes);
  const synthesis = synthesisParagraphs.join(" ");

  const recommendations = [
    `Ежедневно проживай «плюс» центра (${points.epoint} ${arcanaLabel(points.epoint)}): ${ARCANA_FULL[points.epoint]?.advice ?? ""}`,
    `Следи за «минусом» центра и останавливай автоматические реакции: ${ARCANA_FULL[points.epoint]?.minus ?? ""}`,
    `Проработай кармический хвост ${points.dpoint}–${points.mpoint}–${points.npoint} через осознанный выбор в настоящем.`,
    `Таланты J=${points.jpoint} (${arcanaLabel(points.jpoint)}) — главный ресурс для реализации. Развивай их системно.`,
    `Родовые линии F=${points.fpoint}, G=${points.gpoint} — благодарность предкам и новый сценарий для потомков.`,
    `Социальное предназначение ${purposes.socialpurpose} (${arcanaLabel(purposes.socialpurpose)}) — ключевая тема после 40 лет.`,
    `Духовный канал Q=${points.qpoint} (${arcanaLabel(points.qpoint)}) — практики для баланса материального и духовного.`,
    `Планетарный уровень ${purposes.planetarypurpose} (${arcanaLabel(purposes.planetarypurpose)}) раскрывается при проживании личного ${purposes.perspurpose}.`,
  ];

  return { baseTriad, keyEnergies, loveLine, moneyLine, synthesis, synthesisParagraphs, recommendations };
}
