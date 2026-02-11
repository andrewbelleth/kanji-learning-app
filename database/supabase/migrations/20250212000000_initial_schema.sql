-- =============================================
-- KanGo initial schema (README 5.1, 5.2, 5.3)
-- Rolekey is not used; access is via JWT + RLS (auth.uid()).
-- =============================================

-- Enable UUID extension if not already (Supabase has it by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------
-- 1. Levels (1-60, tier). Rows inserted via seed.
-- ---------------------------------------------
CREATE TABLE public.levels (
  id integer PRIMARY KEY CHECK (id >= 1 AND id <= 60),
  tier text NOT NULL CHECK (tier IN ('pleasant', 'painful', 'death', 'hell', 'paradise', 'reality'))
);

-- ---------------------------------------------
-- 2. Content: radicals
-- ---------------------------------------------
CREATE TABLE public.radicals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character text NOT NULL,
  name text NOT NULL,
  name_pt text NOT NULL,
  level_id integer NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  mnemonic text NOT NULL DEFAULT '',
  mnemonic_pt text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_radicals_level_id ON public.radicals(level_id);

-- ---------------------------------------------
-- 3. Content: kanji
-- ---------------------------------------------
CREATE TABLE public.kanji (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character text NOT NULL,
  meaning text NOT NULL,
  meaning_pt text NOT NULL,
  alternatives text[] NOT NULL DEFAULT '{}',
  level_id integer NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  onyomi text[] NOT NULL DEFAULT '{}',
  kunyomi text[] NOT NULL DEFAULT '{}',
  meaning_mnemonic text NOT NULL DEFAULT '',
  meaning_mnemonic_pt text NOT NULL DEFAULT '',
  reading_mnemonic text NOT NULL DEFAULT '',
  reading_mnemonic_pt text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_kanji_level_id ON public.kanji(level_id);

-- ---------------------------------------------
-- 4. N:N kanji_radicals
-- ---------------------------------------------
CREATE TABLE public.kanji_radicals (
  kanji_id uuid NOT NULL REFERENCES public.kanji(id) ON DELETE CASCADE,
  radical_id uuid NOT NULL REFERENCES public.radicals(id) ON DELETE CASCADE,
  PRIMARY KEY (kanji_id, radical_id)
);

CREATE INDEX idx_kanji_radicals_radical_id ON public.kanji_radicals(radical_id);

-- ---------------------------------------------
-- 5. Content: vocabulary
-- ---------------------------------------------
CREATE TABLE public.vocabulary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  reading text NOT NULL,
  meaning text NOT NULL,
  meaning_pt text NOT NULL,
  word_type text NOT NULL DEFAULT '',
  level_id integer NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  meaning_explanation text NOT NULL DEFAULT '',
  meaning_explanation_pt text NOT NULL DEFAULT '',
  reading_explanation text NOT NULL DEFAULT '',
  reading_explanation_pt text NOT NULL DEFAULT '',
  context_sentences jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_vocabulary_level_id ON public.vocabulary(level_id);

-- ---------------------------------------------
-- 6. N:N vocabulary_kanji
-- ---------------------------------------------
CREATE TABLE public.vocabulary_kanji (
  vocabulary_id uuid NOT NULL REFERENCES public.vocabulary(id) ON DELETE CASCADE,
  kanji_id uuid NOT NULL REFERENCES public.kanji(id) ON DELETE CASCADE,
  PRIMARY KEY (vocabulary_id, kanji_id)
);

CREATE INDEX idx_vocabulary_kanji_kanji_id ON public.vocabulary_kanji(kanji_id);

-- ---------------------------------------------
-- 7. User progress (Auth-linked)
-- ---------------------------------------------
CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  current_level integer NOT NULL DEFAULT 1 CHECK (current_level >= 1 AND current_level <= 60),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.user_item_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  item_id uuid NOT NULL,
  item_type text NOT NULL CHECK (item_type IN ('radical', 'kanji', 'vocabulary')),
  srs_stage smallint NOT NULL DEFAULT 0 CHECK (srs_stage >= 0 AND srs_stage <= 9),
  next_review_at timestamptz,
  correct_count integer NOT NULL DEFAULT 0,
  incorrect_count integer NOT NULL DEFAULT 0,
  unlocked_at timestamptz,
  burned_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_item_progress_user_next_review ON public.user_item_progress(user_id, next_review_at);
CREATE INDEX idx_user_item_progress_user_item_type ON public.user_item_progress(user_id, item_type);
CREATE INDEX idx_user_item_progress_user_id ON public.user_item_progress(user_id);

-- ---------------------------------------------
-- 8. Trigger: create user_profiles on auth.users insert
-- ---------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, current_level)
  VALUES (new.id, 1);
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ---------------------------------------------
-- 9. RLS (anon key + JWT; auth.uid() for user data)
-- ---------------------------------------------
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radicals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanji ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanji_radicals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_kanji ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_item_progress ENABLE ROW LEVEL SECURITY;

-- Content: read-only for anon and authenticated
CREATE POLICY "levels_select" ON public.levels FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "radicals_select" ON public.radicals FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "kanji_select" ON public.kanji FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "kanji_radicals_select" ON public.kanji_radicals FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "vocabulary_select" ON public.vocabulary FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "vocabulary_kanji_select" ON public.vocabulary_kanji FOR SELECT TO anon, authenticated USING (true);

-- user_profiles: own row only (auth.uid())
CREATE POLICY "user_profiles_select" ON public.user_profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "user_profiles_insert" ON public.user_profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "user_profiles_update" ON public.user_profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "user_profiles_delete" ON public.user_profiles FOR DELETE TO authenticated USING (id = auth.uid());

-- user_item_progress: own rows only (user_id = auth.uid())
CREATE POLICY "user_item_progress_select" ON public.user_item_progress FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "user_item_progress_insert" ON public.user_item_progress FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "user_item_progress_update" ON public.user_item_progress FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "user_item_progress_delete" ON public.user_item_progress FOR DELETE TO authenticated USING (user_id = auth.uid());
