-- Remove test/placeholder logos that aren't real
DELETE FROM logo_library 
WHERE name = 'test-university' 
   OR display_name = 'Test University'
   OR file_url LIKE '%example.com%';

-- Verify remaining logos
SELECT 
  id,
  display_name,
  type,
  file_url,
  aliases
FROM logo_library 
WHERE is_active = true
ORDER BY type, display_name;
