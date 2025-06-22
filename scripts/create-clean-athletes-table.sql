-- Drop existing table if it exists and start fresh
DROP TABLE IF EXISTS athletes CASCADE;

-- Create a clean, comprehensive athletes table
CREATE TABLE athletes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT DEFAULT 'Male',
  hometown TEXT,
  
  -- Wrestling Information
  weight_class TEXT,
  graduation_year INTEGER,
  high_school TEXT,
  wrestling_club TEXT,
  nc_united_team TEXT DEFAULT 'Blue',
  
  -- College Information
  college_committed TEXT,
  college_division TEXT,
  anticipated_weight TEXT,
  college_interest_level TEXT,
  recruiting_notes TEXT,
  recruiting_summary TEXT,
  commitment_date DATE,
  coach_name TEXT,
  
  -- Academic Information
  gpa DECIMAL(3,2),
  sat_score INTEGER,
  act_score INTEGER,
  academic_honors TEXT,
  intended_major TEXT,
  
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
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_committed BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Insert Liam's data
INSERT INTO athletes (
  first_name, last_name, email, phone, hometown,
  weight_class, graduation_year, high_school, wrestling_club, nc_united_team,
  college_committed, college_division, anticipated_weight, college_interest_level,
  gpa, intended_major,
  is_active, is_committed, is_featured
) VALUES (
  'Liam', 'Hickey', 'liam@example.com', '555-0123', 'Raleigh, NC',
  '126', 2025, 'Cardinal Gibbons', 'RAW', 'Blue',
  'University of North Carolina', 'NCAA Division I', '133', 'High',
  3.6, 'Business Management',
  true, true, true
);
