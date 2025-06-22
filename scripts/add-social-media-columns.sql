-- Add social media and other missing columns to athletes table
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS instagram_handle VARCHAR(255),
ADD COLUMN IF NOT EXISTS twitter_handle VARCHAR(255),
ADD COLUMN IF NOT EXISTS bio_summary TEXT,
ADD COLUMN IF NOT EXISTS media_notes TEXT,
ADD COLUMN IF NOT EXISTS parent_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_relationship VARCHAR(100),
ADD COLUMN IF NOT EXISTS parent_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS emergency_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS emergency_relationship VARCHAR(100),
ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS anticipated_weight VARCHAR(10),
ADD COLUMN IF NOT EXISTS college_interest_level VARCHAR(50),
ADD COLUMN IF NOT EXISTS college_preferences TEXT,
ADD COLUMN IF NOT EXISTS recruiting_notes TEXT,
ADD COLUMN IF NOT EXISTS recruiting_summary TEXT,
ADD COLUMN IF NOT EXISTS commitment_date DATE,
ADD COLUMN IF NOT EXISTS coach_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS commitment_announcement TEXT;

-- Check what columns we have now
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY column_name;
