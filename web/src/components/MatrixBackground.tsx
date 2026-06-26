"use client";

import { useEffect, useRef } from "react";
import { onPdfExportBusy } from "@/lib/pdf-busy";

const CX = 200;
const CY = 200;
const R_OUT = 165;
const R_IN = 95;

const OCT = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4 - Math.PI / 2;
  return { x: CX + R_OUT * Math.cos(a), y: CY + R_OUT * Math.sin(a) };
});

const INNER = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4 - Math.PI / 2 + Math.PI / 8;
  return { x: CX + R_IN * Math.cos(a), y: CY + R_IN * Math.sin(a) };
});

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    return onPdfExportBusy((busy) => {
      pausedRef.current = busy;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let t = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function drawPoly(
      pts: { x: number; y: number }[],
      stroke: string,
      width: number,
      rotation: number,
    ) {
      ctx!.save();
      ctx!.translate(CX, CY);
      ctx!.rotate(rotation);
      ctx!.translate(-CX, -CY);
      ctx!.beginPath();
      pts.forEach((p, i) => (i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y)));
      ctx!.closePath();
      ctx!.strokeStyle = stroke;
      ctx!.lineWidth = width;
      ctx!.stroke();
      ctx!.restore();
    }

    function draw() {
      if (!ctx || !canvas) return;

      if (pausedRef.current) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const scale = Math.min(w, h) / 480;
      const ox = w / 2;
      const oy = h / 2;
      const rot = reduced ? 0 : t * 0.0008;
      const pulse = reduced ? 1 : 0.97 + Math.sin(t * 0.012) * 0.03;
      const alpha = 0.28;

      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(scale * pulse, scale * pulse);
      ctx.translate(-CX, -CY);

      for (let a = 0; a < 8; a++) {
        const b = (a + 2) % 8;
        const lineAlpha = alpha * (0.7 + Math.sin(t * 0.015 + a) * 0.15);
        ctx.beginPath();
        ctx.moveTo(OCT[a].x, OCT[a].y);
        ctx.lineTo(OCT[b].x, OCT[b].y);
        ctx.strokeStyle = `rgba(133, 57, 245, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let a = 0; a < 8; a += 2) {
        const b = (a + 4) % 8;
        ctx.beginPath();
        ctx.moveTo(OCT[a].x, OCT[a].y);
        ctx.lineTo(OCT[b].x, OCT[b].y);
        ctx.strokeStyle = `rgba(155, 92, 255, ${alpha * 0.45})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      OCT.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(181, 138, 255, ${alpha * 0.35})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      drawPoly(OCT, `rgba(133, 57, 245, ${alpha * 0.55})`, 1.4, rot);
      drawPoly(INNER, `rgba(181, 138, 255, ${alpha * 0.4})`, 1, -rot * 0.5);

      OCT.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(133, 57, 245, ${alpha * 0.7})`;
        ctx.fill();
      });

      ctx.beginPath();
      ctx.arc(CX, CY, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(133, 57, 245, ${alpha * 0.65})`;
      ctx.fill();

      ctx.restore();
      t++;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
