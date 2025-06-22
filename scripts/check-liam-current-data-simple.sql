-- Simple check: What's ACTUALLY in the database right now?
SELECT 
  first_name,
  last_name,
  generated_headline,
  LEFT(generated_bio, 100) as bio_preview,
  updated_at
FROM athletes 
WHERE first_name = 'Liam' 
AND last_name = 'Hickey';
