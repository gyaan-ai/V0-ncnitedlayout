-- Test script to verify all fields are working
-- This will test saving and retrieving all commitment fields

-- First, let's see Liam's current data
SELECT 'Current Liam data:' as status;
SELECT 
  first_name, 
  last_name,
  college_commitment,
  division,
  anticipated_weight,
  college_interest_level,
  college_preferences,
  recruiting_notes,
  recruiting_summary,
  commitment_announcement,
  coach_name,
  is_committed,
  is_featured,
  is_active
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey';

-- Update Liam with test data for all commitment fields
UPDATE athletes 
SET 
  anticipated_weight = '165',
  college_interest_level = 'High',
  college_preferences = 'Strong academic program, competitive wrestling',
  recruiting_notes = 'Top prospect, multiple D1 offers',
  recruiting_summary = 'Elite wrestler with strong academics',
  commitment_announcement = 'Excited to announce my commitment to UNC!',
  coach_name = 'Coleman Scott',
  is_committed = true,
  is_featured = true,
  is_active = true,
  updated_at = CURRENT_TIMESTAMP
WHERE first_name = 'Liam' AND last_name = 'Hickey';

-- Verify the update worked
SELECT 'Updated Liam data:' as status;
SELECT 
  first_name, 
  last_name,
  college_commitment,
  division,
  anticipated_weight,
  college_interest_level,
  college_preferences,
  recruiting_notes,
  recruiting_summary,
  commitment_announcement,
  coach_name,
  is_committed,
  is_featured,
  is_active,
  updated_at
FROM athletes 
WHERE first_name = 'Liam' AND last_name = 'Hickey';
