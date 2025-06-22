-- Get complete table structure for athletes
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY ordinal_position;
