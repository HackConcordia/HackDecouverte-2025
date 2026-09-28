"use client";

/* =========================================================================
   Shared graffiti helpers used by all the components:
     - COLORS, random numbers, CSS variables
     - useInView (play an animation when something scrolls into view)
     - usePrefersReducedMotion
     - applyTextures (brick wall + grain backgrounds)
     - <Splats />, <Drips />, <Reveal />, <Doodle />
   ========================================================================= */

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

/* ---------- Colours ---------- */

export const COLORS = {
  pink: "#ff5fc1",
  teal: "#0f9bb4",
  yellow: "#ffdf5e",
  purple: "#8b3dff",
  orange: "#ff7a1a",
  white: "#ffffff",
  black: "#000000",
} as const;

export type ColorName = keyof typeof COLORS;

/* ---------- Small helpers ---------- */

const FULL_CIRCLE = Math.PI * 2;

/** Random decimal number between min and max. */
export const random = (min: number, max: number) => min + Math.random() * (max - min);

/** Round to 1 decimal (keeps generated SVG code short). */
export const round1 = (n: number) => n.toFixed(1);

/** Lets you pass CSS variables (like "--d") in a style prop. */
export const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;

/* ---------- Hooks ---------- */

/** True if the visitor asked their system to reduce animations. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return reduced;
}

/**
 * Becomes true (once) when the element scrolls into view.
 * Usage: const { ref, inView } = useInView<HTMLElement>();
 */
export function useInView<T extends Element>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // only animate the first time
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ---------- Background textures ---------- */

function createBrickWallSVG() {
  const brickColors = ["#8f4b37", "#9a553f", "#86432f", "#95503b", "#7e3f2d", "#a05a43", "#8a4733", "#93604b"];

  const WIDTH = 960;
  const HEIGHT = 480;
  const COLS = WIDTH / 80;
  const ROWS = HEIGHT / 30;

  // Light background = the mortar between bricks.
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}"><rect width="${WIDTH}" height="${HEIGHT}" fill="#cdb09a"/>`;

  for (let row = 0; row < ROWS; row++) {
    const rowOffset = row % 2 === 1 ? -40 : 0; // every other row is shifted half a brick

    for (let col = 0; col < COLS; col++) {
      const x = rowOffset + col * 80 + 2;
      const y = row * 30 + 2;
      const color = brickColors[Math.floor(Math.random() * brickColors.length)];
      const hasPatch = Math.random() < 0.35;
      const patch = `x="${random(4, 40)}" y="${random(2, 14)}" width="${random(10, 30)}" height="${random(4, 10)}"`;

      // A brick hanging off the left edge is drawn again on the right so the tile wraps seamlessly.
      const copies = x < 0 ? [x, x + WIDTH] : [x];
      for (const copyX of copies) {
        svg += `<g transform="translate(${copyX} ${y})"><rect width="76" height="26" rx="2" fill="${color}"/>`;
        // Some bricks get a faint light patch so the wall looks worn.
        if (hasPatch) svg += `<rect ${patch} fill="#fff" opacity=".07"/>`;
        svg += `</g>`;
      }
    }
  }

  return svg + `</svg>`;
}

function createGrainSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .28 0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`;
}

const svgToCssUrl = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

/** Creates the --brick-img and --noise CSS variables used by .brick, .paper, etc. */
export function applyTextures() {
  document.documentElement.style.setProperty("--brick-img", svgToCssUrl(createBrickWallSVG()));
  document.documentElement.style.setProperty("--noise", svgToCssUrl(createGrainSVG()));
}

/* ---------- Paint splats ---------- */

/** A random paint splat: blob + droplets + 1 to 3 drips. Returns SVG code. */
export function createSplatSVG(color: string) {
  const CENTER = 100; // the SVG is 200 x 200
  let shapes = "";

  // Main blob: points around a circle at random distances, joined with smooth curves.
  const pointCount = 18 + Math.floor(random(0, 8));
  const points: [number, number][] = [];

  for (let i = 0; i < pointCount; i++) {
    const angle = (i / pointCount) * FULL_CIRCLE + random(-0.1, 0.1);
    let distance = random(34, 50);
    if (Math.random() < 0.28) distance *= random(1.2, 1.6); // some points stick out like arms
    points.push([CENTER + Math.cos(angle) * distance, CENTER + Math.sin(angle) * distance]);
  }

  const midpoint = (a: [number, number], b: [number, number]): [number, number] => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ];
  const start = midpoint(points[pointCount - 1], points[0]);
  let path = `M${round1(start[0])} ${round1(start[1])}`;

  for (let i = 0; i < pointCount; i++) {
    const mid = midpoint(points[i], points[(i + 1) % pointCount]);
    path += ` Q${round1(points[i][0])} ${round1(points[i][1])} ${round1(mid[0])} ${round1(mid[1])}`;
  }
  shapes += `<path d="${path} Z"/>`;

  // Medium droplets close to the blob.
  for (let i = 0; i < 12; i++) {
    const angle = random(0, FULL_CIRCLE);
    const distance = random(52, 80);
    shapes += `<circle cx="${round1(CENTER + Math.cos(angle) * distance)}" cy="${round1(CENTER + Math.sin(angle) * distance)}" r="${round1(random(3, 9))}"/>`;
  }

  // Tiny specks further away.
  for (let i = 0; i < 24; i++) {
    const angle = random(0, FULL_CIRCLE);
    const distance = random(70, 100);
    shapes += `<circle cx="${round1(CENTER + Math.cos(angle) * distance)}" cy="${round1(CENTER + Math.sin(angle) * distance)}" r="${round1(random(0.8, 3.2))}"/>`;
  }

  // Drips running down (animated by the CSS class "d").
  const dripCount = Math.floor(random(1, 4));
  for (let i = 0; i < dripCount; i++) {
    const x = random(70, 130);
    const width = random(4, 8);
    const length = random(40, 100);
    const top = CENTER + 10;
    shapes += `<g class="d" style="--dd:${round1(random(0, 0.6))}s">
      <rect x="${round1(x - width / 2)}" y="${top}" width="${round1(width)}" height="${round1(length)}" rx="${round1(width / 2)}"/>
      <circle cx="${round1(x)}" cy="${round1(top + length)}" r="${round1(width * 0.75)}"/>
    </g>`;
  }

  return `<svg viewBox="0 0 200 200" aria-hidden="true"><g fill="${color}">${shapes}</g></svg>`;
}

/** [colour, x position %, y position %, size in px] */
export type SplatSpec = [ColorName, number, number, number];

/**
 * A layer of paint splats. They pop in when the parent section has the class "in".
 * The random shapes are created after the page loads (avoids server/client mismatch).
 */
export function Splats({
  splats,
  baseDelay = 0.1,
  step = 0.09,
}: {
  splats: SplatSpec[];
  baseDelay?: number;
  step?: number;
}) {
  const [items, setItems] = useState<{ svg: string; style: CSSProperties }[]>([]);

  useEffect(() => {
    setItems(
      splats.map(([colorName, x, y, size], index) => ({
        svg: createSplatSVG(COLORS[colorName]),
        style: {
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}px`,
          ...cssVars({
            "--rot": `${round1(random(0, 360))}deg`,
            "--d": `${round1(baseDelay + index * step)}s`,
          }),
        },
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="splats" aria-hidden="true">
      {items.map((item, index) => (
        <div key={index} className="splat" style={item.style} dangerouslySetInnerHTML={{ __html: item.svg }} />
      ))}
    </div>
  );
}

/* ---------- Paint drips ---------- */

type Range = [number, number];

/**
 * Drips of paint hanging down. Place inside an element with position: relative.
 * colorAt(leftPercent) lets the colour depend on where the drip is.
 */
export function Drips({
  count,
  colorAt,
  delay,
  length,
  width,
  spread = [4, 94],
}: {
  count: number;
  colorAt: (leftPercent: number) => string;
  delay: Range;
  length: Range;
  width: Range;
  spread?: Range;
}) {
  const [drips, setDrips] = useState<CSSProperties[]>([]);

  useEffect(() => {
    setDrips(
      Array.from({ length: count }, () => {
        const left = random(spread[0], spread[1]);
        return {
          left: `${round1(left)}%`,
          ...cssVars({
            "--w": `${round1(random(width[0], width[1]))}px`,
            "--h": `${round1(random(length[0], length[1]))}px`,
            "--d": `${round1(random(delay[0], delay[1]))}s`,
            "--c": colorAt(left),
          }),
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {drips.map((style, index) => (
        <span key={index} className="drip" style={style} aria-hidden="true" />
      ))}
    </>
  );
}

/* ---------- Reveal on scroll ---------- */

export type RevealAnimation = "left" | "right" | "pop" | "up";

/** Wraps content that slides / pops in when it scrolls into view. */
export function Reveal({
  anim = "up",
  delay = 0,
  className = "",
  children,
}: {
  anim?: RevealAnimation;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      data-anim={anim}
      style={cssVars({ "--rd": `${delay}s` })}
    >
      {children}
    </div>
  );
}

/* ---------- Hand-drawn doodles ---------- */

const DOODLES = {
  crown: { viewBox: "0 0 120 80", d: "M12 64 L6 20 L32 44 L48 8 L64 44 L90 16 L104 64 M8 72 C30 62 88 62 112 72" },
  fan: { viewBox: "0 0 100 100", d: "M10 90 L90 10 M10 90 L95 45 M10 90 L60 5 M60 5 L95 45 L90 10" },
  star: { viewBox: "0 0 100 100", d: "M50 5 L62 40 L98 40 L68 62 L80 96 L50 74 L20 96 L32 62 L2 40 L38 40 Z" },
  triangle: { viewBox: "0 0 100 100", d: "M10 10 L90 50 L10 90 Z M10 30 L70 50 L10 70" },
} as const;

/**
 * A doodle that "draws itself" when its section gets the class "in".
 * pathLength={1} lets the CSS animate any shape without measuring it.
 */
export function Doodle({
  shape,
  color = "#000",
  strokeWidth = 6,
  delay = 0,
  style,
}: {
  shape: keyof typeof DOODLES;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  style?: CSSProperties;
}) {
  const doodle = DOODLES[shape];

  return (
    <svg className="doodle" viewBox={doodle.viewBox} style={style} aria-hidden="true">
      <path
        d={doodle.d}
        stroke={color}
        strokeWidth={strokeWidth}
        pathLength={1}
        style={cssVars({ "--len": 1, "--dl": `${delay}s` })}
      />
    </svg>
  );
}
