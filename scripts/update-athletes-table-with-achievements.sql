-- First, create the athletes table if it doesn't exist
CREATE TABLE IF NOT EXISTS athletes (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  weight_class VARCHAR(10) NOT NULL,
  graduation_year INTEGER NOT NULL,
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female')),
  high_school VARCHAR(255) NOT NULL,
  wrestling_club VARCHAR(255),
  hometown VARCHAR(255),

  -- College commitment
  college_committed VARCHAR(255),
  college_division VARCHAR(100),
  commitment_date DATE,
  anticipated_weight VARCHAR(10),

  -- Profile
  profile_image_url TEXT,
  commitment_image_url TEXT,
  instagram_handle VARCHAR(100),
  recruiting_profile TEXT,

  -- NC United
  nc_united_team VARCHAR(20) CHECK (nc_united_team IN ('Blue', 'White', 'Red', 'Black', 'Gold')),

  -- Academic
  gpa DECIMAL(3,2),
  sat_score INTEGER,
  act_score INTEGER,

  -- Contacts
  parent_name VARCHAR(255),
  parent_email VARCHAR(255),
  parent_phone VARCHAR(20),
  parent_relationship VARCHAR(50),

  -- Achievements - JSONB for complex tournament data
  achievements JSONB DEFAULT '{"nhsca": [], "super32": [], "fargo": [], "nchsaa": [], "other_achievements": []}',

  -- Status
  is_active BOOLEAN DEFAULT true,
  is_committed BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_athletes_graduation_year ON athletes(graduation_year);
CREATE INDEX IF NOT EXISTS idx_athletes_weight_class ON athletes(weight_class);
CREATE INDEX IF NOT EXISTS idx_athletes_is_committed ON athletes(is_committed);
CREATE INDEX IF NOT EXISTS idx_athletes_is_active ON athletes(is_active);
CREATE INDEX IF NOT EXISTS idx_athletes_nc_united_team ON athletes(nc_united_team);

-- Insert Liam's profile with all his achievements
INSERT INTO athletes (
  first_name, last_name, weight_class, graduation_year, gender,
  high_school, wrestling_club, college_committed, college_division,
  commitment_date, profile_image_url, commitment_image_url, instagram_handle,
  nc_united_team, is_active, is_committed, is_featured,
  achievements
) VALUES (
  'Liam', 'Hickey', '157', 2025, 'Male',
  'Cardinal Gibbons High School', 'RAW Wrestling', 
  'University of North Carolina at Chapel Hill', 'NCAA Division I',
  '2024-11-15', '/images/liam-hickey-commit-announcement.png', 
  '/images/liam-hickey-commit-announcement.png', '@liamhickey_',
  'Blue', true, true, true,
  '{
    "nhsca": [
      {
        "id": 1,
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
        "id": 2,
        "year": 2023,
        "placement": "3rd",
        "weight_class": "150",
        "record": "4-1",
        "all_american": true
      }
    ],
    "fargo": [
      {
        "id": 3,
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
        "id": 4,
        "year": 2024,
        "grade": "senior",
        "placement": "1st",
        "weight_class": "157",
        "record": "4-0"
      },
      {
        "id": 5,
        "year": 2023,
        "grade": "junior",
        "placement": "1st",
        "weight_class": "150",
        "record": "5-0"
      },
      {
        "id": 6,
        "year": 2022,
        "grade": "sophomore",
        "placement": "1st",
        "weight_class": "144",
        "record": "4-0"
      }
    ],
    "other_achievements": [
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
  }'::jsonb
) ON CONFLICT DO NOTHING;
