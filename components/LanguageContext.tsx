"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T>(trVal: T, enVal: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("tr");

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("kuzgun-lang") as Language;
    if (savedLang === "tr" || savedLang === "en") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("kuzgun-lang", lang);
    
    // Dispatch custom event so non-context or external listeners can sync immediately
    window.dispatchEvent(new CustomEvent("language-changed", { detail: lang }));
  };

  // Helper function to return either TR or EN translation
  const t = <T,>(trVal: T, enVal: T): T => {
    return language === "tr" ? trVal : enVal;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
