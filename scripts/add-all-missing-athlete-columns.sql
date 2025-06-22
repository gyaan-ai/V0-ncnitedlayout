-- Add ALL missing columns to athletes table
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS commitment_date DATE,
ADD COLUMN IF NOT EXISTS college_interest_level VARCHAR(50),
ADD COLUMN IF NOT EXISTS college_preferences TEXT,
ADD COLUMN IF NOT EXISTS recruiting_notes TEXT,
ADD COLUMN IF NOT EXISTS academic_honors TEXT,
ADD COLUMN IF NOT EXISTS career_interests TEXT,
ADD COLUMN IF NOT EXISTS bio_summary TEXT,
ADD COLUMN IF NOT EXISTS media_notes TEXT,
ADD COLUMN IF NOT EXISTS twitter_handle VARCHAR(100),
ADD COLUMN IF NOT EXISTS parent_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS parent_relationship VARCHAR(50),
ADD COLUMN IF NOT EXISTS emergency_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS emergency_relationship VARCHAR(50);

-- Verify all columns now exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY column_name;

-- Show current athlete data to verify
SELECT id, first_name, last_name, hometown, commitment_date, college_interest_level
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey';
