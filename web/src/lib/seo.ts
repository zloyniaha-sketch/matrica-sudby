import { LEGAL } from "@/lib/site-legal";

export const SITE = {
  name: LEGAL.siteName,
  url: LEGAL.siteUrl.replace(/\/$/, ""),
  description:
    "Бесплатный онлайн-калькулятор матрицы по дате рождения: 22 аркана, схема, 12 сфер, чакры, прогноз и PDF-отчёт.",
  locale: "ru_RU",
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

/** Вопросы с прямыми ответами — для AEO (нейроответы, голосовой поиск, сниппеты) */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Что такое матрица судьбы?",
    answer:
      "Матрица судьбы — нумерологический метод самопознания по дате рождения. Числа дня, месяца и года приводятся к 22 арканам Старших Арканов Таро и раскладываются в схему с зонами личности, предназначения, любви, денег и кармы.",
  },
  {
    question: "Как рассчитать матрицу судьбы по дате рождения?",
    answer:
      "Введите дату рождения в формате ДД.ММ.ГГГГ в калькулятор на сайте и нажмите «Рассчитать». Программа автоматически построит схему матрицы и покажет значения арканов. Время рождения не требуется.",
  },
  {
    question: "Сколько арканов используется в матрице?",
    answer:
      "В классической матрице судьбы используется 22 аркана — от I Мага до XXII Шута. Все числа, превышающие 22, сводятся к диапазону 1–22.",
  },
  {
    question: "Бесплатно ли пользоваться калькулятором?",
    answer:
      "Да. Базовый расчёт матрицы, схема и основные расшифровки доступны бесплатно. Расширенный PDF-отчёт с 12 сферами, чакрами и прогнозом на 10 лет — платная опция.",
  },
  {
    question: "Нужно ли время рождения для расчёта?",
    answer:
      "Нет. Для построения матрицы судьбы достаточно только даты рождения. Время и место рождения в этом методе не используются.",
  },
  {
    question: "Что показывает калькулятор матрицы?",
    answer:
      "Калькулятор показывает схему матрицы, энергии личности и характера, предназначение, линии любви и денег, кармический хвост, 12 сфер жизни, 7 чакр, прогноз на 10 лет и совместимость пары.",
  },
  {
    question: "Передаётся ли дата рождения на сервер?",
    answer:
      "Нет. Расчёт выполняется в браузере на вашем устройстве. Дата рождения не отправляется на сервер сайта.",
  },
];

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function webAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RUB",
    },
    inLanguage: "ru",
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "ru-RU",
  };
}

export function howToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Как рассчитать матрицу судьбы по дате рождения",
    description: "Пошаговая инструкция расчёта матрицы в онлайн-калькуляторе",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Откройте калькулятор",
        text: "Перейдите на главную страницу калькулятора матрицы.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Введите дату рождения",
        text: "Укажите дату в формате ДД.ММ.ГГГГ — только цифры, точки подставятся автоматически.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Нажмите «Рассчитать»",
        text: "Получите схему матрицы и расшифровку арканов. Переключайте вкладки: сферы, чакры, прогноз, пара.",
      },
    ],
  };
}
