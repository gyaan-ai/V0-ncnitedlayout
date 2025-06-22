-- Check what columns currently exist in the athletes table
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY ordinal_position;

-- Show sample data to understand current structure
SELECT * FROM athletes LIMIT 1;
