"use client";

/* =========================================================================
   Hero
   Brick wall, paint splats, the big spray-painted title, date, countdown,
   "Register now" sticky note, doodles, and the yellow scrolling ticker.
   ========================================================================= */

import { MouseEvent, PointerEvent, useRef } from "react";
import { cssVars, Doodle, round1, Splats, SplatSpec, usePrefersReducedMotion } from "../lib/graffiti";
import { useLanguage } from "../lib/i18n";
import Countdown from "./Countdown";
import CTAButton from "./CTAButton";
import DateDisplay from "./DateDisplay";

const HERO_SPLATS: SplatSpec[] = [
  ["teal", 42, 48, 300], ["pink", 32, 52, 240], ["yellow", 58, 50, 240],
  ["teal", 68, 46, 200], ["pink", 62, 54, 170], ["yellow", 37, 44, 170],
  ["white", 18, 4, 190], ["yellow", 3, 88, 170], ["pink", 97, 20, 130],
];

/* ---------- Title: each letter sprays in, then bounces on hover ---------- */

function GraffitiTitle({ text }: { text: string }) {
  const bounce = (event: MouseEvent<HTMLSpanElement>) => {
    const letter = event.currentTarget;
    if (!letter.classList.contains("done")) return;
    letter.classList.remove("boing");
    void letter.offsetWidth; // restart the animation
    letter.classList.add("boing");
  };

  return (
    <h1 className="title" aria-label={text}>
      {[...text].map((letter, index) => (
        <span
          key={index}
          className="ch"
          aria-hidden="true"
          // --i = delay between letters, --r = starting tilt (fixed pattern, not random)
          style={cssVars({ "--i": index, "--r": `${((index * 37) % 50) - 25}deg` })}
          onAnimationEnd={(event) => {
            event.currentTarget.classList.add("done");
            event.currentTarget.classList.remove("boing");
          }}
          onMouseEnter={bounce}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
}

/* ---------- Hero ---------- */

export default function Hero() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const splatLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Mouse parallax: splats move one way, the title the other way.
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const x = event.clientX / innerWidth - 0.5; // -0.5 to +0.5
    const y = event.clientY / innerHeight - 0.5;

    if (splatLayerRef.current) {
      splatLayerRef.current.style.transform = `translate(${round1(-x * 24)}px, ${round1(-y * 18)}px)`;
    }
    if (contentRef.current) {
      contentRef.current.style.transform = `translate(${round1(x * 10)}px, ${round1(y * 8)}px)`;
    }
  };

  const tickerText = t("ticker").repeat(4);

  return (
    <>
      {/* "in" is always on: the hero is visible as soon as the page loads */}
      <section className="hero brick in" id="top" onPointerMove={handlePointerMove}>
        <div className="hero-splats" ref={splatLayerRef}>
          <Splats splats={HERO_SPLATS} />
        </div>

        <div className="hero-center" ref={contentRef}>
          <GraffitiTitle text="HACKDÉCOUVERTE" />
          <DateDisplay />
          <Countdown />
          <CTAButton href="https://register.hackdecouverte.io/login">
            {t("hero.cta")}
          </CTAButton>
        </div>

        <Doodle shape="crown" delay={0.9} style={{ left: "12%", top: "30%", width: 110 }} />
        <Doodle shape="fan" delay={1.1} style={{ right: "10%", top: "28%", width: 120 }} />

        <a className="scroll-hint" href="#about" aria-label="Scroll to about">
          ▼
        </a>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="track">
          <span>{tickerText}</span>
          <span>{tickerText}</span>
        </div>
      </div>
    </>
  );
}
