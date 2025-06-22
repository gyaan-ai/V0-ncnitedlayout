-- Verify Liam's data is permanently saved
SELECT 
    id,
    first_name,
    last_name,
    is_committed,
    college_committed,
    created_at,
    updated_at,
    profile_image_url IS NOT NULL as has_profile_image,
    commitment_image_url IS NOT NULL as has_commit_image,
    youtube_highlight_url IS NOT NULL as has_video
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey';
