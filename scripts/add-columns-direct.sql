-- Add the columns using the most direct approach
ALTER TABLE public.athletes ADD COLUMN IF NOT EXISTS generated_headline TEXT;
ALTER TABLE public.athletes ADD COLUMN IF NOT EXISTS generated_bio TEXT;

-- Verify they were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'athletes' 
AND column_name IN ('generated_headline', 'generated_bio');
