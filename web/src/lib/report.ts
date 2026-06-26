import type { MatrixResult } from "destiny-matrix-core";
import { arcanaLabel, arcanaShort } from "@/lib/arcana";
import { ARCANA_FULL } from "@/lib/arcana-full";
import { LIFE_SPHERES } from "@/lib/spheres";
import { formatBirthDate } from "@/lib/matrix";
import { getSphereContext } from "@/lib/sphere-context";
import { buildKarmicTailReport, type KarmicTailReport } from "@/lib/karmic";
import { buildAncestralReport, type AncestralReport } from "@/lib/ancestral";
import { buildChakraReports, type ChakraReport } from "@/lib/chakras";
import { buildPurposeReport, type PurposeReport } from "@/lib/purposes-text";
import { buildMatrixInsights, type MatrixInsights } from "@/lib/matrix-insights";

export interface SphereReport {
  id: string;
  title: string;
  icon: string;
  arcana: number;
  arcanaName: string;
  intro: string;
  context: string;
  short: string;
  plus: string;
  minus: string;
  advice: string;
}

export interface FullReport {
  birthDate: string;
  spheres: SphereReport[];
  purposes: {
    sky: number;
    earth: number;
    personal: number;
    social: number;
    general: number;
    planetary: number;
  };
  purposeReport: PurposeReport;
  karmic: KarmicTailReport;
  ancestral: AncestralReport;
  chakras: ChakraReport[];
  matrixInsights: MatrixInsights;
}

export function buildFullReport(
  matrix: MatrixResult,
  day: number,
  month: number,
  year: number,
): FullReport {
  const { points, purposes, chartHeart } = matrix;

  const purposesObj = {
    sky: purposes.skypoint,
    earth: purposes.earthpoint,
    personal: purposes.perspurpose,
    social: purposes.socialpurpose,
    general: purposes.generalpurpose,
    planetary: purposes.planetarypurpose,
  };

  const spheres: SphereReport[] = LIFE_SPHERES.map((sphere) => {
    const arcana = sphere.resolve(points, purposes);
    const full = ARCANA_FULL[arcana];
    const arcanaName = arcanaLabel(arcana);
    return {
      id: sphere.id,
      title: sphere.title,
      icon: sphere.icon,
      arcana,
      arcanaName,
      intro: sphere.intro,
      context: getSphereContext(sphere.id, arcana, arcanaName),
      short: arcanaShort(arcana),
      plus: full?.plus ?? "",
      minus: full?.minus ?? "",
      advice: full?.advice ?? "",
    };
  });

  return {
    birthDate: formatBirthDate(day, month, year),
    spheres,
    purposes: purposesObj,
    purposeReport: buildPurposeReport(purposesObj),
    karmic: buildKarmicTailReport(points.dpoint, points.mpoint, points.npoint),
    ancestral: buildAncestralReport(points.fpoint, points.gpoint, points.hpoint, points.ipoint),
    chakras: buildChakraReports(chartHeart),
    matrixInsights: buildMatrixInsights(points, purposes),
  };
}
