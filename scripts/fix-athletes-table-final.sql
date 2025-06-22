-- First, let's see what we currently have
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY column_name;
