"use client";

/* =========================================================================
   SectionTitle
   variant="graffiti" → big black spray-paint title that pops in (About)
   variant="marker"   → white marker title, optional orange word (Team)

   Examples:
     <SectionTitle variant="graffiti" title="ABOUT US!" />
     <SectionTitle variant="marker" title="Meet the" highlight="Team" />
   ========================================================================= */

import { useInView } from "../lib/graffiti";

type SectionTitleProps = {
  title: string;
  highlight?: string;
  variant?: "graffiti" | "marker";
};

/**
 * In the "Permanent Marker" display font, the letter 'T' has a wide right-leaning
 * crossbar that overhangs into the tall ascender of 'H' in "TH".
 * Adding a targeted kerning margin after 't' when followed by 'h' prevents them
 * from overlapping while preserving the original thick text stroke and natural spacing.
 */
function formatMarkerText(text: string) {
  const parts = text.split(/(th)/gi);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (/^th$/i.test(part)) {
      return (
        <span key={i} className="th-pair">
          <span className="th-t">{part[0]}</span>
          {part[1]}
        </span>
      );
    }
    return part;
  });
}

export default function SectionTitle({ title, highlight, variant = "marker" }: SectionTitleProps) {
  const { ref, inView } = useInView<HTMLHeadingElement>();

  if (variant === "graffiti") {
    return (
      <h2 ref={ref} className={`about-title reveal ${inView ? "in" : ""}`} data-anim="pop">
        {title}
      </h2>
    );
  }

  return (
    <h2 ref={ref} className={`team-title reveal ${inView ? "in" : ""}`} data-anim="up">
      <span>{formatMarkerText(title)}</span> {highlight && <span className="highlight">{formatMarkerText(highlight)}</span>}
    </h2>
  );
}
