"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, type Locale, type Translations } from "./translations";

interface LocaleContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ko");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    // 로컬 스토리지에 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const newLocale = prev === "ko" ? "en" : "ko";
      if (typeof window !== "undefined") {
        localStorage.setItem("locale", newLocale);
      }
      return newLocale;
    });
  }, []);

  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
