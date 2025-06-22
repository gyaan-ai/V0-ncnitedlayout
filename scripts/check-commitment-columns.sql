-- Check what commitment-related columns actually exist in the athletes table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name LIKE '%commit%'
ORDER BY column_name;
