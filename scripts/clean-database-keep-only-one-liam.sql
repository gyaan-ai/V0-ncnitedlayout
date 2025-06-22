-- First, let's see what we have
SELECT id, first_name, last_name, created_at FROM athletes WHERE first_name = 'Liam' ORDER BY created_at;

-- Keep only the specific Liam we want and delete others
DELETE FROM athletes 
WHERE first_name = 'Liam' 
AND id != 'b1adf5a8-7887-4af1-935d-07267f186df9';

-- Verify only one Liam remains
SELECT id, first_name, last_name, hometown, high_school FROM athletes WHERE first_name = 'Liam';
