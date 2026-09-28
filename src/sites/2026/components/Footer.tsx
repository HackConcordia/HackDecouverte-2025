"use client";

/* =========================================================================
   Footer
   Paint stripe with drips, taped poster (PromoCard), links, social icons,
   a giant word that gets painted in, and the bottom bar.
   ========================================================================= */

import { COLORS, Drips, Reveal, Splats, SplatSpec, useInView } from "../lib/graffiti";
import { useLanguage } from "../lib/i18n";
import PromoCard from "./PromoCard";

const FOOTER_SPLATS: SplatSpec[] = [
  ["pink", 3, 30, 200],
  ["teal", 97, 55, 240],
  ["purple", 60, 8, 90],
];

const EXPLORE_LINKS = [
  { href: "#about", textKey: "nav.about" },
  { href: "#volunteer", textKey: "nav.volunteer" },
  { href: "#team", textKey: "nav.team" },
  { href: "#faq", textKey: "nav.faq" },
];

const CONTACT_EMAIL = "team.hackconcordia@ecaconcordia.ca";

const INFO_LINKS = [
  { href: "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md", textKey: "foot.coc2" },
  { href: `mailto:${CONTACT_EMAIL}`, textKey: "foot.contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hackconcordia/",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/hackconcordia/",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7M8 7v.5M12 17v-7M12 13c0-3 5-3 5 0v4" />
      </>
    ),
  },
  {
    label: "X",
    href: "#", // TODO: add the X link
    icon: <path d="M5 4l14 16M19 4L5 20" />,
  },
  {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
];

// Drip colour matches the stripe third it hangs under.
const stripeColorAt = (left: number) => [COLORS.pink, COLORS.teal, COLORS.yellow][Math.min(2, Math.floor(left / 33.34))];

export default function Footer() {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>(0.1);

  return (
    <footer ref={ref} className={`footer ${inView ? "in" : ""}`}>
      <div className="f-edge" aria-hidden="true" />
      <div className="f-drips" aria-hidden="true">
        <Drips count={22} colorAt={stripeColorAt} delay={[0.1, 1.4]} length={[20, 90]} width={[4, 10]} spread={[0, 100]} />
      </div>
      <Splats splats={FOOTER_SPLATS} />

      <div className="f-wrap">
        <Reveal anim="pop">
          <PromoCard title={t("foot.ctaT")} text={t("foot.ctaP")} buttonLabel={t("foot.btn")} buttonHref="#volunteer" />
        </Reveal>

        <Reveal anim="up" delay={0.2}>
          <p className="f-brand">HackDécouverte</p>
          <p className="f-desc">{t("foot.desc")}</p>

          <div className="f-cols">
            <div>
              <h4>{t("foot.explore")}</h4>
              <ul>
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.textKey}>
                    <a href={link.href}>{t(link.textKey)}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="t">{t("foot.info")}</h4>
              <ul>
                {INFO_LINKS.map((link) => (
                  <li key={link.textKey}>
                    <a href={link.href}>{t(link.textKey)}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="socials">
            {SOCIALS.map((social) => {
              const isExternal = social.href.startsWith("http");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener" : undefined}
                >
                  <svg viewBox="0 0 24 24">{social.icon}</svg>
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Giant word: an outline + a coloured copy that gets "painted in" */}
      <div className="f-big" aria-hidden="true">
        <span>HACKDÉCOUVERTE</span>
        <span>HACKDÉCOUVERTE</span>
      </div>

      <div className="f-bottom">
        <span>{t("foot.rights")}</span>

        <nav aria-label="Policies">
          <a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md">{t("foot.coc")}</a>
          <a href="https://github.com/MLH/mlh-policies/blob/main/community-values.md">{t("foot.values")}</a>
        </nav>

        <a className="to-top" href="#top">
          <i aria-hidden="true">↑</i> <span>{t("foot.top")}</span>
        </a>
      </div>
    </footer>
  );
}
