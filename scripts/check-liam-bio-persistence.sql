-- Check if Liam's bio is still in the database
SELECT 
    id,
    first_name,
    last_name,
    generated_bio,
    ai_summary,
    LENGTH(generated_bio) as bio_length,
    LENGTH(ai_summary) as summary_length,
    updated_at
FROM athletes 
WHERE first_name ILIKE 'liam' AND last_name ILIKE 'hickey';

-- Also check if there are multiple Liam records
SELECT COUNT(*) as liam_count FROM athletes 
WHERE first_name ILIKE 'liam' AND last_name ILIKE 'hickey';
