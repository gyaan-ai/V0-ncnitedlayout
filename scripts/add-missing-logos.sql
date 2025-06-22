-- Add UNC logo if it doesn't exist
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases)
VALUES (
  'university-of-north-carolina',
  'University of North Carolina',
  'college',
  '/images/logos/unc-logo.png',
  'unc-logo.png',
  ARRAY['unc', 'tar heels', 'north carolina', 'university of north carolina']
) ON CONFLICT (name, type) DO NOTHING;

-- Update RAW logo to ensure it matches
UPDATE logo_library 
SET aliases = ARRAY['raw', 'raw wrestling', 'raw wrestling academy']
WHERE type = 'club' AND LOWER(name) LIKE '%raw%';

-- Add NC United Blue logo if it doesn't exist
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases)
VALUES (
  'nc-united-blue',
  'NC United Blue',
  'team',
  '/images/nc-united-blue-logo.png',
  'nc-united-blue-logo.png',
  ARRAY['nc united blue', 'nc-united-blue', 'blue team']
) ON CONFLICT (name, type) DO NOTHING;

-- Check what we have after updates
SELECT 
  type,
  name,
  display_name,
  aliases,
  file_url,
  is_active
FROM logo_library 
WHERE (
  (type = 'club' AND LOWER(name) LIKE '%raw%') OR
  (type = 'college' AND (LOWER(name) LIKE '%carolina%' OR LOWER(name) LIKE '%unc%')) OR
  (type = 'team' AND LOWER(name) LIKE '%nc-united%')
)
ORDER BY type, name;
