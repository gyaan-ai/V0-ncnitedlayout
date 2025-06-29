-- Fresh, clean database schema for NC United
-- Single source of truth

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Athletes table (core entity)
CREATE TABLE athletes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(10) CHECK (gender IN ('Male', 'Female')),
  
  -- Wrestling Info
  weight_class INTEGER,
  graduation_year INTEGER,
  grade VARCHAR(20),
  high_school VARCHAR(200),
  wrestling_club VARCHAR(200),
  nc_united_team VARCHAR(10) CHECK (nc_united_team IN ('Blue', 'Gold', 'Red', 'White', 'Black')),
  
  -- Academic
  gpa DECIMAL(3,2),
  sat_score INTEGER,
  academic_achievements TEXT,
  
  -- Commitment
  is_committed BOOLEAN DEFAULT FALSE,
  college_committed VARCHAR(200),
  college_division VARCHAR(50),
  college_weight INTEGER,
  commitment_date DATE,
  commitment_image_url TEXT,
  
  -- Profile
  profile_image_url TEXT,
  youtube_highlight_url TEXT,
  bio TEXT,
  ai_generated_headline TEXT,
  ai_generated_bio TEXT,
  
  -- Contact
  parent_name VARCHAR(200),
  parent_email VARCHAR(255),
  parent_phone VARCHAR(20),
  address TEXT,
  hometown VARCHAR(100),
  
  -- Goals
  wrestling_goals TEXT,
  academic_goals TEXT,
  
  -- Social
  instagram_handle VARCHAR(100),
  twitter_handle VARCHAR(100),
  
  -- Achievements (JSON for flexibility)
  achievements JSONB DEFAULT '{}',
  wrestling_record JSONB DEFAULT '{}',
  
  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT TRUE,
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Logos table
CREATE TABLE logos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution_name VARCHAR(200) NOT NULL,
  logo_url TEXT NOT NULL,
  aliases TEXT[] DEFAULT '{}',
  institution_type VARCHAR(20) CHECK (institution_type IN ('college', 'high_school', 'club', 'team')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_athletes_name ON athletes(last_name, first_name);
CREATE INDEX idx_athletes_committed ON athletes(is_committed);
CREATE INDEX idx_athletes_nc_team ON athletes(nc_united_team);
CREATE INDEX idx_athletes_weight ON athletes(weight_class);
CREATE INDEX idx_athletes_grad_year ON athletes(graduation_year);
CREATE INDEX idx_athletes_active ON athletes(is_active);
CREATE INDEX idx_logos_name ON logos(institution_name);
CREATE INDEX idx_logos_type ON logos(institution_type);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_athletes_updated_at 
  BEFORE UPDATE ON athletes 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert essential logos
INSERT INTO logos (institution_name, logo_url, institution_type, aliases) VALUES
('NC United Blue', '/images/nc-united-blue-logo.png', 'team', '{"nc united blue", "ncunited blue"}'),
('NC United Gold', '/images/nc-united-gold-logo.png', 'team', '{"nc united gold", "ncunited gold"}'),
('University of North Carolina', '/images/unc-logo.png', 'college', '{"unc", "north carolina", "tar heels"}');
