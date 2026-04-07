import { createContext, useContext, useMemo, useState } from "react";
import { config } from "../config";
import { messages } from "../i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || config.language.default);
  const value = useMemo(() => ({
    lang,
    t: messages[lang],
    toggle: () => {
      const next = lang === "ar" ? "en" : "ar";
      localStorage.setItem("lang", next);
      setLang(next);
    },
    dir: lang === "ar" ? "rtl" : "ltr",
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
