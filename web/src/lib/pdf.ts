import { setPdfExportBusy } from "@/lib/pdf-busy";

export function pdfFilename(birthDate: string): string {
  return `matrica-sudby-${birthDate.replace(/\./g, "-")}.pdf`;
}

const PAGE_WIDTH_PX = 794;
const SECTION_GAP_MM = 2;

const CANVAS_OPTS = {
  scale: 1.5,
  useCORS: true,
  logging: false,
  backgroundColor: "#ffffff",
  width: PAGE_WIDTH_PX,
  windowWidth: PAGE_WIDTH_PX,
  scrollX: 0,
  scrollY: 0,
} as const;

function lockPageScroll(): () => void {
  const scrollY = window.scrollY;
  const html = document.documentElement;
  const body = document.body;
  const prevHtmlOverflow = html.style.overflow;
  const prevBodyOverflow = body.style.overflow;
  const prevBodyPosition = body.style.position;
  const prevBodyTop = body.style.top;
  const prevBodyWidth = body.style.width;

  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";

  return () => {
    html.style.overflow = prevHtmlOverflow;
    body.style.overflow = prevBodyOverflow;
    body.style.position = prevBodyPosition;
    body.style.top = prevBodyTop;
    body.style.width = prevBodyWidth;
    window.scrollTo(0, scrollY);
  };
}

/** Клон для html2canvas — fixed, не влияет на scroll */
function prepareCaptureRoot(element: HTMLElement): { root: HTMLElement; cleanup: () => void } {
  const root = element.cloneNode(true) as HTMLElement;
  root.style.position = "fixed";
  root.style.left = "0";
  root.style.top = "0";
  root.style.width = `${PAGE_WIDTH_PX}px`;
  root.style.maxWidth = `${PAGE_WIDTH_PX}px`;
  root.style.height = "auto";
  root.style.minHeight = "0";
  root.style.overflow = "visible";
  root.style.transform = "translateX(-200vw)";
  root.style.zIndex = "-1";
  root.style.opacity = "1";
  root.style.visibility = "visible";
  root.style.pointerEvents = "none";
  root.style.background = "#ffffff";
  document.body.appendChild(root);
  return {
    root,
    cleanup: () => {
      document.body.removeChild(root);
    },
  };
}

/** Экспорт HTML-элемента в многостраничный PDF */
export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const unlockScroll = lockPageScroll();
  const { root, cleanup } = prepareCaptureRoot(element);

  setPdfExportBusy(true);
  try {
    await document.fonts.ready;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - margin * 2;
    const maxPageHeight = pageHeight - margin * 2;

    const sections = root.querySelectorAll<HTMLElement>("[data-pdf-page]");
    const targets = sections.length > 0 ? Array.from(sections) : [root];

    let pageY = margin;
    let pageOpen = false;

    function startNewPage() {
      if (pageOpen) pdf.addPage();
      pageY = margin;
      pageOpen = true;
    }

    for (const section of targets) {
      const canvas = await html2canvas(section, {
        ...CANVAS_OPTS,
        height: section.scrollHeight,
        windowHeight: section.scrollHeight,
      });

      if (canvas.width === 0 || canvas.height === 0) continue;

      const imgWidth = contentWidth;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/jpeg", 0.92);

      if (imgHeight > maxPageHeight) {
        if (pageOpen && pageY > margin) startNewPage();
        else if (!pageOpen) startNewPage();

        const scale = maxPageHeight / imgHeight;
        const fitW = imgWidth * scale;
        const x = margin + (contentWidth - fitW) / 2;
        pdf.addImage(imgData, "JPEG", x, margin, fitW, maxPageHeight);
        startNewPage();
        continue;
      }

      const gap = pageY > margin ? SECTION_GAP_MM : 0;
      if (!pageOpen || pageY + gap + imgHeight > margin + maxPageHeight) {
        startNewPage();
      } else if (gap > 0) {
        pageY += gap;
      }

      pdf.addImage(imgData, "JPEG", margin, pageY, imgWidth, imgHeight);
      pageY += imgHeight;
    }

    pdf.save(filename);
  } finally {
    cleanup();
    setPdfExportBusy(false);
    unlockScroll();
  }
}
