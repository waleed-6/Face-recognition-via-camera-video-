import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    await register(form);
    nav("/dashboard");
  };
  return <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-md space-y-3 rounded border p-5"><h1>{t.register}</h1><p>{t.trialCopy}</p>{error && <p className="text-red-600">{error}</p>}<input required placeholder={t.fullName} className="w-full border p-2" onChange={(e)=>setForm({...form,name:e.target.value})}/><input required type="email" placeholder={t.email} className="w-full border p-2" onChange={(e)=>setForm({...form,email:e.target.value})}/><input required type="password" placeholder={t.password} className="w-full border p-2" onChange={(e)=>setForm({...form,password:e.target.value})}/><input required type="password" placeholder={t.confirmPassword} className="w-full border p-2" onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}/><button className="w-full bg-blue-600 p-2 text-white">{t.register}</button><Link to="/login">{t.login}</Link></form>;
}
