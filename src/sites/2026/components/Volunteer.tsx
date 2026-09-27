"use client";

/* =========================================================================
   Volunteer ("Join the team behind the scenes")
   A teal + pink X gets brushed on, then a paint roller paints the yellow
   banner, then the scribbled links draw their underlines.
   ========================================================================= */

import { Splats, SplatSpec, useInView } from "../lib/graffiti";
import { Lines, useLanguage } from "../lib/i18n";

const VOLUNTEER_SPLATS: SplatSpec[] = [
  ["yellow", 3, 92, 230],
  ["teal", 98, 3, 170],
  ["pink", 97, 97, 150],
];

// TODO: point these to your volunteer / mentor sign-up forms.
const LINKS = [
  {
    href: "/register?role=volunteer",
    textKey: "join.vol",
    color: "#0f9bb4",
    scribble: "M4 8 C40 4 120 4 166 8 M60 14 C120 10 150 20 110 20 C80 20 70 14 100 12",
  },
  {
    href: "/register?role=mentor",
    textKey: "join.men",
    color: "#ff5fc1",
    scribble: "M20 6 C60 2 110 2 150 6 M90 8 C60 12 70 22 100 12 C110 8 80 20 90 22",
  },
];

export default function Volunteer() {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} id="volunteer" className={`join brick ${inView ? "in" : ""}`}>
      <Splats splats={VOLUNTEER_SPLATS} />

      {/* The big teal and pink X */}
      <svg className="xstrokes" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="teal" d="M240 -40 L800 1040" />
        <path className="pink" d="M790 -40 L320 1040" />
      </svg>

      <div className="band-wrap">
        {/* Yellow banner painted by the roller */}
        <div className="band">
          <h2>
            <span>{t("join.t1")}</span>
            <span>{t("join.t2")}</span>
          </h2>
        </div>

        {/* Paint roller */}
        <svg className="roller" viewBox="0 0 150 300" aria-hidden="true">
          <defs>
            <linearGradient id="roller-gradient" x1="0" x2="1">
              <stop offset="0" stopColor="#e8c540" />
              <stop offset=".45" stopColor="#ffe98a" />
              <stop offset="1" stopColor="#e2bb2e" />
            </linearGradient>
          </defs>
          <path d="M100 18 V6 H24 V150" fill="none" stroke="#9a9a9a" strokeWidth={6} strokeLinecap="round" />
          <rect x="14" y="150" width="20" height="46" rx="6" fill="#222" />
          <rect x="62" y="14" width="76" height="272" rx="32" fill="url(#roller-gradient)" />
        </svg>
      </div>

      <div className="join-links">
        {LINKS.map((link) => (
          <a key={link.textKey} href={link.href} className="scribble">
            <span>
              <Lines text={t(link.textKey)} />
            </span>
            <svg viewBox="0 0 170 24" aria-hidden="true">
              <path stroke={link.color} d={link.scribble} />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
