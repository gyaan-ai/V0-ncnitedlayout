-- Create logo management tables
CREATE TABLE IF NOT EXISTS logo_library (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('college', 'high_school', 'club', 'team')),
  file_url VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  aliases TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_logo_library_type ON logo_library(type);
CREATE INDEX IF NOT EXISTS idx_logo_library_name ON logo_library(name);
CREATE INDEX IF NOT EXISTS idx_logo_library_active ON logo_library(is_active);

-- Add logo URL columns to recruiting_athletes if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'recruiting_athletes' AND column_name = 'college_logo_url') THEN
    ALTER TABLE recruiting_athletes ADD COLUMN college_logo_url VARCHAR(255);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'recruiting_athletes' AND column_name = 'high_school_logo_url') THEN
    ALTER TABLE recruiting_athletes ADD COLUMN high_school_logo_url VARCHAR(255);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'recruiting_athletes' AND column_name = 'club_logo_url') THEN
    ALTER TABLE recruiting_athletes ADD COLUMN club_logo_url VARCHAR(255);
  END IF;
END $$;

-- Insert some initial logo entries for common institutions
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases) VALUES
('unc-chapel-hill', 'UNC Chapel Hill', 'college', '/images/logos/colleges/unc-chapel-hill.png', 'unc-chapel-hill.png', ARRAY['university of north carolina', 'unc', 'tar heels']),
('nc-state', 'NC State University', 'college', '/images/logos/colleges/nc-state.png', 'nc-state.png', ARRAY['north carolina state', 'ncsu', 'wolfpack']),
('virginia-tech', 'Virginia Tech', 'college', '/images/logos/colleges/virginia-tech.png', 'virginia-tech.png', ARRAY['vt', 'hokies']),
('cardinal-gibbons', 'Cardinal Gibbons High School', 'high_school', '/images/logos/high-schools/cardinal-gibbons.png', 'cardinal-gibbons.png', ARRAY['cardinal gibbons hs']),
('green-hope', 'Green Hope High School', 'high_school', '/images/logos/high-schools/green-hope.png', 'green-hope.png', ARRAY['green hope hs']),
('millbrook', 'Millbrook High School', 'high_school', '/images/logos/high-schools/millbrook.png', 'millbrook.png', ARRAY['millbrook hs']),
('nc-united-blue', 'NC United Blue', 'club', '/images/logos/clubs/nc-united-blue.png', 'nc-united-blue.png', ARRAY['nc united blue team']),
('nc-united-gold', 'NC United Gold', 'club', '/images/logos/clubs/nc-united-gold.png', 'nc-united-gold.png', ARRAY['nc united gold team']),
('raw-wrestling', 'RAW Wrestling', 'club', '/images/logos/clubs/raw-wrestling.png', 'raw-wrestling.png', ARRAY['raw', 'raw club']);
