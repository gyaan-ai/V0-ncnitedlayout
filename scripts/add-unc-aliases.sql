-- Add comprehensive aliases for UNC to help with matching
UPDATE logo_library 
SET aliases = ARRAY[
  'UNC',
  'University of North Carolina', 
  'North Carolina',
  'UNC Chapel Hill',
  'Tar Heels',
  'Carolina',
  'UNC-CH'
]
WHERE display_name = 'University of North Carolina at Chapel Hill'
AND type = 'college';

-- Show the updated record
SELECT * FROM logo_library 
WHERE display_name = 'University of North Carolina at Chapel Hill';
