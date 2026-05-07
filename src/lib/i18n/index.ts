'use client';
import { createContext, useContext } from 'react';

type LanguageContextType = {
  language: 'en' | 'te' | 'or' | 'hi' | 'konda' | 'koya';
  setLanguage: (language: 'en' | 'te' | 'or' | 'hi' | 'konda' | 'koya') => void;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);
