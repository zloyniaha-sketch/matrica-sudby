import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Калькулятор матрицы по дате рождения — бесплатно",
  description:
    "Бесплатный онлайн-калькулятор: 22 аркана, схема матрицы и расшифровка. Расчёт в браузере — дата рождения не передаётся на сервер.",
  keywords: [
    "калькулятор матрицы",
    "матрица по дате рождения",
    "матрица судьбы калькулятор",
    "22 аркана",
    "нумерология",
  ],
  openGraph: {
    title: "Калькулятор матрицы по дате рождения",
    description:
      "Бесплатный онлайн-калькулятор: 22 аркана, схема и расшифровка. Данные не уходят на сервер.",
    locale: "ru_RU",
    type: "website",
  },
  referrer: "strict-origin-when-cross-origin",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://yandex.ru; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://mc.yandex.ru; font-src 'self' data:; connect-src 'self' https://mc.yandex.ru https://yandex.ru; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
