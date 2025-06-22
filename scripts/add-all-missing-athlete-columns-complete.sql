-- Add all missing columns to athletes table in one go
-- This script is safe to run multiple times (uses IF NOT EXISTS)

-- Core commitment and status columns
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS is_committed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Commitment details
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS anticipated_weight VARCHAR(10),
ADD COLUMN IF NOT EXISTS college_interest_level VARCHAR(50),
ADD COLUMN IF NOT EXISTS college_preferences TEXT,
ADD COLUMN IF NOT EXISTS recruiting_notes TEXT,
ADD COLUMN IF NOT EXISTS recruiting_summary TEXT,
ADD COLUMN IF NOT EXISTS commitment_announcement TEXT,
ADD COLUMN IF NOT EXISTS coach_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS commitment_date DATE;

-- Personal and contact info
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS bio_summary TEXT,
ADD COLUMN IF NOT EXISTS media_notes TEXT,
ADD COLUMN IF NOT EXISTS parent_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_relationship VARCHAR(50),
ADD COLUMN IF NOT EXISTS parent_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS emergency_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS emergency_relationship VARCHAR(50),
ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(20);

-- Social media
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS instagram_handle VARCHAR(100),
ADD COLUMN IF NOT EXISTS twitter_handle VARCHAR(100);

-- Academic fields (if missing)
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS gpa DECIMAL(3,2),
ADD COLUMN IF NOT EXISTS sat_score INTEGER,
ADD COLUMN IF NOT EXISTS act_score INTEGER,
ADD COLUMN IF NOT EXISTS academic_honors TEXT;

-- Update existing records with sensible defaults
UPDATE athletes 
SET 
  is_committed = CASE 
    WHEN college_commitment IS NOT NULL AND college_commitment != '' AND college_commitment != 'Pending' 
    THEN true 
    ELSE false 
  END,
  is_active = true,
  is_featured = false,
  college_interest_level = CASE 
    WHEN college_commitment IS NOT NULL AND college_commitment != '' AND college_commitment != 'Pending' 
    THEN 'Committed'
    ELSE 'Medium'
  END
WHERE is_committed IS NULL OR college_interest_level IS NULL;

-- Show the updated table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY ordinal_position;
