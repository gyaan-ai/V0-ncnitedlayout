-- =====================================================
-- SUPABASE LOGO MANAGEMENT SYSTEM - COMPLETE SETUP
-- =====================================================

-- 1. Create logo_library table if it doesn't exist
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
CREATE INDEX IF NOT EXISTS idx_logo_library_display_name ON logo_library(display_name);

-- 2. Insert initial logos (using ON CONFLICT to handle existing data)
INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases) VALUES
-- Colleges
('unc-chapel-hill', 'UNC Chapel Hill', 'college', '/images/unc-logo.png', 'unc-logo.png', ARRAY['UNC', 'University of North Carolina', 'Tar Heels', 'Carolina']),
('duke-university', 'Duke University', 'college', '/images/logos/colleges/duke.png', 'duke.png', ARRAY['Duke', 'Blue Devils']),
('nc-state', 'NC State University', 'college', '/images/logos/colleges/nc-state.png', 'nc-state.png', ARRAY['NC State', 'Wolfpack', 'NCSU']),

-- High Schools  
('cardinal-gibbons-hs', 'Cardinal Gibbons High School', 'high_school', '/images/logos/high-schools/cardinal-gibbons.png', 'cardinal-gibbons.png', ARRAY['Cardinal Gibbons', 'Gibbons']),
('green-hope-hs', 'Green Hope High School', 'high_school', '/images/logos/high-schools/green-hope.png', 'green-hope.png', ARRAY['Green Hope']),
('wake-forest-hs', 'Wake Forest High School', 'high_school', '/images/logos/high-schools/wake-forest.png', 'wake-forest.png', ARRAY['Wake Forest']),

-- Clubs
('raw-wrestling', 'RAW Wrestling Club', 'club', '/images/logos/clubs/raw-wrestling.png', 'raw-wrestling.png', ARRAY['RAW', 'RAW Wrestling']),
('triangle-wrestling', 'Triangle Wrestling Club', 'club', '/images/logos/clubs/triangle-wrestling.png', 'triangle-wrestling.png', ARRAY['Triangle']),

-- NC United Teams
('nc-united-blue', 'NC United Blue', 'team', '/images/nc-united-blue-logo.png', 'nc-united-blue-logo.png', ARRAY['NC United Blue Team', 'Blue Team']),
('nc-united-gold', 'NC United Gold', 'team', '/images/logos/teams/nc-united-gold.png', 'nc-united-gold.png', ARRAY['NC United Gold Team', 'Gold Team'])

ON CONFLICT (name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  file_url = EXCLUDED.file_url,
  aliases = EXCLUDED.aliases,
  updated_at = NOW();

-- 3. Check if athletes table exists and add logo-related columns if missing
DO $$
BEGIN
    -- Check if athletes table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'athletes') THEN
        
        -- Add college_logo_url if it doesn't exist
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'college_logo_url') THEN
            ALTER TABLE athletes ADD COLUMN college_logo_url TEXT;
        END IF;
        
        -- Add high_school_logo_url if it doesn't exist
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'high_school_logo_url') THEN
            ALTER TABLE athletes ADD COLUMN high_school_logo_url TEXT;
        END IF;
        
        -- Add club_logo_url if it doesn't exist
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'club_logo_url') THEN
            ALTER TABLE athletes ADD COLUMN club_logo_url TEXT;
        END IF;
        
        -- Add nc_united_logo_url if it doesn't exist
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'athletes' AND column_name = 'nc_united_logo_url') THEN
            ALTER TABLE athletes ADD COLUMN nc_united_logo_url TEXT;
        END IF;
        
        RAISE NOTICE 'Logo columns added to athletes table';
    ELSE
        RAISE NOTICE 'Athletes table does not exist - will be created separately';
    END IF;
END $$;

-- 4. Enable Row Level Security (RLS) for logo_library
ALTER TABLE logo_library ENABLE ROW LEVEL SECURITY;

