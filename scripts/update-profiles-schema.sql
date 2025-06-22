-- Update profiles table to support role-specific data
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role_data JSONB DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding ON profiles(onboarding_completed);

-- Add role-specific data structure examples:
-- Wrestler: { weight_class, grade, high_school, club, achievements, etc. }
-- Parent: { children_ids, emergency_contact, etc. }
-- College Coach: { university, position, recruiting_classes, etc. }
-- High School Coach: { school, position, teams, etc. }
-- Club Coach: { club_name, location, specialties, etc. }
