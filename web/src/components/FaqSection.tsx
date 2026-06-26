import { FAQ_ITEMS } from "@/lib/seo";

export function FaqSection() {
  return (
    <section id="faq" className="mt-20" aria-labelledby="faq-heading">
      <div className="text-center">
        <h2 id="faq-heading" className="font-display text-2xl font-bold text-mystic-950 md:text-3xl">
          Частые вопросы
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-mystic-800/75">
          Краткие ответы о расчёте матрицы по дате рождения
        </p>
      </div>
      <dl className="mt-8 space-y-4">
        {FAQ_ITEMS.map((item) => (
          <article
            key={item.question}
            className="rounded-2xl border border-mystic-200/60 bg-white/70 p-5 shadow-sm backdrop-blur-sm"
          >
            <dt className="font-display text-base font-bold text-mystic-900">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-mystic-800/85">{item.answer}</dd>
          </article>
        ))}
      </dl>
    </section>
  );
}
