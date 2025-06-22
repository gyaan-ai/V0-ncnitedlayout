-- First, let's make the email column nullable temporarily to fix any existing data
ALTER TABLE profiles ALTER COLUMN email DROP NOT NULL;

-- Update any existing profiles that have null emails with their auth user email
UPDATE profiles 
SET email = auth.users.email 
FROM auth.users 
WHERE profiles.id = auth.users.id 
AND profiles.email IS NULL;

-- Now make email NOT NULL again
ALTER TABLE profiles ALTER COLUMN email SET NOT NULL;

-- Verify the fix
SELECT id, email, first_name, last_name 
FROM profiles 
WHERE email IS NULL;
