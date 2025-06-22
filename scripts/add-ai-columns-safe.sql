-- Add AI-generated columns if they don't exist
DO $$ 
BEGIN
    -- Add generated_headline column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'athletes' AND column_name = 'generated_headline'
    ) THEN
        ALTER TABLE athletes ADD COLUMN generated_headline TEXT;
        RAISE NOTICE 'Added generated_headline column';
    ELSE
        RAISE NOTICE 'generated_headline column already exists';
    END IF;

    -- Add generated_bio column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'athletes' AND column_name = 'generated_bio'
    ) THEN
        ALTER TABLE athletes ADD COLUMN generated_bio TEXT;
        RAISE NOTICE 'Added generated_bio column';
    ELSE
        RAISE NOTICE 'generated_bio column already exists';
    END IF;
END $$;
