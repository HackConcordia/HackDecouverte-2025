"use client";

/* =========================================================================
   TeamMemberSection
   Filter tabs + cards that pop in and tilt in 3D under the mouse.
   To add someone: add a line to TEAM_MEMBERS.
   ========================================================================= */

import { PointerEvent, useState } from "react";
import { cssVars, round1, Splats, SplatSpec, useInView, usePrefersReducedMotion } from "../lib/graffiti";
import { useLanguage } from "../lib/i18n";
import SectionTitle from "./SectionTitle";

type Category = "org" | "tech" | "mentor";
type Filter = "all" | Category;

export type TeamMember = {
  name: string;
  role: string;
  category: Category;
  bio: string;
  photo?: string; // e.g. "/team/maria-christine.jpg" (put the file in /public/team)
};

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Sarah Chen", role: "Lead designer", category: "org", bio: "Shapes the look of HackDécouverte, from the website to the swag." },
  { name: "Maria-Christine Catiche", role: "Director of Technology", category: "tech", bio: "Leads the tech team and keeps the website, registration and event-day tools running smoothly." },
  { name: "Priya Patel", role: "Co-director", category: "org", bio: "Plans the schedule, venue and workshops with the organizing team." },
  { name: "Raouf Ouibrahim", role: "Director of Technology", category: "tech", bio: "Co-leads the tech team and builds the platform participants use to register and check in." },
  { name: "Camille Roy", role: "Mentor", category: "mentor", bio: "Helps first-time teams pick an idea and ship a working demo." },
  { name: "Jordan Lee", role: "Mentor", category: "mentor", bio: "Hardware nerd. Ask about Arduino, sensors and anything that blinks." },
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
        <span className="role">{member.role}</span>
        <p>{member.bio}</p>
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
