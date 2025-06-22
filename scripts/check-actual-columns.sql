-- Check if the columns actually exist in the database
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'athletes'
AND column_name IN ('generated_headline', 'generated_bio')
ORDER BY column_name;

-- Also check all columns to see the full structure
SELECT column_name, data_type
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'athletes'
ORDER BY ordinal_position;
