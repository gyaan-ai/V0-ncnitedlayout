-- Add missing blue_team column to athletes table
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS blue_team TEXT;

-- Update existing records if needed
UPDATE athletes 
SET blue_team = 'NC United Blue' 
WHERE blue_team IS NULL AND team_name LIKE '%Blue%';
