-- Drop and recreate the athletes table with ALL needed columns
DROP TABLE IF EXISTS athletes CASCADE;

CREATE TABLE athletes (
    -- Primary key and metadata
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Basic personal information
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    date_of_birth DATE,
    hometown VARCHAR(255),
    gender VARCHAR(20) DEFAULT 'Male',
    
    -- School information
    high_school VARCHAR(255),
    graduation_year INTEGER,
    wrestling_club VARCHAR(255),
    
    -- Wrestling details
    weight_class VARCHAR(50),
    height VARCHAR(20),
    weight VARCHAR(20),
    anticipated_weight VARCHAR(50),
    
    -- Academic information
    gpa DECIMAL(3,2),
    sat_score INTEGER,
    act_score INTEGER,
    academic_honors TEXT,
    career_interests TEXT,
    
    -- College commitment information
    is_committed BOOLEAN DEFAULT FALSE,
    college_name VARCHAR(255),
    college_commitment VARCHAR(255), -- alias for college_name
    college_division VARCHAR(50),
    division VARCHAR(50), -- alias for college_division
    commitment_date DATE,
    college_coach VARCHAR(255),
    college_location VARCHAR(255),
    college_conference VARCHAR(255),
    commitment_announcement TEXT,
    recruiting_summary TEXT,
    college_interest_level VARCHAR(50),
    college_preferences TEXT,
    recruiting_notes TEXT,
    
    -- Media and profiles
    image_url TEXT,
    commitment_photo_url TEXT,
    instagram_handle VARCHAR(100),
    twitter_handle VARCHAR(100),
    recruiting_profile TEXT,
    bio_summary TEXT,
    bio TEXT, -- alias for bio_summary
    media_notes TEXT,
    
    -- Achievements (JSON format)
    achievements JSONB DEFAULT '{"nhsca": [], "super32": [], "fargo": [], "nchsaa": [], "other_achievements": []}',
    
    -- Contact information
    coach_name VARCHAR(255),
    parent_name VARCHAR(255),
    parent_email VARCHAR(255),
    parent_phone VARCHAR(50),
    parent_relationship VARCHAR(50),
    emergency_name VARCHAR(255),
    emergency_phone VARCHAR(50),
    emergency_relationship VARCHAR(50),
    
    -- NC United team information
    blue_team BOOLEAN DEFAULT FALSE,
    gold_team BOOLEAN DEFAULT FALSE,
    national_team BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_athletes_name ON athletes(first_name, last_name);
CREATE INDEX idx_athletes_graduation_year ON athletes(graduation_year);
CREATE INDEX idx_athletes_college ON athletes(college_name);
CREATE INDEX idx_athletes_team ON athletes(blue_team, gold_team, national_team);

-- Insert Liam's data back
INSERT INTO athletes (
    id,
    first_name,
    last_name,
    hometown,
    high_school,
    graduation_year,
    weight_class,
    gender,
    college_name,
    college_division,
    is_committed,
    blue_team,
    is_featured
) VALUES (
    'b1adf5a8-7887-4af1-935d-07267f186df9',
    'Liam',
    'Hickey',
    'Raleigh',
    'Green Hope High School',
    2025,
    '138',
    'Male',
    'University of North Carolina',
    'D1',
    true,
    true,
    true
) ON CONFLICT (id) DO UPDATE SET
    hometown = EXCLUDED.hometown,
    high_school = EXCLUDED.high_school,
    graduation_year = EXCLUDED.graduation_year,
    weight_class = EXCLUDED.weight_class,
    college_name = EXCLUDED.college_name,
    college_division = EXCLUDED.college_division,
    is_committed = EXCLUDED.is_committed,
    updated_at = NOW();

-- Verify the table was created correctly
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'athletes' 
ORDER BY column_name;

-- Show Liam's record
SELECT * FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey';
