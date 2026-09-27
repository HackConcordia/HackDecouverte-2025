/* =========================================================================
   PromoCard
   Yellow torn-paper poster, taped to the wall, with a title, text and
   a button. Used in the footer ("Want to build the future with us?").
   ========================================================================= */

import CTAButton from "./CTAButton";

type PromoCardProps = {
  title: string;
  text: string;
  buttonLabel: string;
  buttonHref: string;
};

export default function PromoCard({ title, text, buttonLabel, buttonHref }: PromoCardProps) {
  return (
    <div className="poster-wrap">
      <div className="poster">
        <h2>{title}</h2>
        <p>{text}</p>
        <CTAButton href={buttonHref} variant="pill">
          {buttonLabel}
        </CTAButton>

        {/* Star doodle in the corner */}
        <svg className="star" viewBox="0 0 100 100" aria-hidden="true">
          <path
            d="M50 5 L62 40 L98 40 L68 62 L80 96 L50 74 L20 96 L32 62 L2 40 L38 40 Z"
            fill="none"
            stroke="#000"
            strokeWidth={7}
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
