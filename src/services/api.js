import { config } from "../config";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${config.api.baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(body.message || "API request failed", response.status);
  }
  return response.status === 204 ? null : response.json();
}

export const api = {
  request,
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/auth/me"),
  listExams: () => request("/exams"),
  generateExam: (payload) => request("/exams", { method: "POST", body: JSON.stringify(payload) }),
  examById: (id) => request(`/exams/${id}`),
  pollExam: (id) => request(`/exams/${id}/status`),
  updateProfile: (payload) => request("/users/me", { method: "PATCH", body: JSON.stringify(payload) }),
  updatePassword: (payload) => request("/users/me/password", { method: "PATCH", body: JSON.stringify(payload) }),
  deleteAccount: () => request("/users/me", { method: "DELETE" }),
  subscription: () => request("/subscriptions/me"),
  cancelSubscription: () => request("/subscriptions/cancel", { method: "POST" }),
  initiatePayment: () => request("/payments/initiate", { method: "POST" }),
  paymentStatus: (id) => request(`/payments/${id}/status`),
};

export { ApiError };
