-- Ensure Liam Hickey has a complete profile in the athletes table
INSERT INTO athletes (
  first_name,
  last_name,
  weight_class,
  graduation_year,
  gender,
  high_school,
  wrestling_club,
  college_commitment,
  division,
  commitment_photo_url,
  image_url,
  achievements,
  gpa,
  sat_score,
  act_score,
  blue_team,
  gold_team,
  national_team,
  is_featured,
  created_at,
  updated_at
) VALUES (
  'Liam',
  'Hickey',
  '157',
  2025,
  'Male',
  'Cardinal Gibbons High School',
  'Raw Wrestling Academy',
  'University of North Carolina at Chapel Hill',
  'NCAA Division I',
  '/images/liam-hickey-commit-announcement.png',
  '/images/liam-hickey-nhsca-2025.png',
  '{
    "nhsca": [
      {
        "year": 2024,
        "placement": "3rd",
        "weight_class": "150",
        "all_american": true,
        "record": "6-2"
      },
      {
        "year": 2025,
        "placement": "2nd",
        "weight_class": "157",
        "all_american": true,
        "record": "7-1"
      }
    ],
    "super32": [
      {
        "year": 2024,
        "placement": "5th",
        "weight_class": "150",
        "all_american": false,
        "record": "4-2"
      }
    ],
    "fargo": [
      {
        "year": 2023,
        "placement": "7th",
        "weight_class": "145",
        "style": "freestyle",
        "all_american": false,
        "record": "5-2"
      }
    ],
    "nchsaa": [
      {
        "year": 2023,
        "grade": "junior",
        "placement": "1st",
        "weight_class": "145"
      },
      {
        "year": 2024,
        "grade": "senior",
        "placement": "1st",
        "weight_class": "150"
      }
    ],
    "other_achievements": [
      "2x NCHSAA State Champion",
      "2x NHSCA All-American",
      "Fargo Nationals Qualifier",
      "Super32 Qualifier",
      "Team Captain - Cardinal Gibbons",
      "Academic All-State",
      "NC United Blue Team Member"
    ]
  }',
  3.8,
  1420,
  32,
  true,
  false,
  false,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT (first_name, last_name, graduation_year) 
DO UPDATE SET
  weight_class = EXCLUDED.weight_class,
  high_school = EXCLUDED.high_school,
  wrestling_club = EXCLUDED.wrestling_club,
  college_commitment = EXCLUDED.college_commitment,
  division = EXCLUDED.division,
  commitment_photo_url = EXCLUDED.commitment_photo_url,
  image_url = EXCLUDED.image_url,
  achievements = EXCLUDED.achievements,
  gpa = EXCLUDED.gpa,
  sat_score = EXCLUDED.sat_score,
  act_score = EXCLUDED.act_score,
  blue_team = EXCLUDED.blue_team,
  is_featured = EXCLUDED.is_featured,
  updated_at = CURRENT_TIMESTAMP;
