-- Create the logo_library table if it doesn't exist
CREATE TABLE IF NOT EXISTS logo_library (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('college', 'high_school', 'club', 'team')),
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  aliases TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_logo_library_type ON logo_library(type);
CREATE INDEX IF NOT EXISTS idx_logo_library_active ON logo_library(is_active);
CREATE INDEX IF NOT EXISTS idx_logo_library_name ON logo_library(name);

-- Insert some initial logos using Vercel Blob URLs
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases) VALUES
('unc-chapel-hill', 'UNC Chapel Hill', 'college', 'https://blob.vercel-storage.com/logos/colleges/unc-chapel-hill.png', 'unc-chapel-hill.png', ARRAY['UNC', 'University of North Carolina', 'Tar Heels']),
('cardinal-gibbons-hs', 'Cardinal Gibbons High School', 'high_school', 'https://blob.vercel-storage.com/logos/high-schools/cardinal-gibbons.png', 'cardinal-gibbons.png', ARRAY['Cardinal Gibbons', 'Gibbons']),
('nc-united-blue', 'NC United Blue', 'team', 'https://blob.vercel-storage.com/logos/teams/nc-united-blue.png', 'nc-united-blue.png', ARRAY['NC United Blue Team'])
ON CONFLICT (name) DO NOTHING;
