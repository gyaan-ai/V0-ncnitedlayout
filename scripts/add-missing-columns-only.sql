-- Add only the missing columns to the existing athletes table
-- This preserves all existing data and structure

-- Check if columns exist before adding them
DO $$ 
BEGIN
    -- Add college_name if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'college_name') THEN
        ALTER TABLE athletes ADD COLUMN college_name VARCHAR(255);
    END IF;
    
    -- Add college_division if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'college_division') THEN
        ALTER TABLE athletes ADD COLUMN college_division VARCHAR(50);
    END IF;
    
    -- Add commitment_date if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'commitment_date') THEN
        ALTER TABLE athletes ADD COLUMN commitment_date DATE;
    END IF;
    
    -- Add college_logo_url if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'college_logo_url') THEN
        ALTER TABLE athletes ADD COLUMN college_logo_url TEXT;
    END IF;
    
    -- Add college_location if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'college_location') THEN
        ALTER TABLE athletes ADD COLUMN college_location VARCHAR(255);
    END IF;
    
    -- Add college_conference if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'college_conference') THEN
        ALTER TABLE athletes ADD COLUMN college_conference VARCHAR(100);
    END IF;
    
    -- Add is_committed if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'is_committed') THEN
        ALTER TABLE athletes ADD COLUMN is_committed BOOLEAN DEFAULT FALSE;
    END IF;
    
    -- Add commitment_type if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'commitment_type') THEN
        ALTER TABLE athletes ADD COLUMN commitment_type VARCHAR(50);
    END IF;
    
    -- Add scholarship_percentage if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'scholarship_percentage') THEN
        ALTER TABLE athletes ADD COLUMN scholarship_percentage INTEGER;
    END IF;
    
    -- Add announcement_date if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'announcement_date') THEN
        ALTER TABLE athletes ADD COLUMN announcement_date DATE;
    END IF;
    
    -- Add recruiting_notes if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'recruiting_notes') THEN
        ALTER TABLE athletes ADD COLUMN recruiting_notes TEXT;
    END IF;
    
    -- Add social_media_handles if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'social_media_handles') THEN
        ALTER TABLE athletes ADD COLUMN social_media_handles JSONB;
    END IF;

END $$;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY column_name;
