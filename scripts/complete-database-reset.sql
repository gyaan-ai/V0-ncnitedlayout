-- COMPLETE DATABASE RESET - WIPE EVERYTHING
-- This will delete ALL data and start completely fresh

-- Drop all existing tables that might have athlete/profile data
DROP TABLE IF EXISTS athletes CASCADE;
DROP TABLE IF EXISTS athlete_achievements CASCADE;
DROP TABLE IF EXISTS athlete_stats CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS recruiting_profiles CASCADE;
DROP TABLE IF EXISTS commitments CASCADE;

-- Drop any other profile-related tables
DROP TABLE IF EXISTS wrestler_profiles CASCADE;
DROP TABLE IF EXISTS coach_profiles CASCADE;
DROP TABLE IF EXISTS parent_profiles CASCADE;

-- Create the core athletes table - this will be our single source of truth
CREATE TABLE athletes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Authentication Integration
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Basic Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT DEFAULT 'Male' CHECK (gender IN ('Male', 'Female')),
  hometown TEXT,
  
  -- Wrestling Information
  weight_class TEXT,
  graduation_year INTEGER,
  high_school TEXT,
  wrestling_club TEXT,
  nc_united_team TEXT DEFAULT 'Blue' CHECK (nc_united_team IN ('Blue', 'Gold', 'Red', 'White', 'Black')),
  
  -- College Information
  college_committed TEXT,
  college_division TEXT,
  anticipated_weight TEXT,
  college_interest_level TEXT CHECK (college_interest_level IN ('High', 'Medium', 'Low', 'Committed')),
  recruiting_notes TEXT,
  recruiting_summary TEXT,
  commitment_date DATE,
  coach_name TEXT,
  
  -- Academic Information
  gpa DECIMAL(3,2) CHECK (gpa >= 0 AND gpa <= 4.0),
  sat_score INTEGER CHECK (sat_score >= 400 AND sat_score <= 1600),
  act_score INTEGER CHECK (act_score >= 1 AND act_score <= 36),
  academic_honors TEXT,
  intended_major TEXT,
  
  -- Achievements (stored as JSON for flexibility)
  achievements JSONB DEFAULT '[]'::jsonb,
  wrestling_record JSONB DEFAULT '{}'::jsonb,
  
  -- Contact Information
  parent_name TEXT,
  parent_email TEXT,
  parent_phone TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  
  -- Media & Social
  profile_image_url TEXT,
  commitment_image_url TEXT,
  instagram_handle TEXT,
  twitter_handle TEXT,
  hudl_link TEXT,
  
  -- Status Flags
  is_active BOOLEAN DEFAULT true,
  is_committed BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_athletes_graduation_year ON athletes(graduation_year);
CREATE INDEX idx_athletes_weight_class ON athletes(weight_class);
CREATE INDEX idx_athletes_high_school ON athletes(high_school);
CREATE INDEX idx_athletes_college_committed ON athletes(college_committed);
CREATE INDEX idx_athletes_is_active ON athletes(is_active);
CREATE INDEX idx_athletes_is_committed ON athletes(is_committed);
CREATE INDEX idx_athletes_is_featured ON athletes(is_featured);
CREATE INDEX idx_athletes_user_id ON athletes(user_id);

-- Create update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_athletes_updated_at 
BEFORE UPDATE ON athletes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;

-- Create policies for security
CREATE POLICY "Athletes are viewable by everyone" ON athletes
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Athletes can be updated by owner or admin" ON athletes
  FOR UPDATE USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Athletes can be inserted by authenticated users" ON athletes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert one sample athlete to test the system
INSERT INTO athletes (
  first_name, last_name, email, phone, hometown,
  weight_class, graduation_year, high_school, wrestling_club, nc_united_team,
  college_committed, college_division, anticipated_weight, college_interest_level,
  gpa, intended_major, recruiting_summary,
  achievements, wrestling_record,
  is_active, is_committed, is_featured
) VALUES (
  'Liam', 'Hickey', 'liam.hickey@example.com', '919-555-0123', 'Raleigh, NC',
  '126', 2025, 'Cardinal Gibbons High School', 'RAW Wrestling', 'Blue',
  'University of North Carolina at Chapel Hill', 'NCAA Division I', '133', 'Committed',
  3.8, 'Business Administration', 'Elite wrestler with multiple state championships and national tournament experience.',
  '[
    "2024 NCHSAA 3A State Champion",
    "2023 NCHSAA 3A State Runner-up", 
    "2024 Ultimate Club Duals Champion",
    "2023 Fargo National Tournament Qualifier",
    "Multiple-time All-American"
  ]'::jsonb,
  '{"wins": 45, "losses": 3, "pins": 28, "tech_falls": 12}'::jsonb,
  true, true, true
);

-- Create a view for easy querying
CREATE VIEW athlete_profiles AS
SELECT 
  id,
  first_name,
  last_name,
  first_name || ' ' || last_name as full_name,
  email,
  phone,
  hometown,
  weight_class,
  graduation_year,
  high_school,
  wrestling_club,
  nc_united_team,
  college_committed,
  college_division,
  anticipated_weight,
  gpa,
  achievements,
  wrestling_record,
  profile_image_url,
  commitment_image_url,
  instagram_handle,
  is_active,
  is_committed,
  is_featured,
  created_at,
  updated_at
FROM athletes
WHERE is_active = true;
