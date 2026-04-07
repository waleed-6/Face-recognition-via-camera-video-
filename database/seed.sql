-- DELETE IN PRODUCTION
INSERT INTO users (id, name, email, password_hash, trial_started_at, trial_ends_at, subscription_status)
VALUES
('11111111-1111-1111-1111-111111111111', 'Trial User', 'trial@ikhtibarni.com', 'hash', NOW(), NOW() + INTERVAL '2 days', 'trial'),
('22222222-2222-2222-2222-222222222222', 'Active User', 'active@ikhtibarni.com', 'hash', NOW() - INTERVAL '30 days', NOW() - INTERVAL '20 days', 'active'),
('33333333-3333-3333-3333-333333333333', 'Expired User', 'expired@ikhtibarni.com', 'hash', NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 day', 'expired');

INSERT INTO payments (id, user_id, amount, currency, status, provider, description)
VALUES
('aaaaaaa1-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 29, 'SAR', 'paid', 'placeholder', 'Monthly subscription'),
('aaaaaaa2-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 29, 'SAR', 'failed', 'placeholder', 'Failed subscription');

INSERT INTO subscriptions (user_id, status, started_at, ends_at, payment_id, payment_reference)
VALUES ('22222222-2222-2222-2222-222222222222', 'active', NOW() - INTERVAL '5 days', NOW() + INTERVAL '25 days', 'aaaaaaa1-1111-1111-1111-111111111111', 'seed-paid-1');

INSERT INTO exams (id, user_id, title, subject, source_text, exam_type, difficulty, question_count, duration_minutes, status)
VALUES
('e1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Biology Basics', 'Biology', 'seed', 'mcq', 'easy', 5, 20, 'ready'),
('e2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Math Set', 'Math', 'seed', 'mixed', 'medium', 6, 25, 'ready'),
('e3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Physics TF', 'Physics', 'seed', 'true_false', 'hard', 3, 10, 'ready'),
('e4444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', 'Essay Drill', 'History', 'seed', 'short_answer', 'medium', 3, 30, 'failed'),
('e5555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'Chem Mix', 'Chemistry', 'seed', 'mixed', 'hard', 3, 15, 'generating');

INSERT INTO questions (exam_id, question_text, question_type, options, correct_answer, explanation, order_index)
SELECT
CASE WHEN i <= 4 THEN 'e1111111-1111-1111-1111-111111111111'
     WHEN i <= 8 THEN 'e2222222-2222-2222-2222-222222222222'
     WHEN i <= 12 THEN 'e3333333-3333-3333-3333-333333333333'
     WHEN i <= 16 THEN 'e4444444-4444-4444-4444-444444444444'
     ELSE 'e5555555-5555-5555-5555-555555555555' END,
'Seed question ' || i,
CASE WHEN i <= 7 THEN 'mcq'::question_type WHEN i <= 14 THEN 'true_false'::question_type ELSE 'short_answer'::question_type END,
CASE WHEN i <= 7 THEN '["A","B","C","D"]'::jsonb ELSE NULL END,
CASE WHEN i <= 7 THEN 'A' WHEN i <= 14 THEN 'true' ELSE 'Model answer' END,
'Seed explanation',
i
FROM generate_series(1,20) AS i;

INSERT INTO exam_attempts (exam_id, user_id, submitted_at, score, total_questions, answers)
VALUES
('e1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', NOW(), 80, 5, '{}'),
('e2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', NOW(), 67, 6, '{}');
