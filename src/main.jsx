import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function DirectionWrapper({ children }) {
  const { dir, lang } = useLanguage();
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <DirectionWrapper>
          <AuthProvider>
            <App />
          </AuthProvider>
        </DirectionWrapper>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
