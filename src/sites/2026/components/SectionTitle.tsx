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
      <span>{title}</span> {highlight && <span className="highlight">{highlight}</span>}
    </h2>
  );
}
