-- Check what logo tables exist and their contents
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%logo%';

-- Check institution_logos table
SELECT COUNT(*) as total_logos FROM institution_logos;
SELECT * FROM institution_logos WHERE institution_type = 'college' LIMIT 5;

-- Check if there's a different logo table
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND (table_name LIKE '%institution%' OR table_name LIKE '%college%');

-- Check logo_library table (might be the correct one)
SELECT COUNT(*) as total_logos FROM logo_library WHERE type = 'college';
SELECT * FROM logo_library WHERE type = 'college' LIMIT 5;
