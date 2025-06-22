-- Debug script to see what's actually stored in the database
SELECT 
  id,
  first_name,
  last_name,
  anticipated_weight,
  college_interest_level,
  college_preferences,
  recruiting_notes,
  recruiting_summary,
  commitment_announcement,
  coach_name,
  commitment_date,
  is_committed,
  is_featured,
  is_active,
  updated_at
FROM athletes 
WHERE id = 'b1adf5a8-7887-4af1-935d-07267f186df9'
LIMIT 1;

-- Also check what columns actually exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name IN (
  'anticipated_weight', 
  'college_interest_level', 
  'college_preferences',
  'recruiting_notes',
  'recruiting_summary',
  'commitment_announcement',
  'coach_name',
  'commitment_date',
  'is_committed',
  'is_featured',
  'is_active'
)
ORDER BY column_name;
