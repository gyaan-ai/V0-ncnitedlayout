-- Create institutions management tables
-- This normalizes college, high school, and club data

-- Colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  short_name VARCHAR(100),
  aliases TEXT[], -- Array of alternative names
  division VARCHAR(50), -- NCAA D1, D2, D3, NAIA, NJCAA
  conference VARCHAR(100),
  state VARCHAR(50),
  logo_url TEXT,
  website_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- High Schools table
CREATE TABLE IF NOT EXISTS high_schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  short_name VARCHAR(100),
  aliases TEXT[],
  city VARCHAR(100),
  state VARCHAR(50) NOT NULL,
  classification VARCHAR(20), -- 4A, 3A, 2A, 1A
  logo_url TEXT,
  website_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(name, state) -- Same school name can exist in different states
);

-- Wrestling Clubs table
CREATE TABLE IF NOT EXISTS wrestling_clubs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  short_name VARCHAR(100),
  aliases TEXT[],
  city VARCHAR(100),
  state VARCHAR(50),
  region VARCHAR(100), -- Southeast, Northeast, etc.
  logo_url TEXT,
  website_url TEXT,
  head_coach VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Update recruiting_athletes table to use foreign keys
ALTER TABLE recruiting_athletes 
ADD COLUMN IF NOT EXISTS college_id INTEGER REFERENCES colleges(id),
ADD COLUMN IF NOT EXISTS high_school_id INTEGER REFERENCES high_schools(id),
ADD COLUMN IF NOT EXISTS wrestling_club_id INTEGER REFERENCES wrestling_clubs(id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_colleges_division ON colleges(division);
CREATE INDEX IF NOT EXISTS idx_colleges_state ON colleges(state);
CREATE INDEX IF NOT EXISTS idx_high_schools_state ON high_schools(state);
CREATE INDEX IF NOT EXISTS idx_wrestling_clubs_state ON wrestling_clubs(state);
CREATE INDEX IF NOT EXISTS idx_recruiting_athletes_college ON recruiting_athletes(college_id);
CREATE INDEX IF NOT EXISTS idx_recruiting_athletes_high_school ON recruiting_athletes(high_school_id);
CREATE INDEX IF NOT EXISTS idx_recruiting_athletes_club ON recruiting_athletes(wrestling_club_id);

-- Insert some sample colleges with common aliases
INSERT INTO colleges (name, display_name, short_name, aliases, division, state, conference) VALUES
('university-of-north-carolina-chapel-hill', 'University of North Carolina at Chapel Hill', 'UNC', 
 ARRAY['UNC', 'Carolina', 'North Carolina', 'UNC Chapel Hill', 'Tar Heels'], 'NCAA D1', 'NC', 'ACC'),
('north-carolina-state-university', 'North Carolina State University', 'NC State', 
 ARRAY['NC State', 'NCSU', 'State', 'Wolfpack'], 'NCAA D1', 'NC', 'ACC'),
('duke-university', 'Duke University', 'Duke', 
 ARRAY['Duke', 'Blue Devils'], 'NCAA D1', 'NC', 'ACC'),
('virginia-tech', 'Virginia Polytechnic Institute and State University', 'Virginia Tech', 
 ARRAY['Virginia Tech', 'VT', 'Hokies'], 'NCAA D1', 'VA', 'ACC'),
('appalachian-state-university', 'Appalachian State University', 'App State', 
 ARRAY['App State', 'Appalachian State', 'ASU', 'Mountaineers'], 'NCAA D1', 'NC', 'Sun Belt');

-- Insert some sample high schools
INSERT INTO high_schools (name, display_name, short_name, city, state, classification) VALUES
('apex-high-school', 'Apex High School', 'Apex', 'Apex', 'NC', '4A'),
('green-hope-high-school', 'Green Hope High School', 'Green Hope', 'Cary', 'NC', '4A'),
('millbrook-high-school', 'Millbrook High School', 'Millbrook', 'Raleigh', 'NC', '4A'),
('middle-creek-high-school', 'Middle Creek High School', 'Middle Creek', 'Apex', 'NC', '4A'),
('cardinal-gibbons-high-school', 'Cardinal Gibbons High School', 'Cardinal Gibbons', 'Raleigh', 'NC', '4A');

-- Insert some sample wrestling clubs
INSERT INTO wrestling_clubs (name, display_name, short_name, city, state, region) VALUES
('nc-united-blue', 'NC United Blue', 'NCU Blue', 'Raleigh', 'NC', 'Southeast'),
('nc-united-gold', 'NC United Gold', 'NCU Gold', 'Raleigh', 'NC', 'Southeast'),
('triangle-wrestling-club', 'Triangle Wrestling Club', 'Triangle WC', 'Durham', 'NC', 'Southeast'),
('charlotte-wrestling-club', 'Charlotte Wrestling Club', 'Charlotte WC', 'Charlotte', 'NC', 'Southeast');