-- Create policies for logo_library
DROP POLICY IF EXISTS "Allow public read access to logos" ON logo_library;
CREATE POLICY "Allow public read access to logos" ON logo_library
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Allow authenticated users to manage logos" ON logo_library;
CREATE POLICY "Allow authenticated users to manage logos" ON logo_library
    FOR ALL USING (auth.role() = 'authenticated');

-- 5. Create a function to automatically match logos for athletes
CREATE OR REPLACE FUNCTION match_athlete_logos()
RETURNS TRIGGER AS $$
BEGIN
    -- Match college logo
    IF NEW.college_name IS NOT NULL THEN
        SELECT file_url INTO NEW.college_logo_url
        FROM logo_library 
        WHERE type = 'college' 
        AND is_active = true
        AND (
            LOWER(display_name) = LOWER(NEW.college_name)
            OR NEW.college_name = ANY(aliases)
            OR LOWER(NEW.college_name) LIKE '%' || LOWER(display_name) || '%'
        )
        LIMIT 1;
    END IF;
    
    -- Match high school logo
    IF NEW.high_school IS NOT NULL THEN
        SELECT file_url INTO NEW.high_school_logo_url
        FROM logo_library 
        WHERE type = 'high_school' 
        AND is_active = true
        AND (
            LOWER(display_name) = LOWER(NEW.high_school)
            OR NEW.high_school = ANY(aliases)
            OR LOWER(NEW.high_school) LIKE '%' || LOWER(display_name) || '%'
        )
        LIMIT 1;
    END IF;
    
    -- Match club logo
    IF NEW.club IS NOT NULL THEN
        SELECT file_url INTO NEW.club_logo_url
        FROM logo_library 
        WHERE type = 'club' 
        AND is_active = true
        AND (
            LOWER(display_name) = LOWER(NEW.club)
            OR NEW.club = ANY(aliases)
            OR LOWER(NEW.club) LIKE '%' || LOWER(display_name) || '%'
        )
        LIMIT 1;
    END IF;
    
    -- Match NC United team logo
    IF NEW.nc_united_team IS NOT NULL THEN
        SELECT file_url INTO NEW.nc_united_logo_url
        FROM logo_library 
        WHERE type = 'team' 
        AND is_active = true
        AND name = 'nc-united-' || LOWER(NEW.nc_united_team)
        LIMIT 1;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Create trigger for automatic logo matching (only if athletes table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'athletes') THEN
        DROP TRIGGER IF EXISTS trigger_match_athlete_logos ON athletes;
        CREATE TRIGGER trigger_match_athlete_logos
            BEFORE INSERT OR UPDATE ON athletes
            FOR EACH ROW
            EXECUTE FUNCTION match_athlete_logos();
        RAISE NOTICE 'Logo matching trigger created for athletes table';
    END IF;
END $$;

-- 7. Create a view for easy logo lookup
CREATE OR REPLACE VIEW logo_lookup AS
SELECT 
    id,
    name,
    display_name,
    type,
    file_url,
    aliases,
    CASE 
        WHEN type = 'college' THEN '🎓'
        WHEN type = 'high_school' THEN '🏫'
        WHEN type = 'club' THEN '🤼'
        WHEN type = 'team' THEN '👥'
        ELSE '🏛️'
    END as type_icon
FROM logo_library 
WHERE is_active = true
ORDER BY type, display_name;

-- 8. Grant necessary permissions
GRANT SELECT ON logo_library TO anon, authenticated;
GRANT ALL ON logo_library TO service_role;
GRANT SELECT ON logo_lookup TO anon, authenticated;

-- 9. Show summary of what was created
SELECT 
    'Logo Library Setup Complete!' as status,
    COUNT(*) as total_logos,
    COUNT(*) FILTER (WHERE type = 'college') as colleges,
    COUNT(*) FILTER (WHERE type = 'high_school') as high_schools,
    COUNT(*) FILTER (WHERE type = 'club') as clubs,
    COUNT(*) FILTER (WHERE type = 'team') as teams
FROM logo_library WHERE is_active = true;
