-- Check what logos are already in the system
SELECT 
  id,
  name,
  type,
  file_url,
  is_active,
  created_at
FROM logo_library 
WHERE is_active = true
ORDER BY type, name;
