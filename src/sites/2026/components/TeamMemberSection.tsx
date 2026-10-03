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

type Category = "lead" | "tech" | "sponsorship" | "marketing" | "logistics" | "events" | "internal" | "finance";
type Filter = "all" | Category;

type Bilingual = Record<Language, string>;

export type TeamMember = {
  name: string;
  role: Bilingual;
  category: Category;
  team: string;
  bio?: Bilingual;
  photo?: string;
  photoPosition?: number; // vertical crop focus: 0 = top of photo, 100 = bottom (default 10)
};

export const TEAM_MEMBERS: TeamMember[] = [
  // Lead / Exec
  {
    name: "Toby Fischer",
    role: { en: "Co-President", fr: "Co-président" },
    category: "lead",
    team: "Lead",
    photo: "/team/Toby_Fischer.jpg",
  },
  {
    name: "Lucia Jimenez",
    role: { en: "Co-President", fr: "Co-présidente" },
    category: "lead",
    team: "Lead",
    photo: "/team/Lucia_Jimenez.jpg",
  },

  // Technology
  {
    name: "Mohamad Addasi",
    role: { en: "VP of Technology", fr: "VP Technologie" },
    category: "tech",
    team: "Technology",
    photo: "/team/Mohamad_Addasi.jpg",
  },
  {
    name: "Maria-Christine Catiche",
    role: { en: "Director of Technology", fr: "Directrice de la technologie" },
    category: "tech",
    team: "Technology",
    photo: "/team/Maria-Christine_Catiche.jpg",
  },
  {
    name: "Raouf Ouibrahim",
    role: { en: "Director of Technology", fr: "Directeur de la technologie" },
    category: "tech",
    team: "Technology",
    photo: "/team/Raouf_Ouibrahim.jpg",
  },
  {
    name: "Mijan Ullah",
    role: { en: "Director of Technology", fr: "Directeur de la technologie" },
    category: "tech",
    team: "Technology",
    photo: "/team/Mijan_Ullah.jpg",
  },
  {
    name: "Shay Luan",
    role: { en: "Director of Technology", fr: "Directeur de la technologie" },
    category: "tech",
    team: "Technology",
    photo: "/team/Shay_Luan.jpg",
  },
  {
    name: "Thomas Assalian",
    role: { en: "Director of Technology", fr: "Directeur de la technologie" },
    category: "tech",
    team: "Technology",
    photo: "/team/Thomas_Assalian.jpg",
  },
  {
    name: "Daniela Villamizar Useche",
    role: { en: "Director of Technology", fr: "Directrice de la technologie" },
    category: "tech",
    team: "Technology",
    photo: "/team/Daniela_Villamizar_Useche.jpg",
  },
  {
    name: "Emily Ng",
    role: { en: "Director of Technology", fr: "Directrice de la technologie" },
    category: "tech",
    team: "Technology",
    photo: "/team/Emily_Ng.jpg",
  },

  // Sponsorship
  {
    name: "Sarah Tannous",
    role: { en: "VP of Sponsorship", fr: "VP Commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Sarah_Tannous.jpg",
  },
  {
    name: "Jovan Gavranovic",
    role: { en: "Director of Sponsorship", fr: "Directeur des commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Jovan_Gavranovic.jpg",
  },
  {
    name: "Mamadou Camara",
    role: { en: "Director of Sponsorship", fr: "Directeur des commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Mamadou_Camara.jpg",
  },
  {
    name: "Salma Benlemlih",
    role: { en: "Director of Sponsorship", fr: "Directrice des commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Salma_Benlemlih.jpg",
  },
  {
    name: "Benjamin Liu",
    role: { en: "Director of Sponsorship", fr: "Directeur des commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Benjamin_Liu.jpg",
  },
  {
    name: "Audrey Clara Tchantchou",
    role: { en: "Director of Sponsorship", fr: "Directrice des commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Audrey_Clara_Tchantchou.jpg",
  },
  {
    name: "Grace Ashley",
    role: { en: "Director of Sponsorship", fr: "Directrice des commandites" },
    category: "sponsorship",
    team: "Sponsorship",
    photo: "/team/Grace_Ashley.jpg",
  },

  // Marketing
  {
    name: "Christina Alexandrakis",
    role: { en: "VP of Marketing", fr: "VP Marketing" },
    category: "marketing",
    team: "Marketing",
    photo: "/team/Christina_Alexandrakis.jpg",
  },
  {
    name: "Matthew Lucas Santiago",
    role: { en: "Director of Marketing", fr: "Directeur du marketing" },
    category: "marketing",
    team: "Marketing",
    photo: "/team/Matthew_Lucas_Santiago.jpg",
  },
  {
    name: "Seydina Gueye",
    role: { en: "Director of Marketing", fr: "Directeur du marketing" },
    category: "marketing",
    team: "Marketing",
    photo: "/team/Seydina_Gueye.jpg",
  },
  {
    name: "Goher Ali Syed",
    role: { en: "Director of Marketing", fr: "Directeur du marketing" },
    category: "marketing",
    team: "Marketing",
    photo: "/team/Goher_Ali_Syed.jpg",
  },

  // Logistics
  {
    name: "Ning Ye",
    role: { en: "VP of Logistics", fr: "VP Logistique" },
    category: "logistics",
    team: "Logistics",
    photo: "/team/Ning_Ye.jpg",
  },
  {
    name: "Julien Halde",
    role: { en: "Director of Logistics", fr: "Directeur de la logistique" },
    category: "logistics",
    team: "Logistics",
    photo: "/team/Julien_Halde.jpg",
  },
  {
    name: "Arthur Huon de Penanster",
    role: { en: "Director of Logistics", fr: "Directeur de la logistique" },
    category: "logistics",
    team: "Logistics",
    photo: "/team/Arthur_Huon_de_Penanster.jpg",
  },

  // Events
  {
    name: "Andrew Phillips",
    role: { en: "VP of Events", fr: "VP Événements" },
    category: "events",
    team: "Events",
    photo: "/team/Andrew_Phillips.jpg",
  },
  {
    name: "Alisa Ignatina",
    role: { en: "Director of Events", fr: "Directrice des événements" },
    category: "events",
    team: "Events",
    photo: "/team/Alisa_Ignatina.jpg",
  },
  {
    name: "Ashley Samerev",
    role: { en: "Director of Events", fr: "Directrice des événements" },
    category: "events",
    team: "Events",
    photo: "/team/Ashley_Samerev.jpg",
  },

  // Internal
  {
    name: "Noorjahan Kazi",
    role: { en: "VP of Internal", fr: "VP Interne" },
    category: "internal",
    team: "Internal",
    photo: "/team/Noorjahan_Kazi.jpg",
  },
  {
    name: "Ahmed Fakhir",
    role: { en: "Director of Internal", fr: "Directeur de l'interne" },
    category: "internal",
    team: "Internal",
    photo: "/team/Ahmed_Fakhir.jpg",
  },

  // Finance
  {
    name: "Amani Magra",
    role: { en: "VP of Finance", fr: "VP Finances" },
    category: "finance",
    team: "Finance",
    photo: "/team/Amani_Magra.jpg",
  },

  {
    name: "Abdou Maouda",
    role: { en: "Director of Technology", fr: "Directeur de la technologie" },
    category: "tech",
    team: "Technology",
    photo: "/team/Abdou_Maouda.jpg",
  },
  {
    name: "Ellen Ung",
    role: { en: "Director of Marketing", fr: "Directrice du marketing" },
    category: "marketing",
    team: "Marketing",
    photo: "/team/Ellen_Ung.jpg",
  },
  {
    name: "Luella Mailloux",
    role: { en: "Director of Events", fr: "Directrice des événements" },
    category: "events",
    team: "Events",
    photo: "/team/Luella_Mailloux.png",
  },
  {
    name: "Alexandra Siganos",
    role: { en: "Director of Logistics", fr: "Directrice de la logistique" },
    category: "logistics",
    team: "Logistics",
    photo: "/team/Alexandra_Siganos.jpg",
  },
];

const FILTERS: { value: Filter; textKey: string }[] = [
  { value: "all", textKey: "team.all" },
  { value: "lead", textKey: "team.lead" },
  { value: "tech", textKey: "team.tech" },
  { value: "sponsorship", textKey: "team.sponsorship" },
  { value: "logistics", textKey: "team.logistics" },
  { value: "marketing", textKey: "team.marketing" },
  { value: "events", textKey: "team.events" },
  { value: "internal", textKey: "team.internal" },
  { value: "finance", textKey: "team.finance" },
];

type FilterItem = { value: Filter; textKey: string };

function computeTabRows(
  items: FilterItem[],
  widths: number[],
  containerWidth: number,
  gap: number
): FilterItem[][] {
  const n = items.length;
  if (n === 0) return [];
  if (widths.length !== n || containerWidth <= 0) {
    // Default trapezoid: 5 on line 1, 4 on line 2 (never 1 team on a line)
    return [items.slice(0, 5), items.slice(5, 9)];
  }

  const getWidth = (start: number, end: number) => {
    let sum = 0;
    for (let i = start; i <= end; i++) {
      sum += widths[i];
    }
    return sum + (end - start) * gap;
  };

  // 1 line if all items fit comfortably
  if (getWidth(0, n - 1) <= containerWidth) {
    return [items];
  }

  // 2 lines: Trapezoid with top longer than bottom (5 / 4)
  // Ensures neither line has only 1 team, top is longer than bottom
  const w5_0 = getWidth(0, 4);
  const w5_1 = getWidth(5, 8);
  if (w5_0 <= containerWidth && w5_1 <= containerWidth) {
    return [items.slice(0, 5), items.slice(5, 9)];
  }

  // 3 lines: Trapezoid 4 / 3 / 2 (top is longer than bottom, never 1 team on a line)
  const w4_0 = getWidth(0, 3);
  const w4_1 = getWidth(4, 6);
  const w4_2 = getWidth(7, 8);
  if (w4_0 <= containerWidth && w4_1 <= containerWidth && w4_2 <= containerWidth) {
    return [items.slice(0, 4), items.slice(4, 7), items.slice(7, 9)];
  }

  // 3 lines: Balanced 3 / 3 / 3
  const w3_0 = getWidth(0, 2);
  const w3_1 = getWidth(3, 5);
  const w3_2 = getWidth(6, 8);
  if (w3_0 <= containerWidth && w3_1 <= containerWidth && w3_2 <= containerWidth) {
    return [items.slice(0, 3), items.slice(3, 6), items.slice(6, 9)];
  }

  // 4 lines: 3 / 2 / 2 / 2 (top longer than bottom, never 1 team on a line)
  const w3222_0 = getWidth(0, 2);
  const w3222_1 = getWidth(3, 4);
  const w3222_2 = getWidth(5, 6);
  const w3222_3 = getWidth(7, 8);
  if (
    w3222_0 <= containerWidth &&
    w3222_1 <= containerWidth &&
    w3222_2 <= containerWidth &&
    w3222_3 <= containerWidth
  ) {
    return [
      items.slice(0, 3),
      items.slice(3, 5),
      items.slice(5, 7),
      items.slice(7, 9),
    ];
  }

  // Fallback: 2 / 2 / 2 / 3 (never only 1 team on a line)
  return [
    items.slice(0, 2),
    items.slice(2, 4),
    items.slice(4, 6),
    items.slice(6, 9),
  ];
}

function TeamTabs({
  filter,
  onChooseFilter,
}: {
  filter: Filter;
  onChooseFilter: (value: Filter) => void;
}) {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tabRows, setTabRows] = useState<FilterItem[][]>([
    FILTERS.slice(0, 5),
    FILTERS.slice(5, 9),
  ]);

  const updateLayout = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) return;

    const buttonMap = new Map<string, number>();
    container.querySelectorAll<HTMLButtonElement>(".tab").forEach((btn) => {
      const val = btn.getAttribute("data-tab");
      if (val) {
        buttonMap.set(val, btn.getBoundingClientRect().width);
      }
    });

    if (buttonMap.size !== FILTERS.length) return;

    const widths = FILTERS.map((f) => buttonMap.get(f.value) || 0);
    const firstRow = container.querySelector<HTMLElement>(".tabs-row");
    const gap = firstRow ? parseFloat(getComputedStyle(firstRow).gap) || 24 : 24;

    const nextRows = computeTabRows(FILTERS, widths, containerWidth, gap);
    setTabRows((prev) => {
      if (
        prev.length === nextRows.length &&
        prev.every((row, i) => row.length === nextRows[i].length)
      ) {
        return prev;
      }
      return nextRows;
    });
  }, []);

  useEffect(() => {
    updateLayout();
    const container = containerRef.current;
    if (!container) return;

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateLayout();
      });
      resizeObserver.observe(container);
    }

    window.addEventListener("resize", updateLayout);
    const timer = setTimeout(updateLayout, 50);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayout);
      clearTimeout(timer);
    };
  }, [updateLayout, language]);

  return (
    <div
      ref={containerRef}
      className="tabs"
      role="tablist"
      aria-label="Team category filters"
    >
      {tabRows.map((row, rowIndex) => (
        <div key={rowIndex} className="tabs-row" role="presentation">
          {row.map((item) => (
            <button
              key={item.value}
              data-tab={item.value}
              className="tab"
              role="tab"
              aria-selected={filter === item.value}
              onClick={() => onChooseFilter(item.value)}
            >
              {t(item.textKey)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

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

  const avatarStyle = cssVars({
    "--pos-y": `${member.photoPosition ?? 10}%`,
  });

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
      <TeamTabs filter={filter} onChooseFilter={chooseFilter} />

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

          {/* Dots Indicator (visible when more than 1 page, capped to max 5 sliding dots) */}
          {isScrollable && totalSlides > 1 && (() => {
            const MAX_DOTS = 5;
            const showSliding = totalSlides > MAX_DOTS;
            const halfWindow = Math.floor(MAX_DOTS / 2);
            const startDot = showSliding
              ? Math.max(0, Math.min(activeSlide - halfWindow, totalSlides - MAX_DOTS))
              : 0;
            const dotCount = Math.min(totalSlides, MAX_DOTS);

            return (
              <div className="carousel-dots" role="tablist" aria-label="Carousel pagination">
                {Array.from({ length: dotCount }).map((_, idx) => {
                  const slideIndex = startDot + idx;
                  const isActive = activeSlide === slideIndex;
                  const isEdgeLeft = showSliding && idx === 0 && startDot > 0;
                  const isEdgeRight = showSliding && idx === MAX_DOTS - 1 && startDot + MAX_DOTS < totalSlides;

                  return (
                    <button
                      key={slideIndex}
                      type="button"
                      className={`carousel-dot ${isActive ? "active" : ""} ${
                        isEdgeLeft || isEdgeRight ? "edge" : ""
                      }`}
                      onClick={() => scrollToSlide(slideIndex)}
                      aria-label={`Go to slide ${slideIndex + 1}`}
                      aria-selected={isActive}
                    />
                  );
                })}
              </div>
            );
          })()}

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
