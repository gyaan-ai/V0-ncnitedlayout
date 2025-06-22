-- Check if the AI summary columns exist and are working
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name IN ('generated_headline', 'generated_bio', 'bio_generated_at', 'headline_generated_at')
ORDER BY column_name;

-- Check Liam's current AI summary data
SELECT 
  first_name,
  last_name,
  generated_headline,
  CASE 
    WHEN LENGTH(generated_bio) > 50 THEN LEFT(generated_bio, 50) || '...'
    ELSE generated_bio
  END as bio_preview,
  bio_generated_at,
  headline_generated_at
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey';

-- Test if we can update the AI fields
UPDATE athletes 
SET 
  generated_headline = 'Test Headline - ' || NOW()::text,
  generated_bio = 'Test bio content generated at ' || NOW()::text,
  bio_generated_at = NOW(),
  headline_generated_at = NOW()
WHERE first_name = 'Liam' AND last_name = 'Hickey'
RETURNING first_name, last_name, generated_headline, bio_generated_at;
