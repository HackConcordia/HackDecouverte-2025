"use client";

/* =========================================================================
   English / French text for the whole site.

   - Wrap the page in <LanguageProvider> (see app/page.tsx).
   - In a component: const { t } = useLanguage();  then  t("hero.cta")
   - "\n" in a text = line break (use the <Lines> component to show it).
   ========================================================================= */

import { createContext, Fragment, ReactNode, useContext, useEffect, useState } from "react";

export type Language = "en" | "fr";

const TEXT: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.volunteer": "Volunteer",
    "nav.team": "Team",
    "nav.faq": "FAQ",

    // Hero
    "hero.date": "NOVEMBER 14, 2026",
    "hero.place": "CONCORDIA UNIVERSITY",
    "hero.cta": "REGISTER NOW",
    ticker: "BILINGUAL ★ BEGINNER-FRIENDLY ★ PRE-UNIVERSITY ★ ALL OF QUÉBEC ★ ",

    // Countdown
    "countdown.days": "days",
    "countdown.hours": "hours",
    "countdown.minutes": "min",
    "countdown.seconds": "sec",
    "countdown.live": "IT'S HAPPENING NOW!",

    // About
    "about.title": "ABOUT US!",
    "about.q1": "WHAT IS A HACKATHON?",
    "about.a1": "A hackathon is an event where people come together to build software or hardware projects within a set timeframe.",
    "about.q2": "WHAT IS HACKDÉCOUVERTE?",
    "about.a2": "HackDécouverte is a bilingual, beginner-friendly hackathon for pre-university students across Québec.",
    "about.q3": "WHAT IS HACKCONCORDIA?",
    "about.a3": "HackConcordia is a student-run organization at Concordia University that fosters innovation and collaboration among students.",

    // Volunteer
    "join.t1": "JOIN THE TEAM",
    "join.t2": "BEHIND THE SCENES!",
    "join.vol": "BECOME A\nVOLUNTEER",
    "join.men": "BECOME A\nMENTOR",

    // Team
    "team.t1": "Meet the",
    "team.t2": "Team",
    "team.all": "All",
    "team.org": "Organizing",
    "team.tech": "Tech",
    "team.men": "Mentors",


    // Footer
    "foot.rights": "© 2026 – 2027 HackConcordia. All rights reserved",
    "foot.coc": "MLH Code of Conduct",
    "foot.values": "MLH Community Values",
    "foot.ctaT": "Want to build the future with us?",
    "foot.ctaP": "We’re always looking for kind, curious people to volunteer, mentor and organize with HackConcordia.",
    "foot.btn": "See open roles",
    "foot.desc": "A bilingual, beginner-friendly hackathon for pre-university students across Québec, run by HackConcordia.",
    "foot.explore": "Explore",
    "foot.info": "Info",
    "foot.top": "Back to top",
    "foot.coc2": "Code of conduct",
    "foot.a11y": "Accessibility",
    "foot.contact": "Contact",
  },

  fr: {
    // Navigation
    "nav.about": "À propos",
    "nav.volunteer": "Bénévolat",
    "nav.team": "Équipe",
    "nav.faq": "FAQ",

    // Hero
    "hero.date": "14 NOVEMBRE 2026",
    "hero.place": "UNIVERSITÉ CONCORDIA",
    "hero.cta": "INSCRIS-TOI",
    ticker: "BILINGUE ★ POUR DÉBUTANT·E·S ★ PRÉUNIVERSITAIRE ★ TOUT LE QUÉBEC ★ ",

    // Countdown
    "countdown.days": "jours",
    "countdown.hours": "heures",
    "countdown.minutes": "min",
    "countdown.seconds": "sec",
    "countdown.live": "C’EST PARTI!",

    // About
    "about.title": "À PROPOS!",
    "about.q1": "C’EST QUOI UN HACKATHON?",
    "about.a1": "Un hackathon est un événement où des gens se réunissent pour créer des projets logiciels ou matériels dans un temps limité.",
    "about.q2": "C’EST QUOI HACKDÉCOUVERTE?",
    "about.a2": "HackDécouverte est un hackathon bilingue et accessible aux débutant·e·s, pour les élèves préuniversitaires de partout au Québec.",
    "about.q3": "C’EST QUOI HACKCONCORDIA?",
    "about.a3": "HackConcordia est une organisation étudiante de l’Université Concordia qui encourage l’innovation et la collaboration entre étudiant·e·s.",

    // Volunteer
    "join.t1": "JOINS L’ÉQUIPE",
    "join.t2": "DANS LES COULISSES!",
    "join.vol": "DEVIENS\nBÉNÉVOLE",
    "join.men": "DEVIENS\nMENTOR",

    // Team
    "team.t1": "Rencontre",
    "team.t2": "l’équipe",
    "team.all": "Tous",
    "team.org": "Organisation",
    "team.tech": "Tech",
    "team.men": "Mentors",


    // Footer
    "foot.rights": "© 2026 – 2027 HackConcordia. Tous droits réservés",
    "foot.coc": "Code de conduite MLH",
    "foot.values": "Valeurs communautaires MLH",
    "foot.ctaT": "Envie de bâtir le futur avec nous?",
    "foot.ctaP": "On cherche toujours des personnes bienveillantes et curieuses pour faire du bénévolat, du mentorat et de l’organisation avec HackConcordia.",
    "foot.btn": "Voir les postes",
    "foot.desc": "Un hackathon bilingue et accessible aux débutant·e·s pour les élèves préuniversitaires du Québec, organisé par HackConcordia.",
    "foot.explore": "Explorer",
    "foot.info": "Infos",
    "foot.top": "Retour en haut",
    "foot.coc2": "Code de conduite",
    "foot.a11y": "Accessibilité",
    "foot.contact": "Contact",
  },
};

