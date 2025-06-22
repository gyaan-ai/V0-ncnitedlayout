-- Safe migration script that adds missing columns one by one
-- This script can be run multiple times safely

-- Add commitment status columns
DO $$ 
BEGIN
  -- Add is_committed column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'is_committed'
  ) THEN
    ALTER TABLE athletes ADD COLUMN is_committed BOOLEAN DEFAULT false;
    RAISE NOTICE 'Added is_committed column';
  ELSE
    RAISE NOTICE 'is_committed column already exists';
  END IF;

  -- Add is_featured column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'is_featured'
  ) THEN
    ALTER TABLE athletes ADD COLUMN is_featured BOOLEAN DEFAULT false;
    RAISE NOTICE 'Added is_featured column';
  ELSE
    RAISE NOTICE 'is_featured column already exists';
  END IF;

  -- Add is_active column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE athletes ADD COLUMN is_active BOOLEAN DEFAULT true;
    RAISE NOTICE 'Added is_active column';
  ELSE
    RAISE NOTICE 'is_active column already exists';
  END IF;

  -- Add anticipated_weight column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'anticipated_weight'
  ) THEN
    ALTER TABLE athletes ADD COLUMN anticipated_weight VARCHAR(10);
    RAISE NOTICE 'Added anticipated_weight column';
  ELSE
    RAISE NOTICE 'anticipated_weight column already exists';
  END IF;

  -- Add college_interest_level column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'college_interest_level'
  ) THEN
    ALTER TABLE athletes ADD COLUMN college_interest_level VARCHAR(50);
    RAISE NOTICE 'Added college_interest_level column';
  ELSE
    RAISE NOTICE 'college_interest_level column already exists';
  END IF;

  -- Add college_preferences column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'college_preferences'
  ) THEN
    ALTER TABLE athletes ADD COLUMN college_preferences TEXT;
    RAISE NOTICE 'Added college_preferences column';
  ELSE
    RAISE NOTICE 'college_preferences column already exists';
  END IF;

  -- Add recruiting_notes column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'recruiting_notes'
  ) THEN
    ALTER TABLE athletes ADD COLUMN recruiting_notes TEXT;
    RAISE NOTICE 'Added recruiting_notes column';
  ELSE
    RAISE NOTICE 'recruiting_notes column already exists';
  END IF;

  -- Add recruiting_summary column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'recruiting_summary'
  ) THEN
    ALTER TABLE athletes ADD COLUMN recruiting_summary TEXT;
    RAISE NOTICE 'Added recruiting_summary column';
  ELSE
    RAISE NOTICE 'recruiting_summary column already exists';
  END IF;

  -- Add commitment_announcement column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'commitment_announcement'
  ) THEN
    ALTER TABLE athletes ADD COLUMN commitment_announcement TEXT;
    RAISE NOTICE 'Added commitment_announcement column';
  ELSE
    RAISE NOTICE 'commitment_announcement column already exists';
  END IF;

  -- Add coach_name column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'coach_name'
  ) THEN
    ALTER TABLE athletes ADD COLUMN coach_name VARCHAR(255);
    RAISE NOTICE 'Added coach_name column';
  ELSE
    RAISE NOTICE 'coach_name column already exists';
  END IF;

  -- Add commitment_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'commitment_date'
  ) THEN
    ALTER TABLE athletes ADD COLUMN commitment_date DATE;
    RAISE NOTICE 'Added commitment_date column';
  ELSE
    RAISE NOTICE 'commitment_date column already exists';
  END IF;

  -- Add bio_summary column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'bio_summary'
  ) THEN
    ALTER TABLE athletes ADD COLUMN bio_summary TEXT;
    RAISE NOTICE 'Added bio_summary column';
  ELSE
    RAISE NOTICE 'bio_summary column already exists';
  END IF;

  -- Add media_notes column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'media_notes'
  ) THEN
    ALTER TABLE athletes ADD COLUMN media_notes TEXT;
    RAISE NOTICE 'Added media_notes column';
  ELSE
    RAISE NOTICE 'media_notes column already exists';
  END IF;

  -- Add parent contact columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'parent_name'
  ) THEN
    ALTER TABLE athletes ADD COLUMN parent_name VARCHAR(255);
    RAISE NOTICE 'Added parent_name column';
  ELSE
    RAISE NOTICE 'parent_name column already exists';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'parent_relationship'
  ) THEN
    ALTER TABLE athletes ADD COLUMN parent_relationship VARCHAR(50);
    RAISE NOTICE 'Added parent_relationship column';
  ELSE
    RAISE NOTICE 'parent_relationship column already exists';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'parent_email'
  ) THEN
    ALTER TABLE athletes ADD COLUMN parent_email VARCHAR(255);
    RAISE NOTICE 'Added parent_email column';
  ELSE
    RAISE NOTICE 'parent_email column already exists';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'parent_phone'
  ) THEN
    ALTER TABLE athletes ADD COLUMN parent_phone VARCHAR(20);
    RAISE NOTICE 'Added parent_phone column';
  ELSE
    RAISE NOTICE 'parent_phone column already exists';
  END IF;

  -- Add emergency contact columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'emergency_name'
  ) THEN
    ALTER TABLE athletes ADD COLUMN emergency_name VARCHAR(255);
    RAISE NOTICE 'Added emergency_name column';
  ELSE
    RAISE NOTICE 'emergency_name column already exists';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'emergency_relationship'
  ) THEN
    ALTER TABLE athletes ADD COLUMN emergency_relationship VARCHAR(50);
    RAISE NOTICE 'Added emergency_relationship column';
  ELSE
    RAISE NOTICE 'emergency_relationship column already exists';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'emergency_phone'
  ) THEN
    ALTER TABLE athletes ADD COLUMN emergency_phone VARCHAR(20);
    RAISE NOTICE 'Added emergency_phone column';
  ELSE
    RAISE NOTICE 'emergency_phone column already exists';
  END IF;

  -- Add social media columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'instagram_handle'
  ) THEN
    ALTER TABLE athletes ADD COLUMN instagram_handle VARCHAR(100);
    RAISE NOTICE 'Added instagram_handle column';
  ELSE
    RAISE NOTICE 'instagram_handle column already exists';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'twitter_handle'
  ) THEN
    ALTER TABLE athletes ADD COLUMN twitter_handle VARCHAR(100);
    RAISE NOTICE 'Added twitter_handle column';
  ELSE
    RAISE NOTICE 'twitter_handle column already exists';
  END IF;

END $$;

-- Update existing records with sensible defaults
UPDATE athletes 
SET 
  is_committed = CASE 
    WHEN college_commitment IS NOT NULL AND college_commitment != '' AND college_commitment != 'Pending' 
    THEN true 
    ELSE false 
  END,
  is_active = COALESCE(is_active, true),
  is_featured = COALESCE(is_featured, false),
  college_interest_level = CASE 
    WHEN college_commitment IS NOT NULL AND college_commitment != '' AND college_commitment != 'Pending' 
    THEN 'Committed'
    ELSE 'Medium'
  END
WHERE is_committed IS NULL OR college_interest_level IS NULL;

-- Show final column count and status
SELECT 
  'FINAL STATUS' as status,
  COUNT(*) as total_columns 
FROM information_schema.columns 
WHERE table_name = 'athletes';

-- Verify the critical columns exist
SELECT 
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'anticipated_weight'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as anticipated_weight,
  
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'college_interest_level'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as college_interest_level,
  
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'is_committed'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as is_committed,
  
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'recruiting_notes'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as recruiting_notes;
