"use client";

/* =========================================================================
   Header
   - Spray-painted nav buttons (top right)
   - Scroll progress bar (top of screen)
   - Spray-paint cursor (canvas over the page, mouse only)
   - Bottom-right buttons: spray cursor on/off + FR/EN
   - Also creates the brick wall / grain textures used by every section.
   ========================================================================= */

import { CSSProperties, useEffect, useRef, useState } from "react";
import { applyTextures, COLORS, cssVars, random, round1, usePrefersReducedMotion } from "../lib/graffiti";
import { useLanguage } from "../lib/i18n";

const NAV_LINKS = [
  { href: "#about", textKey: "nav.about", tone: "black" },
  { href: "#volunteer", textKey: "nav.volunteer", tone: "black" },
  { href: "#team", textKey: "nav.team", tone: "black" },
  { href: "#faq", textKey: "nav.faq", tone: "black" },
] as const;

const SPRAY_COLORS = [COLORS.pink, COLORS.teal, COLORS.yellow, COLORS.orange, COLORS.purple];

/* ---------- One spray-painted nav button (drips get longer on hover) ---------- */

function NavBlob({ href, label, tone }: { href: string; label: string; tone: "black" | "white" }) {
  const [drips, setDrips] = useState<CSSProperties[]>([]);

  useEffect(() => {
    setDrips(
      [0, 1].map(() => ({
        left: `${round1(random(15, 80))}%`,
        ...cssVars({ "--h": `${round1(random(18, 42))}px` }),
      }))
    );
  }, []);

  return (
    <a href={href} className={`blob blob-${tone}`}>
      {label}
      {drips.map((style, index) => (
        <span key={index} className="bd" style={style} />
      ))}
    </a>
  );
}

/* ---------- Cursor spray effect icon (pointer cursor + graffiti spray dots) ---------- */

function CursorSprayIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-spray-icon"
      aria-hidden="true"
    >
      {/* Pointer Cursor */}
      <path
        d="M4 3L4 17.5L8.2 13.6L11.2 20.2L13.8 19L10.8 12.5L16.2 12.5L4 3Z"
        fill="#FFFFFF"
        stroke="#161616"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {active ? (
        <g className="spray-dots">
          {/* Colorful spray splatter dots matching the site's graffiti palette */}
          <circle cx="18.5" cy="5" r="2.2" fill="#FF5FC1" />
          <circle cx="21" cy="9.5" r="1.5" fill="#0F9BB4" />
          <circle cx="14.5" cy="7.5" r="1.2" fill="#FFDF5E" />
          <circle cx="21" cy="3.5" r="1.1" fill="#FF8A1F" />
          <circle cx="17.5" cy="12" r="1.2" fill="#8B3DFF" />
          <circle cx="13" cy="3.8" r="0.8" fill="#FF5FC1" />
          <circle cx="18" cy="1.8" r="0.9" fill="#0F9BB4" />
          {/* Sparkle accent */}
          <path
            d="M18.5 1.2C18.5 2.2 17.8 2.9 17 3.2C17.8 3.5 18.5 4.2 18.5 5.2C18.5 4.2 19.2 3.5 20 3.2C19.2 2.9 18.5 2.2 18.5 1.2Z"
            fill="#FFDF5E"
          />
        </g>
      ) : (
        <g className="spray-dots-off">
          {/* Inactive state: muted dashed circles with an off slash */}
          <circle cx="18" cy="5" r="2" stroke="#888888" strokeWidth="1" strokeDasharray="1.5 1.5" fill="none" opacity="0.6" />
          <circle cx="20.5" cy="9.5" r="1.3" stroke="#888888" strokeWidth="1" strokeDasharray="1.5 1.5" fill="none" opacity="0.6" />
          <line x1="14" y1="2" x2="22" y2="12" stroke="#FF5FC1" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

/* ---------- Header ---------- */

export default function Header() {
  const { t, language, toggleLanguage } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  const progressRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [sprayAvailable, setSprayAvailable] = useState(false);
  const [sprayOn, setSprayOn] = useState(true);
  const sprayOnRef = useRef(true); // read inside the mouse listeners
  sprayOnRef.current = sprayOn;

  // Brick wall + grain backgrounds.
  useEffect(() => {
    applyTextures();
  }, []);

  // Scroll progress bar (0 at the top of the page, 1 at the bottom).
  useEffect(() => {
    let queued = false;

    const update = () => {
      queued = false;
      const scrollable = document.documentElement.scrollHeight - innerHeight;
      const progress = scrollable > 0 ? scrollY / scrollable : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update); // at most once per frame
    };

    addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // Spray-paint cursor: moving sprays a light trail, clicking sprays a burst.
  useEffect(() => {
    const canvas = canvasRef.current;
    const hasMouse = matchMedia("(pointer: fine)").matches;
    if (!canvas || reducedMotion || !hasMouse) return;

    setSprayAvailable(true);
    const context = canvas.getContext("2d")!;

    type Particle = { x: number; y: number; radius: number; life: number; fadeSpeed: number; color: string; fallSpeed: number };
    let particles: Particle[] = [];
    let isAnimating = false;
    let colorIndex = 0;

    const resizeCanvas = () => {
      const pixelRatio = devicePixelRatio || 1;
      canvas.width = innerWidth * pixelRatio;
      canvas.height = innerHeight * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawFrame = () => {
      context.clearRect(0, 0, innerWidth, innerHeight);

      for (const p of particles) {
        p.life -= p.fadeSpeed;
        p.y += p.fallSpeed;
        context.globalAlpha = Math.max(p.life, 0);
        context.fillStyle = p.color;
        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fill();
      }

      particles = particles.filter((p) => p.life > 0);

      if (particles.length > 0) {
        requestAnimationFrame(drawFrame);
      } else {
        isAnimating = false;
        context.clearRect(0, 0, innerWidth, innerHeight);
      }
    };

    const spray = (x: number, y: number, count: number, spread: number, isBurst: boolean) => {
      for (let i = 0; i < count; i++) {
        const angle = random(0, Math.PI * 2);
        // Adding 3 random numbers keeps most dots near the center, like a real spray can.
        const distance = Math.abs(Math.random() + Math.random() + Math.random() - 1.5) * spread;
        particles.push({
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          radius: random(0.6, isBurst ? 4.2 : 2),
          life: 1,
          fadeSpeed: random(0.012, 0.03),
          color: SPRAY_COLORS[colorIndex],
          fallSpeed: isBurst ? random(0, 0.6) : 0,
        });
      }
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(drawFrame);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (sprayOnRef.current && event.pointerType === "mouse") spray(event.clientX, event.clientY, 5, 14, false);
    };

    const onDown = (event: PointerEvent) => {
      if (!sprayOnRef.current || event.pointerType !== "mouse") return;
      colorIndex = (colorIndex + 1) % SPRAY_COLORS.length;
      spray(event.clientX, event.clientY, 80, 40, true);
    };

    resizeCanvas();
    addEventListener("resize", resizeCanvas);
    addEventListener("pointermove", onMove);
    addEventListener("pointerdown", onDown);

    return () => {
      removeEventListener("resize", resizeCanvas);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerdown", onDown);
    };
  }, [reducedMotion]);

  return (
    <>
      {/* SVG filters used by the CSS: #rough = hand-painted edges, #brush = brush strokes */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves={3} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={12} />
        </filter>
        <filter id="brush" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".02 .12" numOctaves={3} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={45} />
        </filter>
      </svg>

      <div className="progress" ref={progressRef} aria-hidden="true" />
      <canvas id="spray" ref={canvasRef} aria-hidden="true" />

      <header className="site-header">
        <nav className="nav" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavBlob key={link.href} href={link.href} label={t(link.textKey)} tone={link.tone} />
          ))}
        </nav>
      </header>

      <div className="dock">
        {sprayAvailable && (
          <button
            className="chip"
            aria-pressed={sprayOn}
            title={sprayOn ? t("dock.spray.disable") : t("dock.spray.enable")}
            aria-label={sprayOn ? t("dock.spray.disable") : t("dock.spray.enable")}
            onClick={() => setSprayOn((on) => !on)}
          >
            <CursorSprayIcon active={sprayOn} />
          </button>
        )}
        <button className="chip" onClick={toggleLanguage}>
          {language === "en" ? "FR" : "EN"}
        </button>
      </div>
    </>
  );
}
