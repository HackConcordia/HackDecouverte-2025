"use client";

/* =========================================================================
   DateDisplay
   White spray-paint streak with the date and place, plus dripping paint.
   ========================================================================= */

import { Drips } from "../lib/graffiti";
import { useLanguage } from "../lib/i18n";

export default function DateDisplay() {
  const { t } = useLanguage();

  return (
    <div className="streak-wrap">
      <div className="streak">
        <span>{t("hero.date")}</span>
        <span>{t("hero.place")}</span>
      </div>

      {/* White drips start after the streak has been sprayed on */}
      <Drips count={9} colorAt={() => "#fff"} delay={[2.1, 2.9]} length={[14, 60]} width={[3, 7]} />
    </div>
  );
}
