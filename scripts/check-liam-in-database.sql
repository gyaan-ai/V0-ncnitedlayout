-- Check if Liam Hickey exists in the athletes table
SELECT 
  id,
  first_name,
  last_name,
  email,
  high_school,
  weight_class,
  graduation_year,
  is_committed,
  college_committed,
  created_at
FROM athletes 
WHERE 
  LOWER(first_name) = 'liam' 
  AND LOWER(last_name) = 'hickey'
ORDER BY created_at DESC;

-- Also check total count of athletes
SELECT COUNT(*) as total_athletes FROM athletes;

-- Show all athletes if there are any
SELECT 
  id,
  first_name,
  last_name,
  high_school,
  created_at
FROM athletes 
ORDER BY created_at DESC
LIMIT 10;
