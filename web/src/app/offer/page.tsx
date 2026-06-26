import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { OfferContent } from "@/content/offer-content";

export const metadata: Metadata = {
  title: "Публичная оферта",
  description:
    "Договор возмездного оказания услуг на сайте «Калькулятор матрицы». Условия оплаты и оказания цифровой услуги.",
  alternates: { canonical: "/offer/" },
  robots: { index: true, follow: true },
};

export default function OfferPage() {
  return (
    <LegalLayout title="Публичная оферта" subtitle="Договор оказания информационных услуг">
      <OfferContent />
    </LegalLayout>
  );
}
