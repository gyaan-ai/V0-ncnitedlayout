-- Add grade column to athletes table
ALTER TABLE athletes ADD COLUMN grade TEXT;

-- Create function to calculate age from date of birth
CREATE OR REPLACE FUNCTION calculate_age(birth_date DATE)
RETURNS INTEGER AS $$
BEGIN
    IF birth_date IS NULL THEN
        RETURN NULL;
    END IF;
    
    RETURN EXTRACT(YEAR FROM AGE(birth_date));
END;
$$ LANGUAGE plpgsql;

-- Create function to auto-advance grade based on current date
CREATE OR REPLACE FUNCTION calculate_current_grade(birth_date DATE, base_grade TEXT)
RETURNS TEXT AS $$
DECLARE
    current_month INTEGER;
    current_year INTEGER;
    birth_year INTEGER;
    age_at_sept INTEGER;
    grade_number INTEGER;
    grades TEXT[] := ARRAY['Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade', 'College Freshman', 'College Sophomore', 'College Junior', 'College Senior', 'Graduate'];
BEGIN
    IF birth_date IS NULL OR base_grade IS NULL THEN
        RETURN base_grade;
    END IF;
    
    current_month := EXTRACT(MONTH FROM CURRENT_DATE);
    current_year := EXTRACT(YEAR FROM CURRENT_DATE);
    birth_year := EXTRACT(YEAR FROM birth_date);
    
    -- Calculate age as of September 1st of current school year
    IF current_month >= 9 THEN
        -- We're in the current school year (Sept-Aug)
        age_at_sept := current_year - birth_year;
    ELSE
        -- We're in the previous school year (Jan-Aug)
        age_at_sept := (current_year - 1) - birth_year;
    END IF;
    
    -- Typical grade based on age (assuming Sept 1st cutoff)
    -- Age 5 = Kindergarten, Age 6 = 1st Grade, etc.
    IF age_at_sept <= 4 THEN
        RETURN 'Pre-K';
    ELSIF age_at_sept = 5 THEN
        RETURN 'Kindergarten';
    ELSIF age_at_sept >= 6 AND age_at_sept <= 17 THEN
        grade_number := age_at_sept - 5; -- Age 6 = 1st grade (index 2)
        RETURN grades[grade_number + 2];
    ELSIF age_at_sept = 18 THEN
        RETURN 'College Freshman';
    ELSIF age_at_sept = 19 THEN
        RETURN 'College Sophomore';
    ELSIF age_at_sept = 20 THEN
        RETURN 'College Junior';
    ELSIF age_at_sept = 21 THEN
        RETURN 'College Senior';
    ELSE
        RETURN 'Graduate';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Update the athlete_profiles view to include calculated age and current grade
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

-- Update Liam's record with a grade and date of birth
UPDATE athletes 
SET 
  date_of_birth = '2007-03-15',  -- Makes him about 17 years old
  grade = '11th Grade'
WHERE first_name = 'Liam' AND last_name = 'Hickey';
