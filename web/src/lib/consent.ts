const CONSENT_KEY = "cookie-consent";

export type CookieConsent = "all" | "necessary";

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  if (v === "all" || v === "necessary") return v;
  return null;
}

export function setCookieConsent(value: CookieConsent): void {
  localStorage.setItem(CONSENT_KEY, value);
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsent() === "all";
}
