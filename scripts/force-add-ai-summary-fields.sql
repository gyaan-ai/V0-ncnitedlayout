-- Force add AI summary fields with error handling
DO $$ 
BEGIN
    -- Add generated_headline column
    BEGIN
        ALTER TABLE athletes ADD COLUMN generated_headline TEXT;
        RAISE NOTICE 'Added generated_headline column';
    EXCEPTION
        WHEN duplicate_column THEN
            RAISE NOTICE 'generated_headline column already exists';
    END;

    -- Add generated_bio column
    BEGIN
        ALTER TABLE athletes ADD COLUMN generated_bio TEXT;
        RAISE NOTICE 'Added generated_bio column';
    EXCEPTION
        WHEN duplicate_column THEN
            RAISE NOTICE 'generated_bio column already exists';
    END;

    -- Add bio_generated_at column
    BEGIN
        ALTER TABLE athletes ADD COLUMN bio_generated_at TIMESTAMP;
        RAISE NOTICE 'Added bio_generated_at column';
    EXCEPTION
        WHEN duplicate_column THEN
            RAISE NOTICE 'bio_generated_at column already exists';
    END;

    -- Add headline_generated_at column
    BEGIN
        ALTER TABLE athletes ADD COLUMN headline_generated_at TIMESTAMP;
        RAISE NOTICE 'Added headline_generated_at column';
    EXCEPTION
        WHEN duplicate_column THEN
            RAISE NOTICE 'headline_generated_at column already exists';
    END;
END $$;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name IN ('generated_headline', 'generated_bio', 'bio_generated_at', 'headline_generated_at')
ORDER BY column_name;

-- Test update on Liam's record
UPDATE athletes 
SET 
  generated_headline = 'Elite NC Wrestling Champion Commits to UNC',
  generated_bio = 'Liam Hickey is a dominant force on the wrestling mat and an exceptional student-athlete.',
  bio_generated_at = NOW(),
  headline_generated_at = NOW()
WHERE first_name = 'Liam' AND last_name = 'Hickey';

-- Confirm the update worked
SELECT 
  first_name, 
  last_name, 
  generated_headline,
  LEFT(generated_bio, 50) as bio_preview,
  bio_generated_at
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey';
