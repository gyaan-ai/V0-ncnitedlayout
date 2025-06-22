-- Check current AI summary data
SELECT 
  id,
  first_name,
  last_name,
  generated_headline,
  LEFT(generated_bio, 100) as bio_preview,
  bio_generated_at,
  headline_generated_at,
  updated_at,
  created_at
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey';

-- Check if there are any triggers or processes that might be clearing the data
SELECT 
  schemaname,
  tablename,
  triggername,
  tgtype,
  proname
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE c.relname = 'athletes';

-- Check recent updates to this athlete
SELECT 
  id,
  first_name,
  last_name,
  generated_headline IS NOT NULL as has_headline,
  generated_bio IS NOT NULL as has_bio,
  bio_generated_at,
  headline_generated_at,
  updated_at
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey'
ORDER BY updated_at DESC;
