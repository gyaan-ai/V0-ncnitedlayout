-- Create athletes table in Supabase
CREATE TABLE IF NOT EXISTS athletes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  weight_class TEXT,
  graduation_year INTEGER,
  gender TEXT DEFAULT 'Male',
  high_school TEXT,
  wrestling_club TEXT,
  hometown TEXT,
  
  -- College Commitment
  college_committed TEXT,
  college_division TEXT,
  anticipated_weight TEXT,
  college_interest_level TEXT,
  college_preferences TEXT,
  recruiting_notes TEXT,
  recruiting_summary TEXT,
  commitment_date DATE,
  coach_name TEXT,
  commitment_announcement TEXT,
  
  -- Academic
  gpa DECIMAL(3,2),
  sat_score INTEGER,
  act_score INTEGER,
  academic_honors TEXT,
  career_interests TEXT,
  
  -- Media & Social
  profile_image_url TEXT,
  commitment_image_url TEXT,
  recruiting_profile TEXT,
  bio_summary TEXT,
  media_notes TEXT,
  instagram_handle TEXT,
  twitter_handle TEXT,
  
  -- Contact Info
  parent_name TEXT,
  parent_relationship TEXT,
  parent_email TEXT,
  parent_phone TEXT,
  emergency_name TEXT,
  emergency_relationship TEXT,
  emergency_phone TEXT,
  
  -- Team & Status
  nc_united_team TEXT DEFAULT 'Blue',
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

CREATE TRIGGER update_athletes_updated_at BEFORE UPDATE ON athletes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO athletes (first_name, last_name, high_school, weight_class, graduation_year, nc_united_team) VALUES
('Aiden', 'White', 'Sample High School', '157', 2025, 'Blue'),
('Brock', 'Sullivan', 'Sample High School', '165', 2025, 'Blue'),
('Sam', 'Harper', 'Sample High School', '150', 2026, 'Gold')
ON CONFLICT (id) DO NOTHING;
