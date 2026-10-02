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

    // Dock
    "dock.spray.disable": "Disable cursor effects",
    "dock.spray.enable": "Enable cursor effects",
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

    // Dock
    "dock.spray.disable": "Désactiver les effets de curseur",
    "dock.spray.enable": "Activer les effets de curseur",
  },
};

/** FAQ: [question, answer] pairs. */
const FAQ_TEXT: Record<Language, [string, string][]> = {
  en: [
    ["What is HackDécouverte?", "HackDécouverte is a bilingual, beginner-friendly hackathon for pre-university students across Québec. Participants form teams and build innovative hardware or software prototypes to solve real-world problems."],
    ["Who can participate?", "Any pre-university student (CEGEP, High School or equivalent) in Québec. No hackathon experience needed! Please note that university students are not eligible."],
    ["Is there a registration fee?", "No, participation is completely free!"],
    ["Do I need prior experience?", "Not at all! HackDécouverte is designed for beginners. We’ll have workshops and mentors to guide you through the process."],
    ["What is the team size?", "Teams can have up to 4 members. Don’t have a team? No problem, we’ll help you find one at the event."],
    ["What is the event format?", "The event includes a tech career fair, workshops, time to build your project, and a final showcase where teams present their projects and compete for prizes."],
    ["Are meals provided?", "Yes! Breakfast, lunch, and dinner are included during the hackathon."],
    ["What should I bring?", "Bring your laptop, charger, student ID, and lots of enthusiasm! We’ll provide food, workspace, and WiFi."],
    ["What can I win?", "Winning teams will be rewarded with prizes, and all participants will gain valuable experience, mentorship, and networking opportunities."],
    ["Will there be support during the hackathon?", "Yes! Mentors and volunteers will be available to help you with coding, design, and brainstorming throughout the event."],
    ["How do I register?", "Click the “Register” button at the top of this page. It will take you to the registration form."],
    ["What is HackConcordia?", "HackConcordia is a student-run organization at Concordia University that organizes events like HackDécouverte and ConUHacks, Canada’s second largest student-run hackathon. Our goal is to encourage innovation, collaboration, and learning in the tech community."],
    ["What other events does HackConcordia run?", "Besides HackDécouverte, HackConcordia hosts ConUHacks (our flagship hackathon), coding workshops, industry panels, and networking events to help students learn and connect with professionals."],
    ["Can I join HackConcordia?", "Yes! We’re always looking for passionate students to join as volunteers or organizers. Contact us at team.hackconcordia@ecaconcordia.ca or follow our social media for updates on open positions."],
  ],
  fr: [
    ["Qu’est-ce que HackDécouverte?", "HackDécouverte est un hackathon bilingue et accessible aux débutants, destiné aux élèves préuniversitaires de partout au Québec. Les participants forment des équipes et créent des prototypes matériels ou logiciels innovants pour résoudre des problèmes concrets."],
    ["Qui peut participer?", "Tout élève préuniversitaire (cégep, école secondaire ou équivalent) au Québec. Aucune expérience de hackathon n’est requise! Notez que les étudiants universitaires ne sont pas admissibles."],
    ["Y a-t-il des frais d’inscription?", "Non, la participation est entièrement gratuite!"],
    ["Ai-je besoin d’expérience préalable?", "Pas du tout! HackDécouverte est conçu pour les débutants. Des ateliers et des mentors seront là pour vous guider tout au long de l’événement."],
    ["Quelle est la taille des équipes?", "Les équipes peuvent compter jusqu’à 4 membres. Pas d’équipe? Aucun problème, nous vous aiderons à en trouver une pendant l’événement."],
    ["Quel est le format de l’événement?", "L’événement comprend un salon de carrières en technologie, des ateliers, du temps pour développer votre projet, ainsi qu’une présentation finale où les équipes présentent leurs projets et se disputent des prix."],
    ["Les repas sont-ils fournis?", "Oui! Le petit-déjeuner, le dîner et le souper sont inclus pendant le hackathon."],
    ["Que dois-je apporter?", "Apportez votre ordinateur portable, votre chargeur, votre carte étudiante et beaucoup d’enthousiasme! Nous fournirons la nourriture, l’espace de travail et le WiFi."],
    ["Que puis-je gagner?", "Les équipes gagnantes recevront des prix, et tous les participants gagneront une expérience précieuse, du mentorat et des occasions de réseautage."],
    ["Y aura-t-il du soutien pendant le hackathon?", "Oui! Des mentors et des bénévoles seront disponibles pour vous aider avec la programmation, le design et le remue-méninges tout au long de l’événement."],
    ["Comment puis-je m’inscrire?", "Cliquez sur le bouton « S’inscrire » en haut de cette page. Il vous mènera au formulaire d’inscription."],
    ["Qu’est-ce que HackConcordia?", "HackConcordia est une organisation étudiante de l’Université Concordia qui organise des événements comme HackDécouverte et ConUHacks, le deuxième plus grand hackathon étudiant au Canada. Notre objectif est d’encourager l’innovation, la collaboration et l’apprentissage dans la communauté techno."],
    ["Quels autres événements HackConcordia organise-t-il?", "En plus de HackDécouverte, HackConcordia organise ConUHacks (notre hackathon phare), des ateliers de programmation, des panels avec l’industrie et des événements de réseautage pour aider les étudiants à apprendre et à rencontrer des professionnels."],
    ["Puis-je rejoindre HackConcordia?", "Oui! Nous sommes toujours à la recherche d’étudiants passionnés pour se joindre à nous comme bénévoles ou organisateurs. Contactez-nous à team.hackconcordia@ecaconcordia.ca ou suivez nos réseaux sociaux pour connaître les postes disponibles."],
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
