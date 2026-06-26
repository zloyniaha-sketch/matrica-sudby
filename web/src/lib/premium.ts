const STORAGE_PREFIX = "matrix-premium:";
const DATE_PATTERN = /^\d{2}\.\d{2}\.\d{4}$/;

export const PREMIUM_PRICE = 990;

function keyForDate(birthDate: string): string | null {
  if (!DATE_PATTERN.test(birthDate)) return null;
  return `${STORAGE_PREFIX}${birthDate}`;
}

export function isPremiumUnlocked(birthDate: string): boolean {
  if (typeof window === "undefined") return false;
  const key = keyForDate(birthDate);
  if (!key) return false;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const data = JSON.parse(raw) as { unlocked?: boolean };
    return data.unlocked === true;
  } catch {
    return false;
  }
}

export function unlockPremium(birthDate: string): void {
  const key = keyForDate(birthDate);
  if (!key) return;
  localStorage.setItem(
    key,
    JSON.stringify({ unlocked: true, at: new Date().toISOString() }),
  );
}

export function lockPremium(birthDate: string): void {
  const key = keyForDate(birthDate);
  if (!key) return;
  localStorage.removeItem(key);
}
