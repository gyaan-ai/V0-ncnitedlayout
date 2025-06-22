SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name IN ('generated_headline', 'generated_bio')
ORDER BY column_name;
