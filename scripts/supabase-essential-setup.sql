-- =====================================================
-- ESSENTIAL SUPABASE SETUP - LOGO SYSTEM ONLY
-- =====================================================

-- 1. Create logo_library table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_logo_library_type ON logo_library(type);
CREATE INDEX IF NOT EXISTS idx_logo_library_active ON logo_library(is_active);
CREATE INDEX IF NOT EXISTS idx_logo_library_name ON logo_library(name);

-- 2. Insert essential logos
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases) VALUES
('unc-chapel-hill', 'UNC Chapel Hill', 'college', '/images/unc-logo.png', 'unc-logo.png', ARRAY['UNC', 'University of North Carolina', 'Tar Heels', 'Carolina']),
('nc-united-blue', 'NC United Blue', 'team', '/images/nc-united-blue-logo.png', 'nc-united-blue-logo.png', ARRAY['NC United Blue Team', 'Blue Team']),
('nc-united-gold', 'NC United Gold', 'team', '/images/nc-united-gold-logo.png', 'nc-united-gold-logo.png', ARRAY['NC United Gold Team', 'Gold Team'])
ON CONFLICT (name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  file_url = EXCLUDED.file_url,
  aliases = EXCLUDED.aliases,
  updated_at = NOW();

-- 3. Enable RLS
ALTER TABLE logo_library ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to logos" ON logo_library
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage logos" ON logo_library
    FOR ALL USING (auth.role() = 'authenticated');

-- 4. Grant permissions
GRANT SELECT ON logo_library TO anon, authenticated;
GRANT ALL ON logo_library TO service_role;

-- Show results
SELECT 'Logo system ready!' as status, COUNT(*) as total_logos FROM logo_library;
