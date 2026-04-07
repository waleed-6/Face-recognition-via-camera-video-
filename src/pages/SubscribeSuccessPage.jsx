import { useSearchParams, Link } from "react-router-dom";
import { verifyPayment } from "../services/payment";
import { useEffect, useState } from "react";

export default function SubscribeSuccessPage() {
  const [search] = useSearchParams();
  const paymentId = search.get("paymentId");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (!paymentId) return;
    verifyPayment({ paymentId }).then((res) => setStatus(res.status));
  }, [paymentId]);

  return <div className="space-y-3"><h1>Payment Success</h1><p>Status: {status}</p><Link to="/dashboard" className="rounded bg-blue-600 px-4 py-2 text-white">Go to Dashboard</Link></div>;
}
