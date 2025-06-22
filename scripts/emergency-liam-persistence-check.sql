-- Emergency check of Liam's current state
SELECT 
    id,
    first_name,
    last_name,
    generated_bio,
    generated_headline,
    ai_summary,
    updated_at,
    created_at
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey'
ORDER BY updated_at DESC;
