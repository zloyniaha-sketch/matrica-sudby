import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-mystic-200/50 bg-white/40 px-4 py-8 text-center text-sm text-mystic-700/70 backdrop-blur-sm">
      <p>
        © {new Date().getFullYear()} · Калькулятор матрицы · Не является медицинской или финансовой консультацией
      </p>
      <nav className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
        <Link href="/privacy/" className="text-mystic-600 underline hover:text-mystic-800">
          Политика конфиденциальности
        </Link>
        <Link href="/offer/" className="text-mystic-600 underline hover:text-mystic-800">
          Публичная оферта
        </Link>
      </nav>
      <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-mystic-600/80">
        Дата рождения для расчёта обрабатывается в браузере. Аналитика (Яндекс.Метрика) подключается только
        после вашего согласия в баннере cookie.
      </p>
    </footer>
  );
}
