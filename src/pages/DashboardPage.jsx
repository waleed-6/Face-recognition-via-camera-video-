import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { seedData } from "../data/seed";

function remaining(endsAt) {
  const diff = new Date(endsAt).getTime() - Date.now();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  return `${days}d ${hours}h`;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const stats = useMemo(() => ({
    exams: seedData.exams.length,
    answered: seedData.questions.length,
    avg: Math.round(seedData.attempts.reduce((s, a) => s + a.score, 0) / seedData.attempts.length),
  }), []);

  return <div className="space-y-4">{user?.subscription_status === "trial" && <div className="rounded bg-orange-100 p-3 text-orange-800">{t.trialCopy} • {remaining(user.trial_ends_at)}</div>}<div className="grid gap-3 md:grid-cols-3"><div className="rounded border p-4">{t.totalExams}: {stats.exams}</div><div className="rounded border p-4">{t.totalAnswered}: {stats.answered}</div><div className="rounded border p-4">{t.averageScore}: {stats.avg}%</div></div><Link className="inline-block rounded bg-blue-600 px-4 py-2 text-white" to="/generate">{t.generateExam}</Link><div className="space-y-2">{seedData.exams.map((e)=><div key={e.id} className="rounded border p-3"><b>{e.title}</b> - {e.exam_type} - {e.difficulty} - {e.status}</div>)}</div></div>;
}
