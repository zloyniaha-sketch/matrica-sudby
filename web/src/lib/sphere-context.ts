import { getArcanaSphereText } from "@/lib/arcana-depth";
import { arcanaLabel } from "@/lib/arcana";

/** Уникальный текст для каждой комбинации сфера × аркан (22 × 12 = 264) */
export function getSphereContext(sphereId: string, arcana: number, _arcanaName?: string): string {
  const text = getArcanaSphereText(sphereId, arcana);
  if (text) return text;
  const name = arcanaLabel(arcana);
  return `В этой сфере энергия ${arcana} (${name}) проявляется через ключевые качества аркана.`;
}
