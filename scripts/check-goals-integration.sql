-- Check if athlete_goals table exists and has data
SELECT 
  'athlete_goals table' as check_type,
  COUNT(*) as count
FROM athlete_goals;

-- Check if athletes table has goals columns (it shouldn't - goals should be separate)
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name LIKE '%goal%';

-- Check Liam's goals specifically
SELECT 
  a.first_name,
  a.last_name,
  ag.high_school_wrestling_goals,
  ag.collegiate_wrestling_goals,
  ag.career_goals,
  ag.goals_visibility
FROM athletes a
LEFT JOIN athlete_goals ag ON a.id = ag.athlete_id
WHERE a.first_name = 'Liam' AND a.last_name = 'Hickey';
