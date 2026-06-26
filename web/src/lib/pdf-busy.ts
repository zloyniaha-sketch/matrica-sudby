type Listener = (busy: boolean) => void;

const listeners = new Set<Listener>();

export function setPdfExportBusy(busy: boolean): void {
  listeners.forEach((fn) => fn(busy));
  document.documentElement.classList.toggle("pdf-export-busy", busy);
}

export function onPdfExportBusy(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
