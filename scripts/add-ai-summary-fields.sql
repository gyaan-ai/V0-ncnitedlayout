-- Add AI-generated summary fields to athletes table
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS generated_headline TEXT,
ADD COLUMN IF NOT EXISTS generated_bio TEXT,
ADD COLUMN IF NOT EXISTS bio_generated_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS headline_generated_at TIMESTAMP;

-- Update existing Liam record to test
UPDATE athletes 
SET 
  generated_headline = 'Elite NC Wrestling Champion Commits to UNC',
  generated_bio = 'Liam Hickey is a dominant force on the wrestling mat and an exceptional student-athlete. As a 3-time North Carolina State Champion and 2024 NHSCA National Champion, Liam has proven himself at the highest levels of high school wrestling.',
  bio_generated_at = NOW(),
  headline_generated_at = NOW()
WHERE first_name = 'Liam' AND last_name = 'Hickey';

-- Check the update
SELECT 
  first_name, 
  last_name, 
  generated_headline,
  LEFT(generated_bio, 100) as bio_preview,
  bio_generated_at
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey';
