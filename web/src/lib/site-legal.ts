/** Юридические реквизиты — задайте через env при сборке (GitHub Secrets) */
export const LEGAL = {
  siteName: "Калькулятор матрицы",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zloyniaha-sketch.github.io/matrica-sudby",
  sellerLabel: process.env.NEXT_PUBLIC_SELLER_NAME ?? "",
  sellerInn: process.env.NEXT_PUBLIC_SELLER_INN ?? "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  priceRub: 990,
  /** Дата редакции документов (меняйте при существенных правках) */
  publishedDate: "26.06.2026",
} as const;

export const YM_COUNTER_ID = process.env.NEXT_PUBLIC_YM_ID ?? "";

export function sellerFullName(): string {
  if (LEGAL.sellerLabel && LEGAL.sellerInn) {
    return `${LEGAL.sellerLabel}, ИНН ${LEGAL.sellerInn}`;
  }
  if (LEGAL.sellerLabel) return LEGAL.sellerLabel;
  return "________________________________ (ФИО), ИНН ________________";
}

export function contactLine(): string {
  return LEGAL.contactEmail || "________________ (укажите email в настройках сайта)";
}
