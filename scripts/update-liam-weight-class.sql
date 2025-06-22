-- Update Liam Hickey's weight class to 132
UPDATE athletes 
SET weight_class = '132',
    updated_at = CURRENT_TIMESTAMP
WHERE first_name = 'Liam' 
  AND last_name = 'Hickey';

-- Verify the update
SELECT first_name, last_name, weight_class, updated_at
FROM athletes 
WHERE first_name = 'Liam' 
  AND last_name = 'Hickey';
