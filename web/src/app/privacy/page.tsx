import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { LEGAL } from "@/lib/site-legal";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const seller = LEGAL.sellerInn
    ? `${LEGAL.sellerLabel}, ИНН ${LEGAL.sellerInn}`
    : LEGAL.sellerLabel;
  const email = LEGAL.contactEmail || "указан на странице оплаты";

  return (
    <LegalLayout title="Политика конфиденциальности">
      <p>
        Настоящая политика описывает порядок обработки данных на сайте «{LEGAL.siteName}» (далее — Сайт).
        Оператор: {seller}.
      </p>

      <h2 className="font-display text-lg font-bold text-mystic-900">1. Какие данные мы обрабатываем</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Дата рождения</strong> — для расчёта матрицы. Обрабатывается в браузере пользователя;
          на сервер Сайта не передаётся, если иное не указано отдельно.
        </li>
        <li>
          <strong>Данные localStorage</strong> — статус доступа к платному PDF (демо/после оплаты),
          сохраняется локально на устройстве.
        </li>
        <li>
          <strong>Email</strong> — при подключении оплаты может запрашиваться для отправки чека и PDF
          (если вы укажете email при оплате).
        </li>
        <li>
          <strong>Cookie и аналитика</strong> — при вашем согласии подключается Яндекс.Метрика
          (cookie, IP, данные о посещениях). Без согласия аналитика не загружается.
        </li>
        <li>
          <strong>Платёжные данные</strong> (номер карты и т.п.) обрабатываются платёжным сервисом
          ЮKassa (НКО «ЮMoney»). Сайт не получает и не хранит данные банковских карт.
        </li>
      </ul>

      <h2 className="font-display text-lg font-bold text-mystic-900">2. Цели обработки</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>расчёт и отображение матрицы;</li>
        <li>предоставление платного PDF-отчёта;</li>
        <li>приём оплаты и формирование чека;</li>
        <li>аналитика посещаемости и улучшение Сайта (при согласии на cookie).</li>
      </ul>

      <h2 className="font-display text-lg font-bold text-mystic-900">3. Передача третьим лицам</h2>
      <p>Данные могут передаваться:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>ЮKassa</strong> — для приёма оплаты и чека (email, сумма, идентификатор заказа);
        </li>
        <li>
          <strong>Яндекс</strong> — для аналитики (при вашем согласии на cookie);
        </li>
        <li>госорганам — по законному требованию.</li>
      </ul>
      <p>
        Дата рождения в платёжный сервис не передаётся.
      </p>

      <h2 className="font-display text-lg font-bold text-mystic-900">4. Срок хранения</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>localStorage — до очистки браузера пользователем;</li>
        <li>данные оплат — согласно требованиям законодательства и договора с ЮKassa;</li>
        <li>данные Метрики — согласно политике Яндекса.</li>
      </ul>

      <h2 className="font-display text-lg font-bold text-mystic-900">5. Ваши права</h2>
      <p>
        Вы вправе запросить уточнение, блокирование или удаление ваших данных, отозвать согласие
        на аналитику (очистив cookie и localStorage или отклонив cookie-баннер при следующем визите).
        Запрос: {email}.
      </p>

      <h2 className="font-display text-lg font-bold text-mystic-900">6. Уведомление Роскомnadzor</h2>
      <p>
        Оператор подаёт уведомление об обработке персональных данных в Роскомnadzor в случаях,
        предусмотренных 152-ФЗ (при сборе email, использовании аналитики и иных ПДн на сервере).
      </p>

      <p className="text-xs text-mystic-600">Дата публикации: {new Date().toLocaleDateString("ru-RU")}</p>
    </LegalLayout>
  );
}
