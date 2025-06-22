-- Add unique constraint to logo_library table
-- First, remove any duplicate entries
DELETE FROM logo_library a USING logo_library b 
WHERE a.id > b.id 
AND a.name = b.name 
AND a.type = b.type;

-- Add the unique constraint
ALTER TABLE logo_library 
ADD CONSTRAINT logo_library_name_type_unique 
UNIQUE (name, type);

-- Verify the constraint was added
SELECT 
  conname as constraint_name,
  contype as constraint_type
FROM pg_constraint 
WHERE conrelid = 'logo_library'::regclass;
