import { fromParts, type MatrixResult } from "destiny-matrix-core";

export type { MatrixResult };

export {
  parseBirthDate,
  formatBirthDate,
  formatDateInput,
  isCompleteDate,
  validateBirthDate,
} from "@/lib/date-input";

export function calculateMatrix(day: number, month: number, year: number): MatrixResult {
  return fromParts(day, month, year);
}
