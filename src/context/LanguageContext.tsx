'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/language/translations/en';
import { pt } from '@/language/translations/pt';

type Translations = typeof en;

interface LanguageContextType {
  locale: 'en' | 'pt';
  setLocale: (locale: 'en' | 'pt') => void;
  t: (key: string) => string;
}

const translations: { [key: string]: Translations } = { en, pt };

export const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'pt'>('pt');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale === 'en' || savedLocale === 'pt') {
      setLocale(savedLocale);
    }
  }, []);

  const t = (key: string) => {
    let value = translations[locale];
    key.split('.').forEach((k) => {
      value = value?.[k as keyof typeof value];
    });
    return value as string || key;
  };

  const handleSetLocale = (newLocale: 'en' | 'pt') => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);