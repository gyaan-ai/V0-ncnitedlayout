-- Only create what you actually need for recruiting
CREATE TABLE athletes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Essential fields only
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  weight_class INTEGER,
  graduation_year INTEGER,
  high_school VARCHAR(200),
  nc_united_team VARCHAR(10),
  
  -- Commitment info
  is_committed BOOLEAN DEFAULT FALSE,
  college_committed VARCHAR(200),
  commitment_date DATE,
  
  -- Profile
  profile_image_url TEXT,
  ai_generated_bio TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Just the logos you actually use
CREATE TABLE logos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution_name VARCHAR(200) NOT NULL,
  logo_url TEXT NOT NULL,
  aliases TEXT[] DEFAULT '{}'
);

-- Insert only what you need
INSERT INTO logos (institution_name, logo_url, aliases) VALUES
('NC United Blue', '/images/nc-united-blue-logo.png', '{"nc united blue"}'),
('NC United Gold', '/images/nc-united-gold-logo.png', '{"nc united gold"}'),
('University of North Carolina', '/images/unc-logo.png', '{"unc", "tar heels"}');

-- Add Liam Hickey (your test case)
INSERT INTO athletes (first_name, last_name, weight_class, graduation_year, high_school, nc_united_team, is_committed, college_committed, profile_image_url, ai_generated_bio) VALUES
('Liam', 'Hickey', 132, 2025, 'Providence High School', 'Blue', true, 'University of North Carolina', '/images/liam-hickey-commit-announcement.png', 'Elite 132lb wrestler committed to UNC with outstanding tournament record.');
