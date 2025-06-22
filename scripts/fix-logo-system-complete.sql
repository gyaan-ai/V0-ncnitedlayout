-- Drop and recreate the logo_library table
DROP TABLE IF EXISTS logo_library CASCADE;

CREATE TABLE logo_library (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
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
CREATE INDEX idx_logo_library_type ON logo_library(type);
CREATE INDEX idx_logo_library_name ON logo_library(name);
CREATE INDEX idx_logo_library_active ON logo_library(is_active);

-- Insert logos for Liam's institutions with proper aliases
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases) VALUES
('unc-chapel-hill', 'University of North Carolina at Chapel Hill', 'college', '/images/logos/unc-chapel-hill.png', 'unc-chapel-hill.png', ARRAY['university of north carolina at chapel hill', 'unc', 'tar heels', 'unc chapel hill', 'university of north carolina', 'north carolina']),
('cardinal-gibbons', 'Cardinal Gibbons High School', 'high_school', '/images/logos/cardinal-gibbons.png', 'cardinal-gibbons.png', ARRAY['cardinal gibbons high school', 'cardinal gibbons hs', 'cardinal gibbons', 'gibbons']),
('raw-wrestling', 'RAW Wrestling', 'club', '/images/logos/raw-wrestling.png', 'raw-wrestling.png', ARRAY['raw wrestling', 'raw', 'raw club', 'raw wrestling club']);

-- Insert additional NC institutions
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases) VALUES
('nc-state', 'NC State University', 'college', '/images/logos/nc-state.png', 'nc-state.png', ARRAY['north carolina state', 'ncsu', 'wolfpack', 'nc state', 'north carolina state university']),
('duke', 'Duke University', 'college', '/images/logos/duke.png', 'duke.png', ARRAY['duke blue devils', 'blue devils', 'duke']),
('wake-forest', 'Wake Forest University', 'college', '/images/logos/wake-forest.png', 'wake-forest.png', ARRAY['wake forest', 'demon deacons', 'wake']),
('appalachian-state', 'Appalachian State University', 'college', '/images/logos/appalachian-state.png', 'appalachian-state.png', ARRAY['app state', 'mountaineers', 'appalachian state']),
('nc-united', 'NC United Wrestling', 'club', '/images/logos/nc-united.png', 'nc-united.png', ARRAY['nc united', 'north carolina united', 'nc united wrestling']);
