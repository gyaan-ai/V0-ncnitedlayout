-- Add missing columns to athletes table
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS college_interest_level VARCHAR(50),
ADD COLUMN IF NOT EXISTS college_preferences TEXT,
ADD COLUMN IF NOT EXISTS recruiting_notes TEXT,
ADD COLUMN IF NOT EXISTS academic_honors TEXT,
ADD COLUMN IF NOT EXISTS career_interests TEXT,
ADD COLUMN IF NOT EXISTS bio_summary TEXT,
ADD COLUMN IF NOT EXISTS media_notes TEXT,
ADD COLUMN IF NOT EXISTS twitter_handle VARCHAR(100);

-- Verify the columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY column_name;
