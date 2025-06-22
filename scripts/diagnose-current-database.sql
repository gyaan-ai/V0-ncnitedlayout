-- Show the current structure of the athletes table
\d athletes;

-- Show all columns in the athletes table
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY column_name;

-- Show Liam's current record
SELECT * FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey';

-- Show all records to understand the data
SELECT id, first_name, last_name, hometown, high_school FROM athletes;
