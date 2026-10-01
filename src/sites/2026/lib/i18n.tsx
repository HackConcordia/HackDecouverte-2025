"use client";

/* =========================================================================
   English / French text for the whole site.

   - Wrap the page in <LanguageProvider> (see Page2026.tsx); the starting
     language comes from the "hd-language" cookie, read in app/page.tsx.
   - In a component: const { t } = useLanguage();  then  t("hero.cta")
   - "\n" in a text = line break (use the <Lines> component to show it).
   ========================================================================= */

import { createContext, Fragment, ReactNode, useContext, useEffect, useState } from "react";
import { Language, LANGUAGE_COOKIE } from "./language";

export type { Language };

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

    // Team
    "team.t1": "Meet the",
    "team.t2": "Team",
    "team.all": "All",
    "team.lead": "Exec",
    "team.tech": "Technology",
    "team.sponsorship": "Sponsorship",
    "team.logistics": "Logistics",
    "team.marketing": "Marketing",
    "team.internal": "Internal",
    "team.events": "Events",
    "team.finance": "Finance",

    // Footer
    "foot.rights": "© 2026 – 2027 HackConcordia. All rights reserved",
    "foot.coc": "MLH Code of Conduct",
    "foot.values": "MLH Community Values",
    "foot.ctaT": "Want to build the future with us?",
    "foot.ctaP": "We’re always looking for kind, curious people to volunteer and organize with HackConcordia.",
    "foot.btn": "See open roles",
    "foot.desc": "A bilingual, beginner-friendly hackathon for pre-university students across Québec, run by HackConcordia.",
    "foot.explore": "Explore",
    "foot.info": "Info",
    "foot.top": "Back to top",
    "foot.coc2": "Code of conduct",
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

    // Team
    "team.t1": "Rencontre",
    "team.t2": "l’équipe",
    "team.all": "Tous",
    "team.lead": "Direction",
    "team.tech": "Technologie",
    "team.sponsorship": "Commandites",
    "team.logistics": "Logistique",
    "team.marketing": "Marketing",
    "team.internal": "Interne",
    "team.events": "Événements",
    "team.finance": "Finances",

    // Footer
    "foot.rights": "© 2026 – 2027 HackConcordia. Tous droits réservés",
    "foot.coc": "Code de conduite MLH",
    "foot.values": "Valeurs communautaires MLH",
    "foot.ctaT": "Envie de bâtir le futur avec nous?",
    "foot.ctaP": "On cherche toujours des personnes bienveillantes et curieuses pour faire du bénévolat et de l’organisation avec HackConcordia.",
    "foot.btn": "Voir les postes",
    "foot.desc": "Un hackathon bilingue et accessible aux débutant·e·s pour les élèves préuniversitaires du Québec, organisé par HackConcordia.",
    "foot.explore": "Explorer",
    "foot.info": "Infos",
    "foot.top": "Retour en haut",
    "foot.coc2": "Code de conduite",
    "foot.contact": "Contact",
  },
};

