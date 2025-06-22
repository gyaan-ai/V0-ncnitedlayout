-- Check if AI summary columns exist in athletes table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name IN ('generated_headline', 'generated_bio', 'bio_generated_at', 'headline_generated_at')
ORDER BY column_name;

-- Also check the actual table structure
\d athletes;
