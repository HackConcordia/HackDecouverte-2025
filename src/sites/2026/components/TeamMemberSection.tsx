"use client";

/* =========================================================================
   TeamMemberSection
   Carousel / slider with navigation arrows + 3D tilt cards.
   Filter tabs for teams (Tech, Logistics, Sponsorship, Marketing, Internal, Exec).
   Only members with verified photos are listed.
   ========================================================================= */

import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { cssVars, round1, Splats, SplatSpec, useInView, usePrefersReducedMotion } from "../lib/graffiti";
import { Language, useLanguage } from "../lib/i18n";
import SectionTitle from "./SectionTitle";

type Category = "lead" | "tech" | "sponsorship" | "marketing" | "logistics" | "internal";
type Filter = "all" | Category;

type Bilingual = Record<Language, string>;

export type TeamMember = {
  name: string;
  role: Bilingual;
  category: Category;
  team: string;
  bio?: Bilingual;
  photo?: string;
  photoOffset?: number; // e.g. 15 = move photo up by 15%
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Toby Fischer",
    role: { en: "Co-President", fr: "Co-président" },
    category: "lead",
    team: "Lead",
    photo: "/team/Toby_Fischer.jpg",
    photoOffset: 7,
  },
  {
    name: "Lucia Jimenez",
    role: { en: "Co-President", fr: "Co-présidente" },
    category: "lead",
    team: "Lead",
    photo: "/team/Lucia_Jimenez.jpg",
    photoOffset: 7,
  },
  {
    name: "Mohamad Addasi",
    role: { en: "VP of Technology", fr: "VP Technologie" },
    category: "tech",
    team: "Tech",
    photo: "/team/Mohamad_Addasi.jpg",
    photoOffset: 15,
  },
  {
    name: "Sarah Tannous",
    role: { en: "VP of Sponsorship", fr: "VP Commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Sarah_Tannous.jpg",
    photoOffset: 7,
  },
  {
    name: "Ning Ye",
    role: { en: "VP of Logistics", fr: "VP Logistique" },
    category: "logistics",
    team: "Logistics",
    photo: "/team/Ning_Ye.jpg",
    photoOffset: 7,
  },
  {
    name: "Noorjahan Kazi",
    role: { en: "VP of Internal", fr: "VP Interne" },
    category: "internal",
    team: "Internal",
    photo: "/team/Noorjahan_Kazi.jpg",
    photoOffset: 25,
  },
  {
    name: "Maria-Christine Catiche",
    role: { en: "Director of Technology", fr: "Directrice de la technologie" },
    category: "tech",
    team: "Tech",
    photo: "/team/Maria-Christine_Catiche.jpg",
    photoOffset: 7,
  },
  {
    name: "Raouf Ouibrahim",
    role: { en: "Director of Technology", fr: "Directeur de la technologie" },
    category: "tech",
    team: "Tech",
    photo: "/team/Raouf_Ouibrahim.jpg",
    photoOffset: 7,
  },
  {
    name: "Mijan Ullah",
    role: { en: "Director of Technology", fr: "Directeur de la technologie" },
    category: "tech",
    team: "Tech",
    photo: "/team/Mijan_Ullah.jpg",
    photoOffset: 15,
  },
  {
    name: "Shay Luan",
    role: { en: "Director of Technology", fr: "Directeur de la technologie" },
    category: "tech",
    team: "Tech",
    photo: "/team/Shay_Luan.jpg",
    photoOffset: 7,
  },
  {
    name: "Thomas Assalian",
    role: { en: "Director of Technology", fr: "Directeur de la technologie" },
    category: "tech",
    team: "Tech",
    photo: "/team/Thomas_Assalian.jpg",
    photoOffset: 20,
  },
  {
    name: "Jovan Gavranovic",
    role: { en: "Director of Sponsorship", fr: "Directeur des commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Jovan_Gavranovic.jpg",
    photoOffset: 20,
  },
  {
    name: "Mamadou Camara",
    role: { en: "Director of Sponsorship", fr: "Directeur des commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Mamadou_Camara.jpg",
    photoOffset: 7,
  },
  {
    name: "Salma Benlemlih",
    role: { en: "Director of Sponsorship", fr: "Directrice des commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Salma_Benlemlih.jpg",
    photoOffset: 7,
  },
  {
    name: "Matthew Lucas Santiago",
    role: { en: "Director of Marketing", fr: "Directeur du marketing" },
    category: "marketing",
    team: "Marketing",
    photo: "/team/Matthew_Lucas_Santiago.jpg",
    photoOffset: 7,
  },
  {
    name: "Seydina Gueye",
    role: { en: "Director of Marketing", fr: "Directeur du marketing" },
    category: "marketing",
    team: "Marketing",
    photo: "/team/Seydina_Gueye.jpg",
    photoOffset: 7,
  },
  {
    name: "Julien Halde",
    role: { en: "Director of Logistics", fr: "Directeur de la logistique" },
    category: "logistics",
    team: "Logistics",
    photo: "/team/Julien_Halde.jpg",
    photoOffset: 10,
  },
];

const FILTERS: { value: Filter; textKey: string }[] = [
  { value: "all", textKey: "team.all" },
  { value: "lead", textKey: "team.lead" },
  { value: "tech", textKey: "team.tech" },
  { value: "sponsorship", textKey: "team.sponsorship" },
  { value: "logistics", textKey: "team.logistics" },
  { value: "marketing", textKey: "team.marketing" },
  { value: "internal", textKey: "team.internal" },
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

  const offset = member.photoOffset ?? 0;
  const avatarStyle = offset > 0 ? cssVars({
    "--offset-y": `-${offset}%`,
  }) : undefined;

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
            <img
              src={member.photo}
              alt={member.name}
              loading="lazy"
              style={avatarStyle}
            />
          ) : (
            <svg viewBox="0 0 100 90" aria-hidden="true">
              <circle cx="50" cy="32" r="22" fill="#b3b5b8" />
              <path d="M8 90 C8 58 92 58 92 90Z" fill="#b3b5b8" />
            </svg>
          )}
        </div>
        <h3>{member.name}</h3>
        <span className="role">{member.role[language]}</span>
        {member.bio && member.bio[language] && <p>{member.bio[language]}</p>}
      </div>
    </article>
  );
}

