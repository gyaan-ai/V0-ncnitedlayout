-- Clear existing athletes
DELETE FROM athletes;

-- Insert Liam Hickey with only basic columns that should exist
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
  image_url,
  commitment_photo_url,
  achievements
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
  '/images/liam-hickey-nhsca-2025.png',
  '/images/liam-hickey-commit-announcement.png',
  '{
    "nhsca": [
      {
        "year": 2024,
        "placement": "3rd",
        "weight_class": "150",
        "all_american": true
      },
      {
        "year": 2025,
        "placement": "2nd", 
        "weight_class": "157",
        "all_american": true
      }
    ],
    "nchsaa": [
      {
        "year": 2023,
        "placement": "1st",
        "weight_class": "145"
      },
      {
        "year": 2024,
        "placement": "1st",
        "weight_class": "150"
      }
    ],
    "other_achievements": [
      "2x NCHSAA State Champion",
      "2x NHSCA All-American",
      "UNC Chapel Hill Commit",
      "NC United Blue Team"
    ]
  }'
);
