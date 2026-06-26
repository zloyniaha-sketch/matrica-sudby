/** Форматирование даты: только цифры, точки автоматически */
export function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
}

export function isCompleteDate(value: string): boolean {
  return /^\d{2}\.\d{2}\.\d{4}$/.test(value);
}

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

/** Строгая валидация календарной даты */
export function validateBirthDate(
  day: number,
  month: number,
  year: number,
): { ok: true } | { ok: false; message: string } {
  if (year < 1900 || year > 2100) {
    return { ok: false, message: "Год должен быть от 1900 до 2100" };
  }
  if (month < 1 || month > 12) {
    return { ok: false, message: "Месяц должен быть от 01 до 12" };
  }
  const maxDay = daysInMonth(month, year);
  if (day < 1 || day > maxDay) {
    return { ok: false, message: `Некорректный день для ${String(month).padStart(2, "0")}.${year}` };
  }
  const d = new Date(year, month - 1, day);
  if (d.getTime() > Date.now()) {
    return { ok: false, message: "Дата рождения не может быть в будущем" };
  }
  return { ok: true };
}

export function parseBirthDate(input: string): { day: number; month: number; year: number } | null {
  const trimmed = input.trim();
  if (!isCompleteDate(trimmed)) return null;

  const [dd, mm, yyyy] = trimmed.split(".");
  const day = parseInt(dd, 10);
  const month = parseInt(mm, 10);
  const year = parseInt(yyyy, 10);

  if (!Number.isFinite(day) || !Number.isFinite(month) || !Number.isFinite(year)) return null;

  const check = validateBirthDate(day, month, year);
  if (!check.ok) return null;

  return { day, month, year };
}

export function formatBirthDate(day: number, month: number, year: number): string {
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  return `${dd}.${mm}.${year}`;
}
