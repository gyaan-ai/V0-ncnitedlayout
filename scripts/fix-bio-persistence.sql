-- Check current athletes table structure for AI fields
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'athletes' 
AND column_name IN ('generated_bio', 'generated_headline', 'ai_generated_at')
ORDER BY column_name;

-- Ensure AI fields exist and are properly typed
ALTER TABLE athletes 
ADD COLUMN IF NOT EXISTS generated_bio TEXT,
ADD COLUMN IF NOT EXISTS generated_headline TEXT,
ADD COLUMN IF NOT EXISTS ai_generated_at TIMESTAMP DEFAULT NOW();

-- Check if Liam's bio is actually saved
SELECT id, first_name, last_name, generated_bio, generated_headline, ai_generated_at, updated_at
FROM athletes 
WHERE first_name ILIKE '%liam%' AND last_name ILIKE '%hickey%';

-- Update Liam's record to ensure it has proper AI content
UPDATE athletes 
SET 
  generated_bio = 'Liam Hickey is a dominant force in North Carolina high school wrestling, representing Cardinal Gibbons High School with exceptional skill and determination. As a two-time NCHSAA State Champion (2024, 2025) and two-time NHSCA All-American, Liam has established himself as one of the premier wrestlers in his weight class. His impressive tournament resume includes a 4th place finish at the 2025 NHSCA Nationals and strong showings at elite competitions like the Patriot Division I College Open. With his commitment to the University of North Carolina, Liam brings both athletic excellence and academic achievement to the Tar Heels wrestling program. His technical prowess, competitive drive, and consistent performance at the highest levels make him a valuable addition to any collegiate wrestling room.',
  generated_headline = 'Two-Time NCHSAA State Champion & NHSCA All-American Committed to UNC',
  ai_generated_at = NOW(),
  updated_at = NOW()
WHERE first_name ILIKE '%liam%' AND last_name ILIKE '%hickey%';
