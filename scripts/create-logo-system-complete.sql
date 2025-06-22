-- Create the logo_library table
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

-- Insert initial logos for Liam's institutions
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases) VALUES
('unc-chapel-hill', 'University of North Carolina at Chapel Hill', 'college', '/images/logos/colleges/unc-chapel-hill.png', 'unc-chapel-hill.png', ARRAY['university of north carolina', 'unc', 'tar heels', 'unc chapel hill']),
('cardinal-gibbons', 'Cardinal Gibbons High School', 'high_school', '/images/logos/high-schools/cardinal-gibbons.png', 'cardinal-gibbons.png', ARRAY['cardinal gibbons hs', 'cardinal gibbons high school']),
('raw-wrestling', 'RAW Wrestling', 'club', '/images/logos/clubs/raw-wrestling.png', 'raw-wrestling.png', ARRAY['raw', 'raw club', 'raw wrestling club']);

-- Insert more common NC institutions
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases) VALUES
('nc-state', 'NC State University', 'college', '/images/logos/colleges/nc-state.png', 'nc-state.png', ARRAY['north carolina state', 'ncsu', 'wolfpack', 'nc state']),
('duke', 'Duke University', 'college', '/images/logos/colleges/duke.png', 'duke.png', ARRAY['duke blue devils', 'blue devils']),
('wake-forest', 'Wake Forest University', 'college', '/images/logos/colleges/wake-forest.png', 'wake-forest.png', ARRAY['wake forest', 'demon deacons']),
('appalachian-state', 'Appalachian State University', 'college', '/images/logos/colleges/appalachian-state.png', 'appalachian-state.png', ARRAY['app state', 'mountaineers']),
('green-hope', 'Green Hope High School', 'high_school', '/images/logos/high-schools/green-hope.png', 'green-hope.png', ARRAY['green hope hs', 'green hope high school']),
('millbrook', 'Millbrook High School', 'high_school', '/images/logos/high-schools/millbrook.png', 'millbrook.png', ARRAY['millbrook hs', 'millbrook high school']),
('nc-united-blue', 'NC United Blue', 'club', '/images/logos/clubs/nc-united-blue.png', 'nc-united-blue.png', ARRAY['nc united blue team']),
('nc-united-gold', 'NC United Gold', 'club', '/images/logos/clubs/nc-united-gold.png', 'nc-united-gold.png', ARRAY['nc united gold team']);
