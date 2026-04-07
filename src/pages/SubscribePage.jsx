import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { config } from "../config";
import { initiatePayment } from "../services/payment";

export default function SubscribePage() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [message, setMessage] = useState("");
  const expired = user?.subscription_status === "expired";

  const subscribe = async () => {
    const payment = await initiatePayment({ amount: config.subscription.priceMonthly, currency: config.payment.currency, description: "Ikhtibarni monthly subscription", userId: user?.id || "guest", userEmail: user?.email || "guest@example.com" });
    setMessage(`Payment ${payment.status}`);
    nav(`/subscribe/success?paymentId=${payment.id}`);
  };

  return <div className={expired ? "min-h-[70vh]" : ""}>{expired && <h1 className="mb-4 text-2xl font-bold">انتهت تجربتك المجانية</h1>}<p>Current: {user?.subscription_status || "guest"}</p><p>{config.subscription.priceMonthly} {config.subscription.currency}/month</p><ul className="list-disc px-4"><li>AI exam generation</li><li>All exam types</li><li>Dashboard & review</li></ul><button className="mt-3 rounded bg-blue-600 px-4 py-2 text-white" onClick={subscribe}>Subscribe Now</button>{user?.subscription_status === "active" && <button className="ml-2 rounded border px-4 py-2">Cancel</button>}<p>{message}</p></div>;
}
