-- EMERGENCY MIGRATION - Run this directly in your database console
-- This will add ALL missing columns needed for the athlete management system

-- Add all missing columns (safe to run multiple times)
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS is_committed BOOLEAN DEFAULT FALSE;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS anticipated_weight VARCHAR(10);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS college_interest_level VARCHAR(50);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS college_preferences TEXT;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS recruiting_notes TEXT;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS recruiting_summary TEXT;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS commitment_announcement TEXT;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS coach_name VARCHAR(255);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS commitment_date DATE;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS academic_honors TEXT;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS intended_major VARCHAR(255);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS parent_name VARCHAR(255);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS parent_relationship VARCHAR(50);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS parent_email VARCHAR(255);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS parent_phone VARCHAR(50);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS emergency_name VARCHAR(255);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS emergency_relationship VARCHAR(50);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(50);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS bio_summary TEXT;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS media_notes TEXT;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS instagram_handle VARCHAR(100);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS twitter_handle VARCHAR(100);
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS commitment_photo_url TEXT;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS red_team BOOLEAN DEFAULT FALSE;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS black_team BOOLEAN DEFAULT FALSE;
ALTER TABLE athletes ADD COLUMN IF NOT EXISTS white_team BOOLEAN DEFAULT FALSE;

-- Verify it worked
SELECT COUNT(*) as total_columns 
FROM information_schema.columns 
WHERE table_name = 'athletes';

-- Test with Liam's record
SELECT first_name, last_name, anticipated_weight, college_interest_level
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey'
LIMIT 1;
