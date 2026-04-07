import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function LoginPage() {
  const { login, user } = useAuth();
  const { t } = useLanguage();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    const status = user?.subscription_status;
    nav(status === "expired" ? "/subscribe" : "/dashboard");
  };

  return <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-md space-y-3 rounded border p-5"><h1>{t.login}</h1><input required type="email" placeholder={t.email} className="w-full border p-2" onChange={(e)=>setEmail(e.target.value)}/><input required type="password" placeholder={t.password} className="w-full border p-2" onChange={(e)=>setPassword(e.target.value)}/><button className="w-full bg-blue-600 p-2 text-white">{t.login}</button><Link to="/register">{t.register}</Link></form>;
}
