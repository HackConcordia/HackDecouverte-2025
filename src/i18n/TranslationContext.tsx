"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '../locales/en';
import fr from '../locales/fr';
import { Language } from './types';

const translations = { en, fr };

interface TranslationContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof en) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(Language.en);

  const t = (key: keyof typeof en) => translations[language][key] || key;

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslation must be used within a TranslationProvider');
  return context;
};
