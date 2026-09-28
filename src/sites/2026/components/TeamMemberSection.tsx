"use client";

/* =========================================================================
   TeamMemberSection
   Filter tabs + cards that pop in and tilt in 3D under the mouse.
   To add someone: add a line to TEAM_MEMBERS.
   ========================================================================= */

import { PointerEvent, useState } from "react";
import { cssVars, round1, Splats, SplatSpec, useInView, usePrefersReducedMotion } from "../lib/graffiti";
import { Language, useLanguage } from "../lib/i18n";
import SectionTitle from "./SectionTitle";

type Category = "org" | "tech" | "mentor";
type Filter = "all" | Category;

type Bilingual = Record<Language, string>;

export type TeamMember = {
  name: string;
  role: Bilingual;
  category: Category;
  bio: Bilingual;
  photo?: string; // e.g. "/team/maria-christine.jpg" (put the file in /public/team)
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: { en: "Lead designer", fr: "Designer principale" },
    category: "org",
    bio: {
      en: "Shapes the look of HackDécouverte, from the website to the swag.",
      fr: "Façonne l’image de HackDécouverte, du site web jusqu’aux articles promotionnels.",
    },
  },
  {
    name: "Maria-Christine Catiche",
    role: { en: "Director of Technology", fr: "Directrice de la technologie" },
    category: "tech",
    bio: {
      en: "Leads the tech team and keeps the website, registration and event-day tools running smoothly.",
      fr: "Dirige l’équipe tech et veille au bon fonctionnement du site web, des inscriptions et des outils du jour de l’événement.",
    },
  },
  {
    name: "Priya Patel",
    role: { en: "Co-director", fr: "Codirectrice" },
    category: "org",
    bio: {
      en: "Plans the schedule, venue and workshops with the organizing team.",
      fr: "Planifie l’horaire, le lieu et les ateliers avec l’équipe d’organisation.",
    },
  },
  {
    name: "Raouf Ouibrahim",
    role: { en: "Director of Technology", fr: "Directeur de la technologie" },
    category: "tech",
    bio: {
      en: "Co-leads the tech team and builds the platform participants use to register and check in.",
      fr: "Codirige l’équipe tech et développe la plateforme d’inscription et d’enregistrement des participant·e·s.",
    },
  },
  {
    name: "Camille Roy",
    role: { en: "Mentor", fr: "Mentor" },
    category: "mentor",
    bio: {
      en: "Helps first-time teams pick an idea and ship a working demo.",
      fr: "Aide les équipes débutantes à choisir une idée et à livrer une démo fonctionnelle.",
    },
  },
  {
    name: "Jordan Lee",
    role: { en: "Mentor", fr: "Mentor" },
    category: "mentor",
    bio: {
      en: "Hardware nerd. Ask about Arduino, sensors and anything that blinks.",
      fr: "Passionné·e de matériel. Pose-lui tes questions sur Arduino, les capteurs et tout ce qui clignote.",
    },
  },
];

const FILTERS: { value: Filter; textKey: string }[] = [
  { value: "all", textKey: "team.all" },
  { value: "org", textKey: "team.org" },
  { value: "tech", textKey: "team.tech" },
  { value: "mentor", textKey: "team.men" },
];

const TEAM_SPLATS: SplatSpec[] = [
  ["pink", 8, 4, 210], ["yellow", 2, 40, 250], ["pink", 98, 30, 230],
  ["yellow", 94, 62, 210], ["teal", 97, 97, 160], ["teal", 45, 48, 320],
  ["pink", 55, 52, 220], ["yellow", 50, 55, 200],
];

/* ---------- One card ---------- */

function TeamCard({ member, index, animateAsFilter }: { member: TeamMember; index: number; animateAsFilter: boolean }) {
  const { language } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [tilt, setTilt] = useState("");

  // 3D tilt following the mouse.
  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5; // -0.5 to +0.5
    const y = (event.clientY - box.top) / box.height - 0.5;
    setTilt(`rotateY(${round1(x * 16)}deg) rotateX(${round1(-y * 16)}deg) translateY(-6px)`);
  };

  return (
    <article
      className={`card ${animateAsFilter ? "pop" : ""}`}
      // --i / --k = animation delay order, --tr = starting tilt (fixed pattern)
      style={cssVars({ "--i": index, "--k": index, "--tr": `${((index * 53) % 20) - 10}deg` })}
      onPointerMove={handleMove}
      onPointerLeave={() => setTilt("")}
    >
      <div className="card-in" style={{ transform: tilt }}>
        <div className="avatar">
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={member.photo} alt={member.name} />
          ) : (
            <svg viewBox="0 0 100 90" aria-hidden="true">
              <circle cx="50" cy="32" r="22" fill="#b3b5b8" />
              <path d="M8 90 C8 58 92 58 92 90Z" fill="#b3b5b8" />
            </svg>
          )}
        </div>
        <h3>{member.name}</h3>
        <span className="role">{member.role[language]}</span>
        <p>{member.bio[language]}</p>
      </div>
    </article>
  );
}

/* ---------- Section ---------- */

export default function TeamMemberSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>();
  const [filter, setFilter] = useState<Filter>("all");
  const [hasFiltered, setHasFiltered] = useState(false);

  const visibleMembers = TEAM_MEMBERS.filter((member) => filter === "all" || member.category === filter);

  const chooseFilter = (value: Filter) => {
    setFilter(value);
    setHasFiltered(true);
  };

  return (
    <section ref={ref} id="team" className={`team brick ${inView ? "in" : ""}`}>
      <Splats splats={TEAM_SPLATS} />

      <SectionTitle title={t("team.t1")} highlight={t("team.t2")} />

      <div className="tabs" role="tablist">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            className="tab"
            role="tab"
            aria-selected={filter === item.value}
            onClick={() => chooseFilter(item.value)}
          >
            {t(item.textKey)}
          </button>
        ))}
      </div>

      {/* key={filter} re-mounts the grid so the cards pop in again after filtering */}
      <div className="grid" key={filter}>
        {visibleMembers.map((member, index) => (
          <TeamCard key={member.name} member={member} index={index} animateAsFilter={hasFiltered} />
        ))}
      </div>
    </section>
  );
}
