-- Get actual athlete UUIDs for testing
SELECT 
  id,
  first_name,
  last_name,
  email,
  created_at
FROM athletes 
ORDER BY created_at DESC
LIMIT 10;
