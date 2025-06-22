-- Add NC United Blue and Gold team logos to the logo management system
INSERT INTO institution_logos (institution_name, logo_url, logo_type, aliases, created_at, updated_at) 
VALUES 
  ('NC United Blue', '/images/nc-united-blue-logo.png', 'team', ARRAY['nc united blue', 'nc blue', 'north carolina united blue'], NOW(), NOW())
ON CONFLICT (institution_name) DO UPDATE SET
  logo_url = EXCLUDED.logo_url,
  aliases = EXCLUDED.aliases,
  updated_at = NOW();

-- We'll add the Gold logo once you provide it
-- INSERT INTO institution_logos (institution_name, logo_url, logo_type, aliases, created_at, updated_at) 
-- VALUES 
--   ('NC United Gold', '/images/nc-united-gold-logo.png', 'team', ARRAY['nc united gold', 'nc gold', 'north carolina united gold'], NOW(), NOW())
-- ON CONFLICT (institution_name) DO UPDATE SET
--   logo_url = EXCLUDED.logo_url,
--   aliases = EXCLUDED.aliases,
--   updated_at = NOW();
