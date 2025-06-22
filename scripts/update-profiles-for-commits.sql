-- Add college_commit field to the role_data JSONB structure
-- This is a safe operation as it doesn't affect existing data
COMMENT ON COLUMN profiles.role_data IS 'Now includes college_commit data for wrestlers';
