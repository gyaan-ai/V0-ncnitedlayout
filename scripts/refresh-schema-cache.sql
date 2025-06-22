-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';

-- Also verify the columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name IN ('generated_headline', 'generated_bio');
