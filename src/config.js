export const config = {
  app: {
    nameAr: "اختبرني",
    nameEn: "Ikhtibarni",
    contactEmail: "hello@ikhtibarni.com",
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  },
  subscription: {
    priceMonthly: 29,
    currency: "SAR",
    freeTrialDays: 3,
  },
  payment: {
    providerName: "placeholder",
    publicKey: import.meta.env.VITE_PAYMENT_PUBLIC_KEY || "",
    webhookSecret: import.meta.env.VITE_PAYMENT_WEBHOOK_SECRET || "",
    currency: "SAR",
    successUrl:
      import.meta.env.VITE_PAYMENT_SUCCESS_URL ||
      "http://localhost:5173/subscribe/success",
    failUrl:
      import.meta.env.VITE_PAYMENT_FAIL_URL ||
      "http://localhost:5173/subscribe/fail",
  },
  language: {
    default: "ar",
    supported: ["ar", "en"],
  },
  features: {
    enableFreeTrial: true,
    enableSubscription: true,
    enableUpload: true,
    useSeedData: true,
  },
  exam: {
    minQuestions: 5,
    maxQuestions: 50,
    defaultQuestions: 10,
    minDurationMinutes: 10,
    maxDurationMinutes: 120,
    types: ["mcq", "true_false", "short_answer", "mixed"],
    difficulties: ["easy", "medium", "hard"],
  },
};
