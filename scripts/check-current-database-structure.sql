-- Check what columns actually exist in the athletes table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY ordinal_position;

-- Also check if we have any team-related columns
SELECT column_name, data_type
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name LIKE '%team%'
ORDER BY column_name;

-- Show a sample record to see what data we have
SELECT * FROM athletes LIMIT 1;
