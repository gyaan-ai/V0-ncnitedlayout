-- Check the current structure of the profiles table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;

-- Check if there are any existing profiles
SELECT id, email, first_name, last_name, role, created_at
FROM profiles 
LIMIT 5;

-- Check for any profiles with null emails
SELECT COUNT(*) as profiles_with_null_email
FROM profiles 
WHERE email IS NULL;