/** FAQ: [question, answer] pairs. */
const FAQ_TEXT: Record<Language, [string, string][]> = {
  en: [
    ["What is HackDécouverte?", "HackDécouverte is a bilingual, beginner-friendly hackathon for pre-university students across Québec. Participants form teams and build innovative hardware or software prototypes to solve real-world problems."],
    ["Who can participate?", "Pre-university students (CEGEP and equivalent) from across Québec. No prior hackathon experience is required!"],
    ["Is there a registration fee?", "No, participation is completely free!"],
    ["Do I need prior experience?", "Not at all! HackDécouverte is designed for beginners. We’ll have workshops and volunteers to guide you through the process."],
    ["What is the team size?", "Teams can have up to 4 members. Don’t worry if you don’t have a team—we’ll help you find one during the event."],
    ["What is the event format?", "The hackathon is in-person at Concordia University. It includes workshops, a campus tour, coding sessions, career talks, fairs, and a final project showcase with prizes."],
    ["Are meals provided?", "Yes! Breakfast, lunch, and dinner are included during the hackathon."],
    ["What should I bring?", "Bring your laptop, charger, student ID, and lots of enthusiasm! We’ll provide food, workspace, and WiFi."],
    ["What can I win?", "Winning teams will be rewarded with prizes, and all participants will gain valuable experience and networking opportunities."],
    ["Will there be support during the hackathon?", "Yes! Volunteers will be available to help you with coding, design, and brainstorming throughout the event."],
    ["How do I register?", "Registration will be available on the HackConcordia website. Keep an eye on our social media for updates."],
    ["What is HackConcordia?", "HackConcordia is a student-run organization at Concordia University that organizes events like HackDécouverte and ConUHacks, Montréal’s largest student-run hackathon. We aim to foster innovation, collaboration, and learning in the tech community."],
    ["What other events does HackConcordia run?", "Besides HackDécouverte, HackConcordia hosts ConUHacks (our flagship hackathon), coding workshops, industry panels, and networking events to help students learn and connect with professionals."],
    ["Can I join HackConcordia?", "Yes! HackConcordia is always looking for passionate students to join as volunteers, organizers, or team members. It’s a great way to gain experience, meet people, and contribute to the tech community at Concordia."],
  ],
  fr: [
    ["Qu’est-ce que HackDécouverte?", "HackDécouverte est un hackathon bilingue et convivial pour les débutants, destiné aux étudiants préuniversitaires de partout au Québec. Les participants forment des équipes et créent des prototypes matériels ou logiciels innovants pour résoudre des problèmes concrets."],
    ["Qui peut participer?", "Les étudiants préuniversitaires (CEGEP et équivalent) de tout le Québec. Aucune expérience préalable en hackathon n’est requise!"],
    ["Y a-t-il des frais d’inscription?", "Non, la participation est entièrement gratuite!"],
    ["Ai-je besoin d’une expérience préalable?", "Pas du tout! HackDécouverte est conçu pour les débutants. Nous aurons des ateliers et des bénévoles pour vous guider tout au long du processus."],
    ["Quelle est la taille des équipes?", "Les équipes peuvent avoir jusqu’à 4 membres. Ne vous inquiétez pas si vous n’avez pas d’équipe, nous vous aiderons à en trouver une pendant l’événement."],
    ["Quel est le format de l’événement?", "Le hackathon se déroule en personne à l’Université Concordia. Il comprend des ateliers, une visite du campus, des sessions de codage, des conférences sur les carrières, des foires et une vitrine finale des projets avec des prix."],
    ["Les repas sont-ils fournis?", "Oui! Le déjeuner, le dîner et le souper sont inclus pendant le hackathon."],
    ["Que dois-je apporter?", "Apportez votre ordinateur portable, votre chargeur, votre carte étudiante et beaucoup d’enthousiasme! Nous fournirons la nourriture, l’espace de travail et le WiFi."],
    ["Que puis-je gagner?", "Les équipes gagnantes recevront des prix, et tous les participants acquerront une expérience précieuse et des occasions de réseautage."],
    ["Y aura-t-il du soutien pendant le hackathon?", "Oui! Des bénévoles seront disponibles tout au long de l’événement pour vous aider avec la programmation, le design et le remue-méninges."],
    ["Comment puis-je m’inscrire?", "Les inscriptions seront disponibles sur le site web de HackConcordia. Suivez nos réseaux sociaux pour les mises à jour."],
    ["Qu’est-ce que HackConcordia?", "HackConcordia est une organisation étudiante de l’Université Concordia qui organise des événements comme HackDécouverte et ConUHacks, le plus grand hackathon étudiant de Montréal. Notre objectif est de favoriser l’innovation, la collaboration et l’apprentissage au sein de la communauté techno."],
    ["Quels autres événements HackConcordia organise-t-il?", "En plus de HackDécouverte, HackConcordia organise ConUHacks (notre hackathon phare), des ateliers de programmation, des panels avec l’industrie et des événements de réseautage pour aider les étudiants à apprendre et à rencontrer des professionnels."],
    ["Puis-je rejoindre HackConcordia?", "Oui! HackConcordia est toujours à la recherche d’étudiants passionnés pour se joindre à l’équipe en tant que bénévoles, organisateurs ou membres. C’est une excellente façon d’acquérir de l’expérience, de rencontrer des gens et de contribuer à la communauté techno de Concordia."],
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

export function LanguageProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  // Keep <html lang="..."> in sync (helps screen readers and Google).
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const next: Language = language === "en" ? "fr" : "en";
    setLanguage(next);
    // Read by the server on the next visit so the page arrives already in this language.
    document.cookie = `${LANGUAGE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  };

  const value: LanguageContextValue = {
    language,
    toggleLanguage,
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
