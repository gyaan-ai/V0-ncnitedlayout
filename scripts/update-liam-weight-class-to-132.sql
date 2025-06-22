-- Update Liam Hickey's weight class from 126 to 132
UPDATE athletes 
SET 
  weight_class = '132',
  updated_at = CURRENT_TIMESTAMP
WHERE 
  LOWER(first_name) = 'liam' 
  AND LOWER(last_name) = 'hickey'
  AND is_active = true;

-- Verify the update
SELECT 
  first_name,
  last_name,
  weight_class,
  high_school,
  college_committed,
  updated_at
FROM athletes 
WHERE 
  LOWER(first_name) = 'liam' 
  AND LOWER(last_name) = 'hickey'
  AND is_active = true;
