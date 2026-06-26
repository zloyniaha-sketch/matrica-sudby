import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf7ff]">
      <header className="border-b border-mystic-200/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/" className="font-display text-lg font-bold text-mystic-950 hover:text-mystic-700">
            ← Калькулятор матрицы
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-mystic-950">{title}</h1>
        <article className="prose-legal mt-8 space-y-4 text-sm leading-relaxed text-mystic-900/90">
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
