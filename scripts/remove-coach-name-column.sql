-- Remove coach_name column from athletes table
ALTER TABLE athletes DROP COLUMN IF EXISTS coach_name;

-- Update the athlete_profiles view to remove coach_name reference
DROP VIEW IF EXISTS athlete_profiles;
CREATE VIEW athlete_profiles AS
SELECT 
  id,
  first_name,
  last_name,
  first_name || ' ' || last_name as full_name,
  email,
  phone,
  date_of_birth,
  calculate_age(date_of_birth) as age,
  grade,
  calculate_current_grade(date_of_birth, grade) as current_grade,
  hometown,
  weight_class,
  graduation_year,
  high_school,
  wrestling_club,
  nc_united_team,
  college_committed,
  college_division,
  anticipated_weight,
  gpa,
  achievements,
  wrestling_record,
  profile_image_url,
  commitment_image_url,
  instagram_handle,
  is_active,
  is_committed,
  is_featured,
  created_at,
  updated_at
FROM athletes
WHERE is_active = true;
