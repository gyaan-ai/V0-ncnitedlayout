-- Add the missing timestamp columns for AI summary fields
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS bio_generated_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS headline_generated_at TIMESTAMP;

-- Verify the columns were added
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name IN ('bio_generated_at', 'headline_generated_at')
ORDER BY column_name;
