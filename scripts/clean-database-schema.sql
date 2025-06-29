-- Clean, consolidated database schema
-- Run this to establish the single source of truth

-- Drop old tables if they exist
DROP TABLE IF EXISTS wrestlers CASCADE;
DROP TABLE IF EXISTS tournaments CASCADE;
DROP TABLE IF EXISTS matches CASCADE;
DROP TABLE IF EXISTS teams CASCADE;

-- Core athletes table
CREATE TABLE IF NOT EXISTS athletes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  weight_class INTEGER,
  grade VARCHAR(20),
  high_school VARCHAR(200),
  club_team VARCHAR(200),
  nc_united_team VARCHAR(20) CHECK (nc_united_team IN ('blue', 'gold', 'red', 'white', 'black')),
  
  -- Commitment info
  committed BOOLEAN DEFAULT FALSE,
  commitment_date DATE,
  committed_school VARCHAR(200),
  commitment_level VARCHAR(10) CHECK (commitment_level IN ('D1', 'D2', 'D3', 'NAIA', 'JUCO')),
  
  -- Profile data
  profile_image_url TEXT,
  bio TEXT,
  ai_generated_summary TEXT,
  
  -- Social/Contact
  instagram_handle VARCHAR(100),
  twitter_handle VARCHAR(100),
  youtube_highlight_url TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Logos table
CREATE TABLE IF NOT EXISTS logos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_name VARCHAR(200) NOT NULL,
  logo_url TEXT NOT NULL,
  aliases TEXT[] DEFAULT '{}',
  institution_type VARCHAR(20) CHECK (institution_type IN ('college', 'high_school', 'club', 'team')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_athletes_last_name ON athletes(last_name);
CREATE INDEX IF NOT EXISTS idx_athletes_committed ON athletes(committed);
CREATE INDEX IF NOT EXISTS idx_athletes_nc_united_team ON athletes(nc_united_team);
CREATE INDEX IF NOT EXISTS idx_athletes_weight_class ON athletes(weight_class);
CREATE INDEX IF NOT EXISTS idx_logos_institution_name ON logos(institution_name);

-- Insert NC United team logos
INSERT INTO logos (institution_name, logo_url, institution_type, aliases) VALUES
('NC United Blue', '/images/nc-united-blue-logo.png', 'team', '{"nc united blue", "ncunited blue", "nc-united-blue"}'),
('NC United Gold', '/images/nc-united-gold-logo.png', 'team', '{"nc united gold", "ncunited gold", "nc-united-gold"}')
ON CONFLICT DO NOTHING;

-- Update trigger for updated_at
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
