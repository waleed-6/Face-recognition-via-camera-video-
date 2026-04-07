import { config } from "../config";

export class PaymentError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "PaymentError";
    this.cause = cause;
  }
}

const validStatuses = ["pending", "paid", "failed", "refunded"];

const makeId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `pay_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export async function initiatePayment({ amount, currency, description, userId, userEmail }) {
  try {
    if (!amount || !currency || !description || !userId || !userEmail) {
      throw new Error("Missing payment parameters");
    }
    if (config.payment.providerName === "placeholder") {
      return { id: makeId(), status: "pending", checkoutUrl: null };
    }
    throw new Error("Real provider is not configured yet");
  } catch (error) {
    throw new PaymentError("Unable to initiate payment", error);
  }
}

export async function verifyPayment({ paymentId }) {
  try {
    if (!paymentId) throw new Error("paymentId is required");
    if (config.payment.providerName === "placeholder") {
      return { status: "paid", paymentId };
    }
    throw new Error("Real provider verification is not implemented yet");
  } catch (error) {
    throw new PaymentError("Unable to verify payment", error);
  }
}

export async function getPaymentStatus({ paymentId }) {
  try {
    if (!paymentId) throw new Error("paymentId is required");
    if (config.payment.providerName === "placeholder") return { status: "pending", paymentId };
    throw new Error("Real provider status check is not implemented yet");
  } catch (error) {
    throw new PaymentError("Unable to retrieve payment status", error);
  }
}

export function assertPaymentStatus(status) {
  if (!validStatuses.includes(status)) {
    throw new PaymentError(`Invalid payment status: ${status}`);
  }
}
