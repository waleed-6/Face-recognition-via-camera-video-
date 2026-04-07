import { Link, Outlet } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

export function AppLayout() {
  const { t, toggle } = useLanguage();
  const { toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-900 dark:text-white">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border bg-white p-4 dark:bg-slate-800">
          <h1 className="mb-3 text-xl font-bold">{t.appName}</h1>
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/dashboard">{t.dashboard}</Link>
            <Link to="/generate">{t.generateExam}</Link>
            <Link to="/subscribe">{t.subscribe}</Link>
            <Link to="/settings">{t.settings}</Link>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            {user?.subscription_status === "active" && <span className="rounded bg-green-100 px-2 py-1 text-green-800">{t.subscribed}</span>}
            <button onClick={toggle} className="rounded border px-2 py-1">AR/EN</button>
            <button onClick={toggleTheme} className="rounded border px-2 py-1">🌗</button>
            <button onClick={logout} className="rounded border px-2 py-1">{t.logout}</button>
          </div>
        </aside>
        <main className="rounded-xl border bg-white p-4 dark:bg-slate-800"><Outlet /></main>
      </div>
    </div>
  );
}
