import type { MatrixPoints, MatrixPurposes } from "destiny-matrix-core";

export interface LifeSphere {
  id: string;
  title: string;
  icon: string;
  /** Точка матрицы или спец. ключ */
  resolve: (points: MatrixPoints, purposes: MatrixPurposes) => number;
  intro: string;
}

export const LIFE_SPHERES: LifeSphere[] = [
  {
    id: "personality",
    title: "Личность",
    icon: "☉",
    resolve: (p) => p.apoint,
    intro: "Как ты проявляешь себя в мире, первое впечатление и внешняя энергия.",
  },
  {
    id: "character",
    title: "Характер",
    icon: "◐",
    resolve: (p) => p.bpoint,
    intro: "Внутренние качества, привычные реакции и эмоциональные паттерны.",
  },
  {
    id: "health",
    title: "Здоровье",
    icon: "♡",
    resolve: (p) => p.hpoint,
    intro: "Энергетические зоны уязвимости и ресурсы для восстановления.",
  },
  {
    id: "love",
    title: "Любовь и отношения",
    icon: "♥",
    resolve: (p) => p.lpoint,
    intro: "Партнёрство, близость, сценарии в паре и ожидания от любви.",
  },
  {
    id: "money",
    title: "Деньги и финансы",
    icon: "◎",
    resolve: (p) => p.mpoint,
    intro: "Денежный канал, отношение к изобилию и материальная реализация.",
  },
  {
    id: "purpose",
    title: "Предназначение",
    icon: "✦",
    resolve: (_, pur) => pur.perspurpose,
    intro: "Главный вектор души — зачем ты пришёл в эту жизнь.",
  },
  {
    id: "talents",
    title: "Таланты",
    icon: "✧",
    resolve: (p) => p.kpoint,
    intro: "Врождённые способности и зоны, где легко получается результат.",
  },
  {
    id: "family",
    title: "Род и семья",
    icon: "⌂",
    resolve: (p) => p.fpoint,
    intro: "Родовые программы, связь с предками и семейные сценарии.",
  },
  {
    id: "children",
    title: "Дети",
    icon: "❋",
    resolve: (p) => p.gpoint,
    intro: "Энергия потомства, отношение к детям и материнство/отцовство.",
  },
  {
    id: "career",
    title: "Карьера и работа",
    icon: "⚙",
    resolve: (p) => p.tpoint,
    intro: "Профессиональный путь, реализация в социуме и денежная работа.",
  },
  {
    id: "karma",
    title: "Карма",
    icon: "∞",
    resolve: (p) => p.cpoint,
    intro: "Уроки прошлого опыта и задачи, которые душа несёт в этой жизни.",
  },
  {
    id: "spirit",
    title: "Духовность",
    icon: "☽",
    resolve: (p) => p.epoint,
    intro: "Комфортная зона, внутренний центр и связь с высшим смыслом.",
  },
];
