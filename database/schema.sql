-- ENUMS
CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'expired', 'cancelled');
CREATE TYPE exam_type AS ENUM ('mcq', 'true_false', 'short_answer', 'mixed');
CREATE TYPE question_type AS ENUM ('mcq', 'true_false', 'short_answer');
CREATE TYPE difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE exam_status AS ENUM ('generating', 'ready', 'failed');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  trial_started_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  subscription_status subscription_status DEFAULT 'trial',
  subscription_started_at TIMESTAMPTZ,
  subscription_ends_at TIMESTAMPTZ
);

-- PAYMENTS
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'SAR',
  status payment_status NOT NULL DEFAULT 'pending',
  provider TEXT NOT NULL DEFAULT 'placeholder',
  provider_payment_id TEXT,
  provider_response JSONB,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- EXAMS
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT,
  source_text TEXT,
  exam_type exam_type NOT NULL,
  difficulty difficulty NOT NULL DEFAULT 'medium',
  question_count INT NOT NULL,
  duration_minutes INT,
  status exam_status DEFAULT 'generating',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QUESTIONS
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type question_type NOT NULL,
  options JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  order_index INT NOT NULL
);

-- EXAM ATTEMPTS
CREATE TABLE exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  score INT,
  total_questions INT NOT NULL,
  answers JSONB NOT NULL
);

-- SUBSCRIPTIONS
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status subscription_status NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ends_at TIMESTAMPTZ,
  payment_id UUID REFERENCES payments(id),
  payment_reference TEXT
);