/* ---------- Section ---------- */

export default function TeamMemberSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [hasFiltered, setHasFiltered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(1);
  const [isScrollable, setIsScrollable] = useState(false);

  const visibleMembers = TEAM_MEMBERS.filter((member) => filter === "all" || member.category === filter);

  const chooseFilter = (value: Filter) => {
    setFilter(value);
    setHasFiltered(true);
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  const updateScrollState = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const scrollable = scrollWidth > clientWidth + 10;
    setIsScrollable(scrollable);
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const maxScroll = Math.max(1, scrollWidth - clientWidth);
    const progress = Math.min(1, Math.max(0, scrollLeft / maxScroll));

    const stepSize = Math.max(260, clientWidth * 0.75);
    const calculatedPages = Math.max(1, Math.ceil(scrollWidth / stepSize));
    setTotalSlides(calculatedPages);

    const currentPage = Math.min(
      calculatedPages - 1,
      Math.round(progress * (calculatedPages - 1))
    );
    setActiveSlide(currentPage);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = viewportRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, visibleMembers.length]);

  const scroll = (direction: "left" | "right") => {
    const el = viewportRef.current;
    if (!el) return;
    const scrollAmount = Math.max(280, el.clientWidth * 0.75);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToSlide = (pageIndex: number) => {
    const el = viewportRef.current;
    if (!el || totalSlides <= 1) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = (pageIndex / (totalSlides - 1)) * maxScroll;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section ref={ref} id="team" className={`team brick ${inView ? "in" : ""}`}>
      <Splats splats={TEAM_SPLATS} />

      <SectionTitle title={t("team.t1")} highlight={t("team.t2")} />

      {/* Team Filter Tabs */}
      <div className="tabs" role="tablist" aria-label="Team category filters">
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

      <div
        className="team-carousel-container"
        aria-label="Team members carousel"
      >
        <div className="team-carousel-row">
          {/* Desktop Left Arrow (visible when scrollable) */}
          {isScrollable && (
            <button
              type="button"
              className="carousel-arrow prev"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous members"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Viewport Track */}
          <div className="carousel-viewport" ref={viewportRef}>
            <div
              className={`carousel-track ${!isScrollable ? "is-centered" : ""}`}
              key={filter}
            >
              {visibleMembers.map((member, index) => (
                <TeamCard key={member.name} member={member} index={index} animateAsFilter={hasFiltered} />
              ))}
            </div>
          </div>

          {/* Desktop Right Arrow (visible when scrollable) */}
          {isScrollable && (
            <button
              type="button"
              className="carousel-arrow next"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next members"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Carousel Controls (Counter, Dots, and Mobile Arrows) */}
        <div className="carousel-controls">
          {/* Mobile Left Arrow */}
          {isScrollable && (
            <div className="carousel-mobile-arrows">
              <button
                type="button"
                className="carousel-arrow prev"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous members"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            </div>
          )}

          {/* Dots Indicator (visible when more than 1 page) */}
          {isScrollable && totalSlides > 1 && (
            <div className="carousel-dots" role="tablist" aria-label="Carousel pagination">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel-dot ${activeSlide === i ? "active" : ""}`}
                  onClick={() => scrollToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={activeSlide === i}
                />
              ))}
            </div>
          )}

          {/* Member Count Pill */}
          <div className="carousel-counter">
            <span>
              {visibleMembers.length}{" "}
              {filter === "all" ? t("team.all").toLowerCase() : t(`team.${filter}`).toLowerCase()}
            </span>
          </div>

          {/* Mobile Right Arrow */}
          {isScrollable && (
            <div className="carousel-mobile-arrows">
              <button
                type="button"
                className="carousel-arrow next"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next members"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
