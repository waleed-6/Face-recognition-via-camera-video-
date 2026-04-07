import { useState } from "react";
import { seedData } from "../data/seed";

export default function ExamViewPage() {
  const questions = seedData.questions.slice(0, 10);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const autoQuestions = questions.filter((q) => q.question_type !== "short_answer").length;
  const score = Math.round((Object.keys(answers).length / autoQuestions) * 100) || 0;

  if (submitted) return <div className="space-y-3"><h2>Results</h2><p>Score: {score}% ({score >= 60 ? "Pass" : "Fail"})</p>{questions.map((q)=><div key={q.id} className="rounded border p-2"><p>{q.question_text}</p><p>Model/Correct: {q.correct_answer}</p><p>{q.explanation}</p></div>)}</div>;

  return <div className="space-y-4"><div className="h-2 w-full rounded bg-slate-200"><div className="h-2 rounded bg-blue-600" style={{width:`${(Object.keys(answers).length/questions.length)*100}%`}}/></div>{questions.map((q)=><div key={q.id} className="space-y-2 rounded border p-3"><p>{q.question_text}</p>{q.question_type === "mcq" && q.options.map((opt)=><label key={opt} className="block rounded border p-2"><input type="radio" name={q.id} onChange={()=>setAnswers({...answers,[q.id]:opt})}/> {opt}</label>)}{q.question_type === "true_false" && <div className="flex gap-2"><button type="button" className="rounded border px-4 py-2" onClick={()=>setAnswers({...answers,[q.id]:"true"})}>صح</button><button type="button" className="rounded border px-4 py-2" onClick={()=>setAnswers({...answers,[q.id]:"false"})}>خطأ</button></div>}{q.question_type === "short_answer" && <textarea className="w-full border p-2" onChange={(e)=>setAnswers({...answers,[q.id]:e.target.value})} />}</div>)}<button className="rounded bg-blue-600 px-4 py-2 text-white" disabled={Object.keys(answers).length < questions.length} onClick={()=>setSubmitted(true)}>Submit</button></div>;
}
