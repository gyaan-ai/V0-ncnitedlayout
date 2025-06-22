-- Add YouTube highlight URL column to athletes table
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS youtube_highlight_url TEXT;

-- Update the updated_at timestamp for existing records
UPDATE athletes SET updated_at = CURRENT_TIMESTAMP WHERE youtube_highlight_url IS NULL;

-- Check the new column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name = 'youtube_highlight_url';

-- Show sample of the updated table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY ordinal_position;
