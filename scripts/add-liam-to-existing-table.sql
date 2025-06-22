-- Add Liam to the existing athletes table
INSERT INTO athletes (
  id, first_name, last_name, weight_class, graduation_year, gender,
  high_school, wrestling_club, college_commitment, division,
  image_url, commitment_photo_url, achievements, 
  is_featured, blue_team, created_at, updated_at
) VALUES (
  gen_random_uuid(), 'Liam', 'Hickey', '157', 2025, 'Male',
  'Cardinal Gibbons High School', 'RAW Wrestling', 
  'University of North Carolina at Chapel Hill', 'NCAA Division I',
  '/images/liam-hickey-commit-announcement.png', 
  '/images/liam-hickey-commit-announcement.png',
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
  }',
  true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (id) DO NOTHING;
