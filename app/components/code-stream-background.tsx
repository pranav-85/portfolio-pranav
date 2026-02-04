"use client";

import { useEffect, useMemo, useRef } from "react";

type CodeStreamBackgroundProps = {
  /**
   * Overall intensity multiplier. Keep this low for “barely noticeable”.
   * - Increase to make it more visible: 1.0 → 1.3
   * - Decrease to make it more subtle: 1.0 → 0.7
   */
  intensity?: number;
  /**
   * Optional additional className for the canvas (e.g., more blur).
   * Canvas is always absolute, pointer-events-none, and behind content.
   */
  className?: string;
};

type Glyph = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  charIndex: number;
};

const GLYPHS = ["<", ">", "/", "{", "}", ";", "=", "_", "|", "(", ")", "[", "]"] as const;

function usePrefersReducedMotion() {
  const reducedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;

    const update = () => {
      reducedRef.current = Boolean(mql.matches);
    };

    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  return reducedRef;
}

export function CodeStreamBackground({ intensity = 1, className }: CodeStreamBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const prefersReducedMotionRef = usePrefersReducedMotion();

  // Stable seed for glyph selection without pulling in an RNG lib.
  const glyphChars = useMemo(() => GLYPHS.slice(), []);
  console.log("CodeStreamBackground mounted");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Subtle density: keep whitespace. Feel free to tweak via `intensity`.
    const glyphs: Glyph[] = [];
    const baseCount = Math.round(18 * intensity); // ~18 on desktop looks calm; keep low.

    const ink = "oklch(0.88 0.04 255)";


    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      dpr = Math.min(2, window.devicePixelRatio || 1); // cap for perf
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Re-seed glyphs to fit new bounds (still sparse).
      glyphs.length = 0;
      const count = baseCount + Math.round((width * height) / 160_000); // mild scale with area
      const baseSize = Math.max(20, Math.min(28, width / 80));
      for (let i = 0; i < count; i++) {
        glyphs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Slow drift: diagonal + gentle vertical bias (no “rain” effect).
          vx: (Math.random() * 0.12 + 0.02) * (Math.random() < 0.5 ? -1 : 1),
          vy: Math.random() * 0.12 + 0.01,
          size: Math.random() * 10 + baseSize,
          alpha: (Math.random() * 0.10 + 0.08) * intensity,
          charIndex: Math.floor(Math.random() * glyphChars.length),
        });
      }
    };

    const draw = () => {
      // Respect accessibility: freeze animation if user prefers reduced motion.
      if (prefersReducedMotionRef.current) {
        // Draw a single static frame (very faint) and stop.
        ctx.clearRect(0, 0, width, height);
        for (const g of glyphs) {
          ctx.globalAlpha = g.alpha;
          ctx.font = `${g.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
          // Muted foreground at low opacity. No neon.
          ctx.fillStyle = ink; 
          ctx.fillText(glyphChars[g.charIndex] ?? "<", g.x, g.y);
        }
        ctx.globalAlpha = 1;
        rafRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (const g of glyphs) {
        g.x += g.vx;
        g.y += g.vy;

        // Wrap with lots of whitespace.
        if (g.y > height + 24) {
          g.y = -24;
          g.x = Math.random() * width;
          g.charIndex = Math.floor(Math.random() * glyphChars.length);
        }
        if (g.x < -24) g.x = width + 24;
        if (g.x > width + 24) g.x = -24;

        // Slight per-frame char drift (kept rare to avoid noise).
        if (Math.random() < 0.003 * intensity) {
          g.charIndex = Math.floor(Math.random() * glyphChars.length);
        }

        ctx.globalAlpha = g.alpha;
        ctx.font = `${g.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
        // A muted “terminal” ink — subtle and recruiter-friendly.
        ctx.fillStyle = ink;
        ctx.fillText(glyphChars[g.charIndex] ?? "<", g.x, g.y);
      }

      ctx.globalAlpha = 1;
      rafRef.current = window.requestAnimationFrame(draw);
    };

    

    resize();
    window.addEventListener("resize", resize, { passive: true });
    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [glyphChars, intensity, prefersReducedMotionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 z-0",
        // Extremely subtle softening; adjust here if you want more/less blur.
        "opacity-70 blur-[0.75px]",
        className,
      ].join(" ")}
    />
      
  );
}

