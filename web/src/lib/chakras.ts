import type { MatrixChartHeart } from "destiny-matrix-core";
import { arcanaLabel } from "@/lib/arcana";

export const CHAKRA_DEFS = [
  { key: "sah", name: "Сахасрара", top: "Коронная", zone: "Голова, нервная система, связь с высшим смыслом" },
  { key: "aj", name: "Аджна", top: "Третий глаз", zone: "Лоб, зрение, интуиция, сон" },
  { key: "vish", name: "Вишудха", top: "Горловая", zone: "Горло, щитовидка, голос, самовыражение" },
  { key: "anah", name: "Анахата", top: "Сердечная", zone: "Сердце, лёгкие, грудная клетка, любовь" },
  { key: "man", name: "Манипура", top: "Солнечное сплетение", zone: "ЖКТ, печень, воля, самооценка" },
  { key: "svad", name: "Свадхистана", top: "Сакральная", zone: "Таз, почки, творчество, удовольствие" },
  { key: "mul", name: "Муладхара", top: "Корневая", zone: "Ноги, кости, выживание, опора" },
] as const;

type ChakraKey = (typeof CHAKRA_DEFS)[number]["key"];

function levelText(value: number): { level: string; text: string } {
  if (value >= 18) {
    return {
      level: "Высокая",
      text: `Энергия ${value} (${arcanaLabel(value)}) — мощный поток, возможны перегрузки. Важно заземление и отдых.`,
    };
  }
  if (value >= 11) {
    return {
      level: "Умеренная",
      text: `Энергия ${value} (${arcanaLabel(value)}) — рабочий баланс. Поддерживай через режим и внимание к телу.`,
    };
  }
  if (value >= 6) {
    return {
      level: "Сниженная",
      text: `Энергия ${value} (${arcanaLabel(value)}) — зона внимания. Не игнорируй сигналы тела, добавь практики восстановления.`,
    };
  }
  return {
    level: "Слабая",
    text: `Энергия ${value} (${arcanaLabel(value)}) — требует бережного отношения. Мягкие нагрузки, питание, сон — приоритет.`,
  };
}

export interface ChakraReport {
  key: ChakraKey;
  name: string;
  top: string;
  zone: string;
  physics: number;
  energy: number;
  emotions: number;
  physicsText: string;
  energyText: string;
  emotionsText: string;
  advice: string;
}

function getVal(heart: MatrixChartHeart, prefix: ChakraKey, suffix: "physics" | "energy" | "emotions") {
  const key = `${prefix}${suffix}` as keyof MatrixChartHeart;
  return heart[key];
}

const CHAKRA_ADVICE: Record<ChakraKey, string> = {
  sah: "Медитация, тишина, минимум информационного шума. Не перегружай голову.",
  aj: "Дневник инсайтов, режим сна, умеренная нагрузка на глаза.",
  vish: "Говори правду мягко, пой, дыхательные практики, тёплая вода.",
  anah: "Практики благодарности, прогулки, работа с обидой через прощение.",
  man: "Режим питания, умеренный спорт, не подавляй гнев — проживай его экологично.",
  svad: "Творчество, вода, движение бёдрами, радость без чувства вины.",
  mul: "Ходьба босиком, работа с ногами, финансовая подушка как заземление.",
};

export function buildChakraReports(heart: MatrixChartHeart): ChakraReport[] {
  return CHAKRA_DEFS.map((def) => {
    const physics = getVal(heart, def.key, "physics");
    const energy = getVal(heart, def.key, "energy");
    const emotions = getVal(heart, def.key, "emotions");
    const p = levelText(physics);
    const e = levelText(energy);
    const em = levelText(emotions);

    const advice =
      `${CHAKRA_ADVICE[def.key]} ` +
      `Следи за балансом: тело (${physics}), энергия (${energy}), эмоции (${emotions}). ` +
      `Самый уязвимый слой сейчас — ${
        Math.min(physics, energy, emotions) === physics
          ? "физический"
          : Math.min(physics, energy, emotions) === energy
            ? "энергетический"
            : "эмоциональный"
      }.`;

    return {
      key: def.key,
      name: def.name,
      top: def.top,
      zone: def.zone,
      physics,
      energy,
      emotions,
      physicsText: `${p.level}: ${p.text}`,
      energyText: `${e.level}: ${e.text}`,
      emotionsText: `${em.level}: ${em.text}`,
      advice,
    };
  });
}
