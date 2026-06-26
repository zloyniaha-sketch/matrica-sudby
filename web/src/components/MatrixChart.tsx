"use client";

import type { MatrixPoints } from "destiny-matrix-core";

interface MatrixChartProps {
  points: MatrixPoints;
  onSelect?: (key: keyof MatrixPoints, value: number) => void;
  selected?: keyof MatrixPoints | null;
}

type Pt = keyof MatrixPoints;

const COORDS: Partial<Record<Pt, [number, number]>> = {
  dpoint: [200, 45],
  opoint: [120, 85],
  ppoint: [280, 85],
  apoint: [55, 200],
  bpoint: [345, 200],
  cpoint: [200, 355],
  fpoint: [55, 310],
  gpoint: [345, 310],
  jpoint: [115, 115],
  kpoint: [285, 115],
  lpoint: [115, 285],
  mpoint: [285, 285],
  spoint: [130, 200],
  tpoint: [270, 200],
  epoint: [200, 200],
  npoint: [200, 310],
  qpoint: [200, 130],
};

const OUTLINE: [Pt, Pt][] = [
  ["dpoint", "opoint"],
  ["opoint", "apoint"],
  ["apoint", "fpoint"],
  ["fpoint", "cpoint"],
  ["cpoint", "gpoint"],
  ["gpoint", "bpoint"],
  ["bpoint", "ppoint"],
  ["ppoint", "dpoint"],
  ["apoint", "spoint"],
  ["spoint", "epoint"],
  ["epoint", "tpoint"],
  ["tpoint", "bpoint"],
  ["dpoint", "jpoint"],
  ["jpoint", "epoint"],
  ["epoint", "mpoint"],
  ["mpoint", "cpoint"],
  ["apoint", "jpoint"],
  ["bpoint", "kpoint"],
  ["dpoint", "kpoint"],
  ["cpoint", "lpoint"],
];

const DISPLAY: Pt[] = [
  "apoint",
  "bpoint",
  "cpoint",
  "dpoint",
  "epoint",
  "fpoint",
  "gpoint",
  "jpoint",
  "kpoint",
  "lpoint",
  "mpoint",
  "spoint",
  "tpoint",
  "opoint",
  "ppoint",
  "npoint",
  "qpoint",
];

export function MatrixChart({ points, onSelect, selected }: MatrixChartProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="mx-auto h-auto w-full max-w-md drop-shadow-lg"
      role="img"
      aria-label="Схема матрицы судьбы"
    >
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9d9ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#faf7ff" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" rx="24" fill="url(#centerGlow)" />

      {OUTLINE.map(([a, b]) => {
        const p1 = COORDS[a];
        const p2 = COORDS[b];
        if (!p1 || !p2) return null;
        return (
          <line
            key={`${a}-${b}`}
            x1={p1[0]}
            y1={p1[1]}
            x2={p2[0]}
            y2={p2[1]}
            stroke="#8539f5"
            strokeWidth={1.5}
            strokeOpacity={0.45}
          />
        );
      })}

      {DISPLAY.map((key) => {
        const coord = COORDS[key];
        if (!coord) return null;
        const value = points[key];
        const isCenter = key === "epoint";
        const isSelected = selected === key;
        const [cx, cy] = coord;
        const r = isCenter ? 28 : 22;

        return (
          <g
            key={key}
            className={onSelect ? "cursor-pointer" : ""}
            onClick={() => onSelect?.(key, value)}
          >
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={isSelected ? "#8539f5" : isCenter ? "#7228d8" : "#ffffff"}
              stroke={isSelected ? "#4f1d8f" : "#b88aff"}
              strokeWidth={isCenter ? 2.5 : 2}
            />
            <text
              x={cx}
              y={cy + (isCenter ? 6 : 5)}
              textAnchor="middle"
              fill={isCenter || isSelected ? "#ffffff" : "#4f1d8f"}
              fontSize={isCenter ? 18 : 15}
              fontWeight="700"
              fontFamily="Georgia, serif"
            >
              {value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
