'use client';

import { LanguageContext } from '@/lib/i18n';
import { useState, useEffect, useCallback } from 'react';
import en from '@/locales/en.json';
import te from '@/locales/te.json';
import or from '@/locales/or.json';
import hi from '@/locales/hi.json';

const translations = { en, te, or, hi };

type Language = 'en' | 'te' | 'or' | 'hi' | 'konda' | 'koya';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && ['en', 'te', 'or', 'hi', 'konda', 'koya'].includes(storedLang)) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = useCallback((key: string) => {
    let langToUse: 'en' | 'te' | 'or' | 'hi' = 'en';

    if (language === 'te' || language === 'konda' || language === 'koya') {
      langToUse = 'te';
    } else if (language === 'or') {
      langToUse = 'or';
    } else if (language === 'hi') {
      langToUse = 'hi';
    }
    
    return translations[langToUse][key as keyof typeof translations[typeof langToUse]] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
