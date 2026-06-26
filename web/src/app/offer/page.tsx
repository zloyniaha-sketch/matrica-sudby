import Link from "next/link";
import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { LEGAL } from "@/lib/site-legal";

export const metadata: Metadata = {
  title: "Публичная оферта",
  robots: { index: true, follow: true },
};

export default function OfferPage() {
  const seller = LEGAL.sellerInn
    ? `${LEGAL.sellerLabel}, ИНН ${LEGAL.sellerInn}, плательщик налога на профессиональный доход`
    : `${LEGAL.sellerLabel}, плательщик налога на профессиональный доход`;
  const email = LEGAL.contactEmail || "указан на странице оплаты";

  return (
    <LegalLayout title="Публичная оферта">
      <p>
        Настоящий документ является официальным предложением (офертой) {seller} (далее — Исполнитель)
        заключить договор на оказание услуг на условиях ниже.
      </p>

      <h2 className="font-display text-lg font-bold text-mystic-900">1. Предмет</h2>
      <p>
        Исполнитель предоставляет Заказчику доступ к расширенной цифровой расшифровке матрицы
        (текстовые материалы на Сайте и PDF-отчёт) за {LEGAL.priceRub} ₽. Базовый расчёт на Сайте
        предоставляется бесплатно.
      </p>

      <h2 className="font-display text-lg font-bold text-mystic-900">2. Акцепт оферты</h2>
      <p>
        Акцептом считается оплата услуги на Сайте и/или проставление согласия с условиями оферты
        и политикой конфиденциальности перед оплатой.
      </p>

      <h2 className="font-display text-lg font-bold text-mystic-900">3. Стоимость и оплата</h2>
      <p>
        Стоимость услуги — {LEGAL.priceRub} ₽. Оплата через платёжный сервис ЮKassa. Чек формируется
        в соответствии с законодательством РФ. Исполнитель применяет специальный налоговый режим
        «Налог на профессиональный доход» (самозанятость).
      </p>

      <h2 className="font-display text-lg font-bold text-mystic-900">4. Оказание услуги</h2>
      <p>
        После успешной оплаты Заказчик получает доступ к платным разделам и возможность скачать
        PDF-отчёт. Услуга считается оказанной с момента предоставления доступа к цифровому контенту.
      </p>

      <h2 className="font-display text-lg font-bold text-mystic-900">5. Возврат</h2>
      <p>
        Услуга носит информационно-развлекательный характер. Цифровой контент предоставляется
        немедленно после оплаты. Возврат возможен, если доступ не был предоставлен по технической
        вине Исполнителя. Претензии направляются на {email} в течение 7 дней.
      </p>

      <h2 className="font-display text-lg font-bold text-mystic-900">6. Ограничение ответственности</h2>
      <p>
        Материалы Сайта не являются медицинской, юридической, финансовой или иной профессиональной
        консультацией. Исполнитель не гарантирует конкретных жизненных результатов.
      </p>

      <h2 className="font-display text-lg font-bold text-mystic-900">7. Персональные данные</h2>
      <p>
        Обработка данных описана в{" "}
        <Link href="/privacy/" className="text-mystic-600 underline">
          политике конфиденциальности
        </Link>
        .
      </p>

      <p className="text-xs text-mystic-600">Дата публикации: {new Date().toLocaleDateString("ru-RU")}</p>
    </LegalLayout>
  );
}
