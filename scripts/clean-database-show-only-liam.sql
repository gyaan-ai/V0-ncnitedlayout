-- Clean up all athletes and add only Liam Hickey with complete data
DELETE FROM athletes;

-- Insert Liam Hickey with complete, accurate information
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
  achievements,
  is_featured,
  blue_team,
  email,
  phone,
  hometown,
  gpa,
  sat_score,
  act_score
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
        "placement": "3rd Place",
        "weight_class": "150",
        "all_american": true,
        "tournament": "NHSCA Senior Nationals"
      },
      {
        "year": 2025,
        "placement": "2nd Place", 
        "weight_class": "157",
        "all_american": true,
        "tournament": "NHSCA Senior Nationals"
      }
    ],
    "nchsaa": [
      {
        "year": 2023,
        "placement": "1st Place",
        "weight_class": "145",
        "tournament": "NCHSAA 4A State Championship"
      },
      {
        "year": 2024,
        "placement": "1st Place",
        "weight_class": "150",
        "tournament": "NCHSAA 4A State Championship"
      }
    ],
    "fargo": [
      {
        "year": 2023,
        "placement": "5th Place",
        "weight_class": "145",
        "style": "Freestyle"
      },
      {
        "year": 2024,
        "placement": "3rd Place",
        "weight_class": "150",
        "style": "Freestyle"
      }
    ],
    "other_achievements": [
      "2x NCHSAA 4A State Champion",
      "2x NHSCA All-American",
      "UNC Chapel Hill Commit",
      "NC United Blue Team Captain",
      "Fargo All-American",
      "FloWrestling Top 100 Recruit"
    ]
  }',
  true,
  true,
  'liam.hickey@example.com',
  '919-555-0123',
  'Raleigh, NC',
  3.8,
  1450,
  32
);

-- Verify the insert
SELECT 
  first_name,
  last_name,
  weight_class,
  graduation_year,
  college_commitment,
  is_featured,
  blue_team
FROM athletes;
