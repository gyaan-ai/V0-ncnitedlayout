-- Simple direct fix for AI columns
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS generated_headline TEXT;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS generated_bio TEXT;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS bio_generated_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS headline_generated_at TIMESTAMP WITH TIME ZONE;

-- Verify the columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name IN ('generated_headline', 'generated_bio', 'bio_generated_at', 'headline_generated_at')
ORDER BY column_name;
