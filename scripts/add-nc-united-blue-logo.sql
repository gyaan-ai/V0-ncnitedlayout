-- Add NC United Blue team logo
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases)
VALUES (
  'nc-united-blue',
  'NC United Blue',
  'team',
  '/images/nc-united-blue-logo.png',
  'nc-united-blue-logo.png',
  ARRAY['nc united blue', 'nc-united-blue', 'blue team', 'blue']
) ON CONFLICT (name, type) DO UPDATE SET
  file_url = EXCLUDED.file_url,
  aliases = EXCLUDED.aliases,
  is_active = true;

-- Verify the logo was added
SELECT 
  name,
  display_name,
  type,
  file_url,
  aliases,
  is_active
FROM logo_library 
WHERE type = 'team' AND LOWER(name) LIKE '%blue%';
