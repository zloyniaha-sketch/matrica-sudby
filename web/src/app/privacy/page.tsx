import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { PrivacyContent } from "@/content/privacy-content";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика обработки персональных данных сайта «Калькулятор матрицы» в соответствии с 152-ФЗ.",
  alternates: { canonical: "/privacy/" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Политика конфиденциальности" subtitle="Обработка персональных данных (152-ФЗ)">
      <PrivacyContent />
    </LegalLayout>
  );
}
