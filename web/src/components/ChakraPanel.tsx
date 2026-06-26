"use client";

import type { ChakraReport } from "@/lib/chakras";

interface ChakraPanelProps {
  chakras: ChakraReport[];
  premium: boolean;
  onUnlock: () => void;
}

export function ChakraPanel({ chakras, premium, onUnlock }: ChakraPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-mystic-950">Чакральная карта</h3>
        {!premium && (
          <button
            type="button"
            onClick={onUnlock}
            className="rounded-full bg-mystic-600 px-4 py-2 text-xs font-semibold text-white"
          >
            Разблокировать
          </button>
        )}
      </div>
      <p className="text-sm text-mystic-700/80">
        Энергии здоровья по телу, эмоциям и духу — с расшифровкой и рекомендациями.
      </p>

      <div className="space-y-3">
        {chakras.map((c) => (
          <div
            key={c.key}
            className="rounded-2xl border border-mystic-100 bg-white/90 p-4"
          >
            <div className="flex justify-between gap-2">
              <div>
                <p className="font-medium text-mystic-900">{c.name}</p>
                <p className="text-xs text-mystic-600">{c.top} · {c.zone}</p>
              </div>
              <span className="font-display text-lg font-bold text-mystic-700">
                {premium ? `${c.physics} / ${c.energy} / ${c.emotions}` : "•••"}
              </span>
            </div>

            {premium && (
              <>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-mystic-50 p-2">
                    <p className="text-mystic-500">Тело</p>
                    <p className="font-bold text-mystic-800">{c.physics}</p>
                  </div>
                  <div className="rounded-lg bg-mystic-50 p-2">
                    <p className="text-mystic-500">Энергия</p>
                    <p className="font-bold text-mystic-800">{c.energy}</p>
                  </div>
                  <div className="rounded-lg bg-mystic-50 p-2">
                    <p className="text-mystic-500">Эмоции</p>
                    <p className="font-bold text-mystic-800">{c.emotions}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5 text-sm text-mystic-800/90">
                  <p>{c.physicsText}</p>
                  <p>{c.energyText}</p>
                  <p>{c.emotionsText}</p>
                  <p className="rounded-lg bg-mystic-50 p-2 text-xs">
                    <span className="font-semibold text-mystic-700">Совет:</span> {c.advice}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
