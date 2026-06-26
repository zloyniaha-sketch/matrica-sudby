import { arcanaLabel, arcanaShort } from "@/lib/arcana";
import { ARCANA_FULL } from "@/lib/arcana-full";

const LINE_MEANINGS: Record<string, { title: string; role: string }> = {
  f: {
    title: "Линия отца / мужского рода",
    role: "Сценарии силы, реализации, авторитета и отношения с мужчинами в роду.",
  },
  g: {
    title: "Линия матери / женского рода",
    role: "Сценарии заботы, эмоций, принятия и отношения с женщинами в роду.",
  },
  h: {
    title: "Родовой канал (H)",
    role: "Скрытые программы рода: таланты и блоки, переданные через поколения.",
  },
  i: {
    title: "Родовой канал (I)",
    role: "Кармические долги рода и возможность их трансформации через тебя.",
  },
};

export interface AncestralLine {
  key: string;
  label: string;
  value: number;
  arcanaName: string;
  title: string;
  role: string;
  short: string;
  plus: string;
  minus: string;
  advice: string;
  inLine: string;
}

export interface AncestralReport {
  lines: AncestralLine[];
  summary: string;
  healing: string[];
}

function lineText(key: string, value: number): string {
  const name = arcanaLabel(value);
  const templates: Record<string, string> = {
    f: `В мужской линии рода энергия ${value} (${name}) задаёт паттерн проявления силы и ответственности. Это то, как предки «держали удар» и как ты повторяешь или меняешь этот сценарий.`,
    g: `Женская линия рода несёт энергию ${value} (${name}) — тему заботы, эмоциональной близости и принятия. Через мать и бабушек передаётся этот способ любить и быть любимой.`,
    h: `Скрытый родовой канал H (${value}, ${name}) — таланты и блоки, которые род «не договаривал». Часто проявляется внезапно, когда созреваешь для их принятия.`,
    i: `Канал I (${value}, ${name}) — кармический узел рода. Ты можешь быть тем, кто завершает старый сценарий и открывает новую ветку для потомков.`,
  };
  return templates[key] ?? `Родовая линия с энергией ${value} (${name}).`;
}

export function buildAncestralReport(
  f: number,
  g: number,
  h: number,
  i: number,
): AncestralReport {
  const entries = [
    { key: "f", label: "Род (F)", value: f },
    { key: "g", label: "Род (G)", value: g },
    { key: "h", label: "Род (H)", value: h },
    { key: "i", label: "Род (I)", value: i },
  ];

  const lines: AncestralLine[] = entries.map(({ key, label, value }) => {
    const meta = LINE_MEANINGS[key];
    const full = ARCANA_FULL[value];
    return {
      key,
      label,
      value,
      arcanaName: arcanaLabel(value),
      title: meta.title,
      role: meta.role,
      short: arcanaShort(value),
      plus: full?.plus ?? "",
      minus: full?.minus ?? "",
      advice: full?.advice ?? "",
      inLine: lineText(key, value),
    };
  });

  const summary =
    `Родовая программа: мужская линия ${f} (${arcanaLabel(f)}), женская ${g} (${arcanaLabel(g)}), ` +
    `скрытые каналы ${h} и ${i}. Ты — точка трансформации: можешь повторить сценарий или переписать его для следующих поколений.`;

  const healing = [
    `Благодарность роду за жизнь — первый шаг исцеления, независимо от опыта.`,
    `Проработай линию F (${f}): ${ARCANA_FULL[f]?.advice ?? "осознай паттерн отца/мужчин рода."}`,
    `Проработай линию G (${g}): ${ARCANA_FULL[g]?.advice ?? "осознай паттерн матери/женщин рода."}`,
    `Каналы H–I (${h}, ${i}): когда готов — проговори вслух намерение завершить старый сценарий.`,
  ];

  return { lines, summary, healing };
}
