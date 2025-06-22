-- Create athletes table
CREATE TABLE IF NOT EXISTS athletes (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    weight_class VARCHAR(10) NOT NULL,
    graduation_year INTEGER NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female')),
    high_school VARCHAR(255) NOT NULL,
    wrestling_club VARCHAR(255),
    hometown VARCHAR(255),
    
    -- College commitment info
    college_committed VARCHAR(255),
    college_division VARCHAR(50),
    commitment_date DATE,
    anticipated_weight VARCHAR(10),
    
    -- Profile info
    profile_image_url TEXT,
    commitment_image_url TEXT,
    instagram_handle VARCHAR(100),
    recruiting_profile TEXT,
    
    -- NC United team assignment
    nc_united_team VARCHAR(20) CHECK (nc_united_team IN ('Blue', 'White', 'Red', 'Black', 'Gold')),
    
    -- Academic info
    gpa DECIMAL(3,2),
    sat_score INTEGER,
    act_score INTEGER,
    
    -- Contact info
    parent_name VARCHAR(255),
    parent_email VARCHAR(255),
    parent_phone VARCHAR(20),
    parent_relationship VARCHAR(50),
    
    -- Emergency contact
    emergency_name VARCHAR(255),
    emergency_phone VARCHAR(20),
    emergency_relationship VARCHAR(50),
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_committed BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS athlete_achievements (
    id SERIAL PRIMARY KEY,
    athlete_id INTEGER REFERENCES athletes(id) ON DELETE CASCADE,
    achievement TEXT NOT NULL,
    year INTEGER,
    tournament_name VARCHAR(255),
    placement VARCHAR(20),
    weight_class VARCHAR(10),
    notes TEXT,
    achievement_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create stats table
CREATE TABLE IF NOT EXISTS athlete_stats (
    id SERIAL PRIMARY KEY,
    athlete_id INTEGER REFERENCES athletes(id) ON DELETE CASCADE,
    season_year INTEGER,
    career_wins INTEGER DEFAULT 0,
    career_losses INTEGER DEFAULT 0,
    pins INTEGER DEFAULT 0,
    tech_falls INTEGER DEFAULT 0,
    major_decisions INTEGER DEFAULT 0,
    decisions INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_athletes_graduation_year ON athletes(graduation_year);
CREATE INDEX IF NOT EXISTS idx_athletes_weight_class ON athletes(weight_class);
CREATE INDEX IF NOT EXISTS idx_athletes_college_committed ON athletes(college_committed);
CREATE INDEX IF NOT EXISTS idx_athletes_is_active ON athletes(is_active);
CREATE INDEX IF NOT EXISTS idx_athlete_achievements_athlete_id ON athlete_achievements(athlete_id);
CREATE INDEX IF NOT EXISTS idx_athlete_stats_athlete_id ON athlete_stats(athlete_id);

-- Insert sample data (Liam Hickey)
INSERT INTO athletes (
    first_name, last_name, weight_class, graduation_year, gender,
    high_school, wrestling_club, college_committed, college_division,
    commitment_date, profile_image_url, commitment_image_url,
    instagram_handle, recruiting_profile, nc_united_team,
    is_committed, is_featured
) VALUES (
    'Liam', 'Hickey', '157', 2025, 'Male',
    'Cardinal Gibbons High School', 'RAW Wrestling',
    'University of North Carolina at Chapel Hill', 'NCAA Division I',
    '2024-11-15', '/images/liam-hickey-commit-announcement.png', '/images/liam-hickey-commit-announcement.png',
    '@liamhickey_', 
    'Liam Hickey is a dominant force on the wrestling mat and an exceptional student-athlete. As a 3-time North Carolina State Champion and 2024 NHSCA National Champion, Liam has proven himself at the highest levels of high school wrestling.',
    'Blue', true, true
) ON CONFLICT (id) DO NOTHING;

-- Insert Liam's achievements
INSERT INTO athlete_achievements (athlete_id, achievement, achievement_order) VALUES
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), '2024 NHSCA National Champion (157 lbs)', 1),
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), '3x NC State Champion (2022, 2023, 2024)', 2),
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), '2024 Ultimate Club Duals Champion', 3),
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), 'FloWrestling #47 Nationally Ranked (Class of 2025)', 4),
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), '2024 Beast of the East Champion', 5),
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), '2023 Powerade Tournament Champion', 6),
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), '2024 Academic All-American (3.8+ GPA)', 7),
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), '4x Regional Champion', 8),
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), '2024 Team Captain - Cardinal Gibbons', 9),
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), '2023 Outstanding Wrestler Award - NC State Championships', 10);

-- Insert Liam's stats
INSERT INTO athlete_stats (athlete_id, career_wins, career_losses, pins, tech_falls, major_decisions, decisions) VALUES
((SELECT id FROM athletes WHERE first_name = 'Liam' AND last_name = 'Hickey'), 156, 12, 89, 23, 18, 26);
