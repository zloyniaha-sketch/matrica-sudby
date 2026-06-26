import { MatrixCalculator } from "@/components/MatrixCalculator";
import { MatrixBackground } from "@/components/MatrixBackground";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <MatrixBackground />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-mystic-gradient opacity-45" aria-hidden />
      <div className="relative z-10">
        <header className="border-b border-white/40 bg-white/30 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <div className="font-display text-xl font-bold text-mystic-950">
              ✦ Матрица Судьбы
            </div>
            <nav className="hidden gap-6 text-sm text-mystic-800 md:flex">
              <a href="#calc" className="hover:text-mystic-600">
                Калькулятор
              </a>
              <a href="#about" className="hover:text-mystic-600">
                О методе
              </a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <section className="mb-12 text-center md:mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-mystic-600">
              Нумерология · 22 аркана Таро
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-mystic-950 md:text-5xl">
              Рассчитай матрицу судьбы
              <span className="block text-mystic-600">по дате рождения</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-mystic-900/75">
              Узнай энергии личности, предназначение, линии любви и денег. Бесплатный расчёт за
              несколько секунд.
            </p>
          </section>

          <section id="calc">
            <MatrixCalculator />
          </section>

          <section id="about" className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Что это",
                text: "Матрица судьбы — система самопознания по дате рождения. Числа приводятся к 22 арканам Старших Арканов Таро.",
              },
              {
                title: "Что покажет",
                text: "12 сфер жизни, 7 чакр, прогноз на 10 лет, совместимость пары, родовые программы и кармический хвост. Расчёт по классической схеме матрицы (22 аркана).",
              },
              {
                title: "Как пользоваться",
                text: "Введи дату рождения — только цифры, точки подставятся сами. Переключай вкладки после расчёта.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-mystic-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm"
              >
                <h2 className="font-display text-lg font-bold text-mystic-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-mystic-800/80">{item.text}</p>
              </article>
            ))}
          </section>
        </main>

        <footer className="mt-16 border-t border-mystic-200/50 bg-white/40 py-8 text-center text-sm text-mystic-700/70 backdrop-blur-sm">
          © {new Date().getFullYear()} · Матрица судьбы · Не является медицинской или финансовой консультацией
        </footer>
      </div>
    </div>
  );
}
