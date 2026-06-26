import { YM_COUNTER_ID } from "@/lib/site-legal";

type YmFn = ((id: number, method: string, ...args: unknown[]) => void) & {
  a?: unknown[];
  l?: number;
};

declare global {
  interface Window {
    ym?: YmFn;
  }
}

let loaded = false;

/** Подключение счётчика только после согласия пользователя */
export function initYandexMetrika(): void {
  if (typeof window === "undefined" || loaded || !YM_COUNTER_ID) return;

  const id = Number(YM_COUNTER_ID);
  if (!Number.isFinite(id) || id <= 0) return;

  loaded = true;

  if (!window.ym) {
    const stub: YmFn = (...args: unknown[]) => {
      stub.a = stub.a || [];
      stub.a.push(args);
    };
    stub.l = Date.now();
    window.ym = stub;
  }

  const src = "https://mc.yandex.ru/metrika/tag.js";
  if (![...document.scripts].some((s) => s.src === src)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  window.ym(id, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
  });
}
