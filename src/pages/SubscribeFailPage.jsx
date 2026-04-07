import { Link } from "react-router-dom";

export default function SubscribeFailPage() {
  return <div className="space-y-3"><h1>Payment Failed</h1><p>Something went wrong with your transaction.</p><Link to="/subscribe" className="rounded bg-blue-600 px-4 py-2 text-white">Try Again</Link></div>;
}
