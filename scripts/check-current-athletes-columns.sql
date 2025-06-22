-- Check what columns currently exist in the athletes table
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY ordinal_position;

-- Count total columns
SELECT COUNT(*) as total_columns 
FROM information_schema.columns 
WHERE table_name = 'athletes';

-- Check if specific commitment columns exist
SELECT 
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'anticipated_weight'
  ) THEN 'EXISTS' ELSE 'MISSING' END as anticipated_weight_status,
  
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'college_interest_level'
  ) THEN 'EXISTS' ELSE 'MISSING' END as college_interest_level_status,
  
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'is_committed'
  ) THEN 'EXISTS' ELSE 'MISSING' END as is_committed_status,
  
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'athletes' AND column_name = 'recruiting_notes'
  ) THEN 'EXISTS' ELSE 'MISSING' END as recruiting_notes_status;
