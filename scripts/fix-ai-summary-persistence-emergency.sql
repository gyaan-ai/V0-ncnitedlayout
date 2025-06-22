-- Emergency fix for AI summary persistence
-- First, check if the columns exist
DO $$
BEGIN
    -- Add generated_headline column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'athletes' AND column_name = 'generated_headline') THEN
        ALTER TABLE athletes ADD COLUMN generated_headline TEXT;
        RAISE NOTICE 'Added generated_headline column';
    END IF;
    
    -- Add generated_bio column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'athletes' AND column_name = 'generated_bio') THEN
        ALTER TABLE athletes ADD COLUMN generated_bio TEXT;
        RAISE NOTICE 'Added generated_bio column';
    END IF;
    
    -- Add timestamp columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'athletes' AND column_name = 'bio_generated_at') THEN
        ALTER TABLE athletes ADD COLUMN bio_generated_at TIMESTAMP WITH TIME ZONE;
        RAISE NOTICE 'Added bio_generated_at column';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'athletes' AND column_name = 'headline_generated_at') THEN
        ALTER TABLE athletes ADD COLUMN headline_generated_at TIMESTAMP WITH TIME ZONE;
        RAISE NOTICE 'Added headline_generated_at column';
    END IF;
END $$;

-- Show current Liam data
SELECT 
    id,
    first_name,
    last_name,
    generated_headline,
    LENGTH(generated_bio) as bio_length,
    bio_generated_at,
    headline_generated_at,
    updated_at
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey';
