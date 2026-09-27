"use client";

/* =========================================================================
   AboutUs
   Crumpled paper, black tape, a giant "?" that turns as you scroll,
   doodles, and three question cards that fly in from the sides.
   ========================================================================= */

import { useEffect, useRef } from "react";
import { Doodle, Reveal, RevealAnimation, round1, Splats, SplatSpec, useInView, usePrefersReducedMotion } from "../lib/graffiti";
import { useLanguage } from "../lib/i18n";
import SectionTitle from "./SectionTitle";

const ABOUT_SPLATS: SplatSpec[] = [
  ["purple", 5, 14, 280],
  ["pink", 92, 86, 380],
  ["pink", 3, 96, 230],
];

const QUESTIONS: { question: string; answer: string; anim: RevealAnimation; delay: number }[] = [
  { question: "about.q1", answer: "about.a1", anim: "left", delay: 0 },
  { question: "about.q2", answer: "about.a2", anim: "right", delay: 0.15 },
  { question: "about.q3", answer: "about.a3", anim: "left", delay: 0.3 },
];

export default function AboutUs() {
  const { t } = useLanguage();
  const { ref: sectionRef, inView } = useInView<HTMLElement>();
  const questionMarkRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // The giant "?" rotates and grows a bit while the section scrolls past.
  useEffect(() => {
    if (reducedMotion) return;

    const update = () => {
      const section = sectionRef.current;
      const mark = questionMarkRef.current;
      if (!section || !mark) return;

      const box = section.getBoundingClientRect();
      const progress = (innerHeight - box.top) / (innerHeight + box.height); // 0 → 1
      mark.style.transform = `rotate(${round1((progress - 0.5) * 28)}deg) scale(${round1(0.9 + progress * 0.18)})`;
    };

    addEventListener("scroll", update, { passive: true });
    update();
    return () => removeEventListener("scroll", update);
  }, [reducedMotion, sectionRef]);

  return (
    <section ref={sectionRef} id="about" className={`about paper ${inView ? "in" : ""}`}>
      <Splats splats={ABOUT_SPLATS} />
      <div className="tape" />
      <div className="qmark" ref={questionMarkRef} aria-hidden="true">
        ?
      </div>

      <Doodle shape="star" strokeWidth={7} style={{ left: "6%", top: "52%", width: 120 }} />
      <Doodle shape="star" strokeWidth={8} delay={0.3} style={{ left: "18%", top: "68%", width: 70 }} />
      <Doodle shape="triangle" color="#ff5fc1" delay={0.5} style={{ left: "42%", top: "50%", width: 90 }} />
      <Doodle shape="crown" color="#ffdf5e" strokeWidth={7} delay={0.7} style={{ left: "47%", top: "70%", width: 120 }} />

      <SectionTitle variant="graffiti" title={t("about.title")} />

      <div className="about-grid">
        {QUESTIONS.map((item) => (
          <Reveal key={item.question} anim={item.anim} delay={item.delay} className="qcard">
            <h3>{t(item.question)}</h3>
            <p>{t(item.answer)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
