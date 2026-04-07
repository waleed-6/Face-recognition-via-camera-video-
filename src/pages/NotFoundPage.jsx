import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export default function NotFoundPage() {
  const { t } = useLanguage();
  return <div className="p-6"><h1>{t.notFound}</h1><Link className="text-blue-600" to="/">{t.backHome}</Link></div>;
}
