"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import en from "../locales/en";
import fr from "../locales/fr";
import { Language } from "./types";
import { NestedKeyOf } from "./utils";

const translations = { en, fr };

type TranslationObject = typeof en;
type TranslationKey = NestedKeyOf<TranslationObject>;

interface TranslationContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(Language.fr);

  const t = (key: TranslationKey): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key; // fallback if key is not found
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error("useTranslation must be used within a TranslationProvider");
  return context;
};
