-- Add AI-generated bio columns to athletes table
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS generated_headline TEXT,
ADD COLUMN IF NOT EXISTS generated_bio TEXT;

-- Update the updated_at timestamp
UPDATE athletes SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL;

-- Check the new columns
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name IN ('generated_headline', 'generated_bio');
