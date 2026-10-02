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
      <div className="qmark" ref={questionMarkRef} aria-hidden="true">
        ?
      </div>

      <Doodle shape="star" strokeWidth={7} style={{ left: "5%", top: "35%", width: 110 }} />
      <Doodle shape="triangle" color="#ff5fc1" delay={0.3} style={{ left: "88%", top: "18%", width: 85 }} />
      <Doodle shape="crown" color="#ffdf5e" strokeWidth={7} delay={0.5} style={{ left: "4%", top: "72%", width: 110 }} />
      <Doodle shape="star" strokeWidth={8} delay={0.7} style={{ left: "90%", top: "65%", width: 75 }} />

      <SectionTitle variant="graffiti" title={t("about.title")} />

      <div className="about-grid">
        {/* Q1: What is a Hackathon? */}
        <Reveal anim="left" delay={0} className="qcard qcard-1">
          <h3>{t("about.q1")}</h3>
          <p>{t("about.a1")}</p>
        </Reveal>

        {/* Photo 1: Team Collaborating at Table */}
        <Reveal anim="right" delay={0.15} className="about-polaroid about-polaroid-1">
          <div className="polaroid-inner">
            <div className="polaroid-tape" aria-hidden="true" />
            <div className="polaroid-img-wrap">
              <img
                src="/images/about-hackers.jpg"
                alt={t("about.img.hackers")}
                loading="lazy"
              />
            </div>
            <span className="polaroid-caption">{t("about.caption.hackers")}</span>
          </div>
        </Reveal>

        {/* Photo 2: Students with Swag Bags */}
        <Reveal anim="left" delay={0.25} className="about-polaroid about-polaroid-2">
          <div className="polaroid-inner">
            <div className="polaroid-tape" aria-hidden="true" />
            <div className="polaroid-img-wrap">
              <img
                src="/images/about-swag.jpg"
                alt={t("about.img.swag")}
                loading="lazy"
              />
            </div>
            <span className="polaroid-caption">{t("about.caption.swag")}</span>
          </div>
        </Reveal>

        {/* Q2: What is HackDécouverte? */}
        <Reveal anim="right" delay={0.35} className="qcard qcard-2">
          <h3>{t("about.q2")}</h3>
          <p>{t("about.a2")}</p>
        </Reveal>

        {/* Q3: What is HackConcordia? */}
        <Reveal anim="pop" delay={0.45} className="qcard qcard-3">
          <h3>{t("about.q3")}</h3>
          <p>{t("about.a3")}</p>
        </Reveal>
      </div>
    </section>
  );
}
