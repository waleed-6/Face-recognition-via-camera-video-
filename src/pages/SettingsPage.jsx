import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const { t, toggle } = useLanguage();
  const { toggleTheme } = useTheme();
  const [profile, setProfile] = useState({ name: user?.name || "", email: user?.email || "" });

  return <div className="space-y-3"><h1>{t.settings}</h1><input className="w-full border p-2" value={profile.name} onChange={(e)=>setProfile({...profile,name:e.target.value})} /><input className="w-full border p-2" value={profile.email} onChange={(e)=>setProfile({...profile,email:e.target.value})} /><button className="rounded border px-4 py-2">{t.save}</button><div><button onClick={toggle} className="rounded border px-4 py-2">Language</button><button onClick={toggleTheme} className="ml-2 rounded border px-4 py-2">Theme</button></div><button className="rounded border border-red-500 px-4 py-2 text-red-600">{t.deleteAccount}</button></div>;
}
