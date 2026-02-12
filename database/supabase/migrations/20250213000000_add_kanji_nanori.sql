-- Add nanori (name readings) to kanji table for completeness
ALTER TABLE public.kanji
  ADD COLUMN IF NOT EXISTS nanori text[] NOT NULL DEFAULT '{}';

COMMENT ON COLUMN public.kanji.nanori IS 'Name readings (e.g. ひろ for 大)';
