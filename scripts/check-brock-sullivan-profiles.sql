SELECT id, first_name, last_name, high_school, created_at 
FROM athletes 
WHERE first_name ILIKE '%brock%' OR last_name ILIKE '%sullivan%'
ORDER BY created_at DESC;
