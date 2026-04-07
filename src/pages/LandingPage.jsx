import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { config } from "../config";

export default function LandingPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-900 dark:text-white">
      <section className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold">{t.heroTitle}</h1>
        <p className="mt-3">{t.heroSubtitle}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link className="rounded bg-blue-600 px-4 py-2 text-white" to="/register">{t.startFree}</Link>
          <Link className="rounded border px-4 py-2" to="/login">{t.login}</Link>
        </div>
      </section>
      <section className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
        <div className="rounded border p-4">1) {t.step1}</div>
        <div className="rounded border p-4">2) {t.step2}</div>
        <div className="rounded border p-4">3) {t.step3}</div>
      </section>
      <section className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-4">
        {config.exam.types.map((type) => <div key={type} className="rounded border p-4">{type}</div>)}
      </section>
      <section className="mx-auto mt-8 max-w-5xl rounded border p-6 text-center">
        <h2 className="text-2xl">{t.pricing}</h2>
        <p className="mt-2 text-xl">{config.subscription.priceMonthly} {config.subscription.currency}/{t.monthlyPlan}</p>
        <p>{t.trialCopy}</p>
      </section>
      <footer className="mx-auto mt-10 max-w-5xl border-t pt-4 text-sm">{config.app.contactEmail}</footer>
    </div>
  );
}