/** FAQ: [question, answer] pairs. */
const FAQ_TEXT: Record<Language, [string, string][]> = {
  en: [
    ["What is a hackathon?", "A hackathon is where curious people team up to build software or hardware projects from scratch in a short amount of time. What do they make? Whatever they can imagine."],
    ["Do I need a team?", "No. Come solo and we’ll help you find teammates at the start, or bring friends and sign up together."],
    ["Who can participate?", "High school and cégep students from anywhere in Québec. No experience needed."],
    ["What if I am not a coder?", "Perfect. Workshops and mentors will walk you through your first project. Designers and idea people are welcome too."],
    ["Can I join virtually?", "Details on virtual participation will be posted here soon."],
    ["What should I bring?", "Your laptop, charger, student ID, a water bottle and anything you want to hack on."],
    ["How much does it cost to attend?", "Pricing will be confirmed soon."],
    ["Can I get travel reimbursement?", "Travel support details will be posted here soon."],
  ],
  fr: [
    ["C’est quoi un hackathon?", "Un hackathon, c’est quand des personnes curieuses forment des équipes pour créer un projet logiciel ou matériel à partir de zéro, en peu de temps. Et qu’est-ce qu’elles créent? Tout ce qu’elles peuvent imaginer."],
    ["Ai-je besoin d’une équipe?", "Non. Viens seul·e et on t’aidera à trouver des coéquipier·ère·s au début, ou inscris-toi avec tes ami·e·s."],
    ["Qui peut participer?", "Les élèves du secondaire et du cégep de partout au Québec. Aucune expérience requise."],
    ["Et si je ne code pas?", "Parfait. Des ateliers et des mentors t’accompagneront dans ton premier projet. Les designers et les idéateur·rice·s sont aussi les bienvenu·e·s."],
    ["Puis-je participer à distance?", "Les détails sur la participation virtuelle seront publiés ici bientôt."],
    ["Quoi apporter?", "Ton ordinateur, ton chargeur, ta carte étudiante, une bouteille d’eau et tout ce que tu veux bidouiller."],
    ["Combien ça coûte?", "Les tarifs seront confirmés bientôt."],
    ["Mes frais de déplacement sont-ils remboursés?", "Les détails sur le soutien aux déplacements seront publiés ici bientôt."],
  ],
};

/* ---------- Context ---------- */

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  faq: [string, string][];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Keep <html lang="..."> in sync (helps screen readers and Google).
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextValue = {
    language,
    toggleLanguage: () => setLanguage((current) => (current === "en" ? "fr" : "en")),
    t: (key) => TEXT[language][key] ?? key,
    faq: FAQ_TEXT[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return context;
}

/** Shows text that contains "\n" with real line breaks. */
export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
