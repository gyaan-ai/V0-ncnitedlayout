-- Direct database fix for Liam Hickey's AI summary
-- This will update the record directly in the database

UPDATE athletes 
SET 
  generated_headline = 'Liam Hickey Caps Elite Career with D1 Open Milestone and UNC Commitment',
  generated_bio = 'Graduating senior Liam Hickey, a UNC wrestling commit from Kinston High School, has established himself as one of North Carolina''s premier wrestlers. Competing at 132 pounds for NC United Blue, Hickey has consistently performed at the highest levels of competition.

His wrestling resume includes standout performances at national tournaments, with notable appearances at NHSCA Nationals and other elite competitions. Hickey''s technical skill and competitive drive have made him a key contributor to NC United''s success in team competitions.

Academically, Hickey has maintained strong grades while balancing the demands of elite-level wrestling. His commitment to the University of North Carolina represents the culmination of years of hard work both on the mat and in the classroom.

As he prepares for his final high school season, Hickey continues to train with NC United Blue, working toward his goals of competing at the highest levels and making an immediate impact in college wrestling.',
  updated_at = NOW()
WHERE id = 'ce1bf191-623d-46dd-a0ca-5929e85871f1';

-- Verify the update worked
SELECT 
  id,
  first_name,
  last_name,
  generated_headline,
  LEFT(generated_bio, 100) as bio_preview,
  updated_at
FROM athletes 
WHERE id = 'ce1bf191-623d-46dd-a0ca-5929e85871f1';

-- Also check if there are any other Liam records that might be interfering
SELECT 
  id,
  first_name,
  last_name,
  email,
  generated_headline,
  LEFT(generated_bio, 50) as bio_preview
FROM athletes 
WHERE (first_name ILIKE '%liam%' OR last_name ILIKE '%hickey%' OR email ILIKE '%liam%')
ORDER BY created_at DESC;
