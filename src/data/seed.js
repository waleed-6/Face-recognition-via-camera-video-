// DELETE THIS FILE IN PRODUCTION
import { config } from "../config";

const now = new Date();
const addDays = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

export const seedData = {
  users: [
    {
      id: "11111111-1111-1111-1111-111111111111",
      name: "سارة خالد",
      email: "trial@ikhtibarni.com",
      subscription_status: "trial",
      trial_started_at: now.toISOString(),
      trial_ends_at: addDays(config.subscription.freeTrialDays - 1),
    },
    {
      id: "22222222-2222-2222-2222-222222222222",
      name: "Omar Fahad",
      email: "active@ikhtibarni.com",
      subscription_status: "active",
      subscription_ends_at: addDays(25),
    },
    {
      id: "33333333-3333-3333-3333-333333333333",
      name: "Layan Ahmed",
      email: "expired@ikhtibarni.com",
      subscription_status: "expired",
      trial_ends_at: addDays(-1),
    },
  ],
  exams: [
    { id: "e1", user_id: "11111111-1111-1111-1111-111111111111", title: "Biology Quiz", subject: "Biology", exam_type: "mcq", difficulty: "easy", question_count: 8, status: "ready" },
    { id: "e2", user_id: "22222222-2222-2222-2222-222222222222", title: "Math Midterm", subject: "Math", exam_type: "mixed", difficulty: "medium", question_count: 12, status: "ready" },
    { id: "e3", user_id: "22222222-2222-2222-2222-222222222222", title: "Chemistry Drill", subject: "Chemistry", exam_type: "true_false", difficulty: "hard", question_count: 10, status: "ready" },
    { id: "e4", user_id: "33333333-3333-3333-3333-333333333333", title: "Physics Review", subject: "Physics", exam_type: "short_answer", difficulty: "medium", question_count: 6, status: "failed" },
    { id: "e5", user_id: "11111111-1111-1111-1111-111111111111", title: "History Final", subject: "History", exam_type: "mixed", difficulty: "hard", question_count: 15, status: "generating" },
  ],
  questions: Array.from({ length: 20 }, (_, i) => {
    const t = i < 7 ? "mcq" : i < 14 ? "true_false" : "short_answer";
    return {
      id: `q${i + 1}`,
      exam_id: i % 2 === 0 ? "e1" : "e2",
      question_type: t,
      question_text: `Sample question ${i + 1}`,
      options: t === "mcq" ? ["A", "B", "C", "D"] : null,
      correct_answer: t === "true_false" ? "true" : "Model answer",
      explanation: "Explanation",
      order_index: i + 1,
    };
  }),
  attempts: [
    { id: "a1", exam_id: "e1", user_id: "11111111-1111-1111-1111-111111111111", score: 75, total_questions: 8, answers: {} },
    { id: "a2", exam_id: "e2", user_id: "22222222-2222-2222-2222-222222222222", score: 88, total_questions: 12, answers: {} },
  ],
  payments: [
    { id: "p1", user_id: "22222222-2222-2222-2222-222222222222", amount: config.subscription.priceMonthly, currency: config.subscription.currency, status: "paid" },
    { id: "p2", user_id: "33333333-3333-3333-3333-333333333333", amount: config.subscription.priceMonthly, currency: config.subscription.currency, status: "failed" },
  ],
};
