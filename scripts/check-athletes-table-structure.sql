-- Check the actual structure of the athletes table
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY ordinal_position;

-- Also show a sample record to see what data we have
SELECT * FROM athletes LIMIT 1;
