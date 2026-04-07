import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import { useLanguage } from "../contexts/LanguageContext";

export default function GenerateExamPage() {
  const { t } = useLanguage();
  const nav = useNavigate();
  const [text, setText] = useState("");
  const [form, setForm] = useState({ title: "", subject: "", exam_type: "mixed", difficulty: "medium", question_count: config.exam.defaultQuestions, duration_minutes: "" });
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const submit = (e) => {
    e.preventDefault();
    setTimeout(() => nav("/exam/e2"), 600);
  };

  return <form onSubmit={submit} className="space-y-3"><h2>{t.generateExam}</h2><textarea rows={7} className="w-full border p-2" placeholder={t.uploadPrompt} value={text} onChange={(e)=>setText(e.target.value)} /><div>{wordCount} words</div><input required className="w-full border p-2" placeholder={t.title} onChange={(e)=>setForm({...form,title:e.target.value})} /><input className="w-full border p-2" placeholder={t.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} /><select className="w-full border p-2" onChange={(e)=>setForm({...form,exam_type:e.target.value})}>{config.exam.types.map((x)=><option key={x}>{x}</option>)}</select><select className="w-full border p-2" onChange={(e)=>setForm({...form,difficulty:e.target.value})}>{config.exam.difficulties.map((x)=><option key={x}>{x}</option>)}</select><input type="range" min={config.exam.minQuestions} max={config.exam.maxQuestions} value={form.question_count} onChange={(e)=>setForm({...form,question_count:Number(e.target.value)})} /><div>{t.questionCount}: {form.question_count}</div><input className="w-full border p-2" placeholder={t.timer} type="number" onChange={(e)=>setForm({...form,duration_minutes:e.target.value})} /><button className="rounded bg-blue-600 px-4 py-2 text-white">Submit</button></form>;
}
