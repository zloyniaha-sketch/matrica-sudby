import type { Metadata } from "next";
import { MatrixCalculator } from "@/components/MatrixCalculator";
import { MatrixBackground } from "@/components/MatrixBackground";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqSection } from "@/components/FaqSection";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Калькулятор матрицы судьбы по дате рождения — бесплатно онлайн",
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <MatrixBackground />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-mystic-gradient opacity-45" aria-hidden />
      <div className="relative z-10">
        <header className="border-b border-white/40 bg-white/30 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <div className="font-display text-xl font-bold text-mystic-950">
              ✦ Калькулятор матрицы
            </div>
            <nav className="hidden gap-6 text-sm text-mystic-800 md:flex" aria-label="Основное меню">
              <a href="#calc" className="hover:text-mystic-600">
                Калькулятор
              </a>
              <a href="#about" className="hover:text-mystic-600">
                О методе
              </a>
              <a href="#faq" className="hover:text-mystic-600">
                Вопросы
              </a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <section className="mb-12 text-center md:mb-16" aria-labelledby="hero-heading">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-mystic-600">
              Нумерология · 22 аркана Таро
            </p>
            <h1 id="hero-heading" className="mt-3 font-display text-4xl font-bold leading-tight text-mystic-950 md:text-5xl">
              Калькулятор матрицы судьбы
              <span className="block text-mystic-600">по дате рождения — бесплатно</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-mystic-900/75">
              Рассчитайте матрицу онлайн за несколько секунд: 22 аркана, схема, 12 сфер жизни,
              чакры, прогноз и совместимость пары. Время рождения не нужно.
            </p>
          </section>

          <section id="calc" aria-label="Калькулятор матрицы">
            <MatrixCalculator />
          </section>

          <section id="about" className="mt-20 grid gap-6 md:grid-cols-3" aria-labelledby="about-heading">
            <h2 id="about-heading" className="sr-only">
              О калькуляторе матрицы
            </h2>
            {[
              {
                title: "Что такое матрица судьбы",
                text: "Нумерологический калькулятор по дате рождения. Числа дня, месяца и года приводятся к 22 арканам Старших Арканов Таро и формируют персональную схему.",
              },
              {
                title: "Что покажет расчёт",
                text: "12 сфер жизни, 7 чакр, прогноз на 10 лет, совместимость пары, родовые программы и кармический хвост. Доступен PDF-отчёт с полной расшифровкой.",
              },
              {
                title: "Как пользоваться",
                text: "Введите дату рождения в формате ДД.ММ.ГГГГ — только цифры, точки подставятся сами. Нажмите «Рассчитать» и переключайте вкладки результата.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-mystic-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm"
              >
                <h3 className="font-display text-lg font-bold text-mystic-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mystic-800/80">{item.text}</p>
              </article>
            ))}
          </section>

          <FaqSection />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
