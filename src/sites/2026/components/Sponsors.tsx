"use client";

/* =========================================================================
   Sponsors
   Sponsor logos as stickers slapped on the wall. They pop in one by one
   and wiggle on hover. Empty slots show "Your logo here".
   To add a sponsor: add a line to SPONSORS.
   ========================================================================= */

import { cssVars, Reveal, Splats, SplatSpec, useInView } from "../lib/graffiti";
import { useLanguage } from "../lib/i18n";
import CTAButton from "./CTAButton";
import SectionTitle from "./SectionTitle";

export type Sponsor = {
  name: string;
  url: string;
  logo?: string; // e.g. "/sponsors/acme.svg" (put the file in /public/sponsors)
};

// TODO: add your real sponsors here.
export const SPONSORS: Sponsor[] = [];

// Empty slots shown until the sponsor list is full.
const TOTAL_SLOTS = 6;

// TODO: add your sponsorship contact email.
const SPONSOR_CONTACT = "mailto:";

const SPONSOR_SPLATS: SplatSpec[] = [
  ["teal", 6, 20, 220],
  ["yellow", 94, 30, 200],
  ["pink", 50, 96, 260],
];

export default function Sponsors() {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>();

  const emptySlots = Math.max(0, TOTAL_SLOTS - SPONSORS.length);

  return (
    <section ref={ref} id="sponsors" className={`sponsors brick ${inView ? "in" : ""}`}>
      <Splats splats={SPONSOR_SPLATS} />

      <SectionTitle title={t("sponsors.t1")} highlight={t("sponsors.t2")} />
      <p className="sponsors-text">{t("sponsors.text")}</p>

      <div className="sponsor-grid">
        {SPONSORS.map((sponsor, index) => (
          <a
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener"
            className="sticker"
            style={cssVars({ "--i": index, "--tilt": `${((index * 41) % 12) - 6}deg` })}
          >
            {sponsor.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sponsor.logo} alt={sponsor.name} />
            ) : (
              <span className="sticker-name">{sponsor.name}</span>
            )}
          </a>
        ))}

        {Array.from({ length: emptySlots }, (_, index) => {
          const position = SPONSORS.length + index;
          return (
            <div
              key={`empty-${index}`}
              className="sticker empty"
              style={cssVars({ "--i": position, "--tilt": `${((position * 41) % 12) - 6}deg` })}
            >
              <span className="sticker-name">{t("sponsors.placeholder")}</span>
            </div>
          );
        })}
      </div>

      <Reveal anim="pop" delay={0.6} className="sponsors-cta">
        <CTAButton href={SPONSOR_CONTACT} variant="pill">
          {t("sponsors.cta")}
        </CTAButton>
      </Reveal>
    </section>
  );
}
