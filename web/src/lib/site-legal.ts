/** Юридические реквизиты — задайте через env при сборке (GitHub Secrets) */
export const LEGAL = {
  siteName: "Калькулятор матрицы",
  sellerLabel: process.env.NEXT_PUBLIC_SELLER_NAME ?? "Самозанятый (укажите ФИО в настройках)",
  sellerInn: process.env.NEXT_PUBLIC_SELLER_INN ?? "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  priceRub: 990,
} as const;

export const YM_COUNTER_ID = process.env.NEXT_PUBLIC_YM_ID ?? "";
