-- Update Liam's complete profile with correct data
UPDATE athletes 
SET 
  -- Basic Info
  weight_class = '157',
  high_school = 'Cardinal Gibbons High School',
  wrestling_club = 'RAW Wrestling',
  
  -- College Commitment
  college_commitment = 'University of North Carolina at Chapel Hill',
  division = 'NCAA Division I',
  
  -- Team Assignment
  blue_team = true,
  gold_team = false,
  national_team = false,
  is_featured = true,
  
  -- Images
  image_url = '/images/liam-hickey-commit-announcement.png',
  commitment_photo_url = '/images/liam-hickey-commit-announcement.png',
  
  -- Social
  -- Note: We'll need to add instagram_handle column if it doesn't exist
  
  -- Complete Achievements JSON
  achievements = '{
    "nhsca": [
      {
        "year": 2024,
        "placement": "1st",
        "weight_class": "157",
        "record": "6-0",
        "all_american": true,
        "notes": "Dominant performance, 4 pins"
      }
    ],
    "super32": [
      {
        "year": 2023,
        "placement": "3rd",
        "weight_class": "150",
        "record": "4-1",
        "all_american": true
      }
    ],
    "fargo": [
      {
        "year": 2023,
        "placement": "5th",
        "weight_class": "150",
        "record": "5-2",
        "style": "freestyle",
        "all_american": true
      }
    ],
    "nchsaa": [
      {
        "year": 2024,
        "grade": "senior",
        "placement": "1st",
        "weight_class": "157",
        "record": "4-0"
      },
      {
        "year": 2023,
        "grade": "junior",
        "placement": "1st",
        "weight_class": "150",
        "record": "5-0"
      },
      {
        "year": 2022,
        "grade": "sophomore",
        "placement": "1st",
        "weight_class": "144",
        "record": "4-0"
      }
    ],
    "other_achievements": [
      "2024 NHSCA National Champion (157 lbs)",
      "3x NCHSAA State Champion (2022, 2023, 2024)",
      "2023 Super32 All-American (3rd place)",
      "2023 Fargo Nationals All-American (5th place)",
      "2024 Beast of the East Champion",
      "2023 Powerade Tournament Champion",
      "2024 Academic All-American (3.8+ GPA)",
      "4x Regional Champion",
      "2024 Team Captain - Cardinal Gibbons",
      "2023 Outstanding Wrestler Award - NC State Championships",
      "2024 Ironman Tournament Finalist",
      "3x All-Conference Selection",
      "2024 NC United Blue Team Captain",
      "2023 Knockout Sportswear Classic Champion",
      "2024 Virginia Duals Champion",
      "2022 Freshman State Champion",
      "2024 Most Valuable Wrestler - Cardinal Gibbons",
      "2023 Shrine Bowl Wrestling Champion",
      "4x Honor Roll Student",
      "2024 Community Service Award Recipient",
      "2023 Leadership Award - RAW Wrestling",
      "2024 Sportsmanship Award - NHSCA Nationals"
    ]
  }',
  
  updated_at = CURRENT_TIMESTAMP
  
WHERE first_name = 'Liam' AND last_name = 'Hickey';

-- Add instagram_handle column if it doesn't exist and update it
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'athletes' AND column_name = 'instagram_handle') THEN
        ALTER TABLE athletes ADD COLUMN instagram_handle VARCHAR(100);
    END IF;
END $$;

-- Update Liam's Instagram handle
UPDATE athletes 
SET instagram_handle = '@liamhickey_'
WHERE first_name = 'Liam' AND last_name = 'Hickey';
