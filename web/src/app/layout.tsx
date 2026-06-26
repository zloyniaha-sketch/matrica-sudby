import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/seo";
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
  metadataBase: new URL(SITE.url),
  title: {
    default: "Калькулятор матрицы судьбы по дате рождения — бесплатно онлайн",
    template: "%s | Калькулятор матрицы",
  },
  description: SITE.description,
  keywords: [
    "калькулятор матрицы судьбы",
    "матрица судьбы рассчитать",
    "матрица судьбы по дате рождения",
    "матрица судьбы онлайн бесплатно",
    "расчёт матрицы судьбы",
    "22 аркана",
    "нумерология по дате рождения",
    "матрица судьбы калькулятор",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Калькулятор матрицы судьбы — бесплатный расчёт онлайн",
    description: SITE.description,
    locale: SITE.locale,
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Калькулятор матрицы судьбы по дате рождения",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  category: "lifestyle",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <JsonLd />
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
