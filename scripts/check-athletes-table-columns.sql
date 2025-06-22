-- Check what columns actually exist in the athletes table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY ordinal_position;
