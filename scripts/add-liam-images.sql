-- Add Liam's images to his profile
UPDATE athletes 
SET 
  profile_image_url = '/images/liam-hickey-ucd-2024.png',
  commitment_image_url = '/images/liam-hickey-commit-announcement.png'
WHERE first_name = 'Liam' 
  AND last_name = 'Hickey'
  AND is_active = true;

-- Verify the update
SELECT 
  first_name,
  last_name,
  profile_image_url,
  commitment_image_url,
  college_committed
FROM athletes 
WHERE first_name = 'Liam' 
  AND last_name = 'Hickey';
