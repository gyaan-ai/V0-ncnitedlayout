-- Add missing commitment and recruiting columns to athletes table
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS anticipated_weight VARCHAR(10),
ADD COLUMN IF NOT EXISTS college_interest_level VARCHAR(50),
ADD COLUMN IF NOT EXISTS college_preferences TEXT,
ADD COLUMN IF NOT EXISTS recruiting_notes TEXT,
ADD COLUMN IF NOT EXISTS recruiting_summary TEXT,
ADD COLUMN IF NOT EXISTS commitment_announcement TEXT,
ADD COLUMN IF NOT EXISTS coach_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS commitment_date DATE,
ADD COLUMN IF NOT EXISTS bio_summary TEXT,
ADD COLUMN IF NOT EXISTS media_notes TEXT,
ADD COLUMN IF NOT EXISTS parent_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_relationship VARCHAR(50),
ADD COLUMN IF NOT EXISTS parent_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS emergency_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS emergency_relationship VARCHAR(50),
ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS instagram_handle VARCHAR(100),
ADD COLUMN IF NOT EXISTS twitter_handle VARCHAR(100);

-- Update any existing records to have default values where appropriate
UPDATE athletes 
SET 
  college_interest_level = 'Medium'
WHERE college_interest_level IS NULL AND is_committed = false;

UPDATE athletes 
SET 
  college_interest_level = 'Committed'
WHERE college_interest_level IS NULL AND is_committed = true;

-- Show the updated table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY ordinal_position;
