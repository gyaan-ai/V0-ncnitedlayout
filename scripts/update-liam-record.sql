-- Update Liam's record with proper data
UPDATE athletes 
SET 
  college_commitment = 'University of North Carolina at Chapel Hill',
  division = 'NCAA Division I',
  is_featured = true,
  blue_team = true,
  weight_class = '157',
  wrestling_club = 'RAW Wrestling',
  high_school = 'Cardinal Gibbons High School',
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
      "2023 Shrine Bowl Wrestling Champion"
    ]
  }',
  commitment_photo_url = '/images/liam-hickey-commit-announcement.png',
  image_url = '/images/liam-hickey-commit-announcement.png',
  updated_at = CURRENT_TIMESTAMP
WHERE first_name = 'Liam' AND last_name = 'Hickey';
