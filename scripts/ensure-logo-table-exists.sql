-- Ensure the logo_library table exists with correct structure
CREATE TABLE IF NOT EXISTS logo_library (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('college', 'high_school', 'club', 'team')),
    file_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    aliases TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_logo_library_name_type ON logo_library(name, type);

-- Check if table exists and show structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'logo_library'
ORDER BY ordinal_position;

-- Show current logos
SELECT * FROM logo_library ORDER BY created_at DESC;
