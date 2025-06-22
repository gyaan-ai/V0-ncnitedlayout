-- Create recruiting portal tables that integrate with existing system
-- These work alongside your existing wrestlers and tournaments tables

-- Athletes table for recruiting portal (separate from existing wrestlers table)
CREATE TABLE IF NOT EXISTS recruiting_athletes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  graduation_year INTEGER NOT NULL,
  weight_class VARCHAR(20) NOT NULL,
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female')),
  high_school VARCHAR(255) NOT NULL,
  wrestling_club VARCHAR(255),
  college_committed VARCHAR(255),
  college_division VARCHAR(20) CHECK (college_division IN ('NCAA D1', 'NCAA D2', 'NCAA D3', 'NAIA', 'NJCAA')),
  achievements TEXT[],
  image_url VARCHAR(500),
  commitment_date DATE,
  recruiting_profile TEXT,
  stats JSONB,
  social_links JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- College commitments tracking
CREATE TABLE IF NOT EXISTS college_commitments (
  id SERIAL PRIMARY KEY,
  athlete_id INTEGER REFERENCES recruiting_athletes(id) ON DELETE CASCADE,
  college_name VARCHAR(255) NOT NULL,
  college_division VARCHAR(20) NOT NULL,
  commitment_date DATE NOT NULL,
  announcement_details TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Prospect rankings
CREATE TABLE IF NOT EXISTS prospect_rankings (
  id SERIAL PRIMARY KEY,
  athlete_id INTEGER REFERENCES recruiting_athletes(id) ON DELETE CASCADE,
  graduation_year INTEGER NOT NULL,
  weight_class VARCHAR(20) NOT NULL,
  ranking_position INTEGER NOT NULL,
  ranking_type VARCHAR(50) DEFAULT 'overall', -- overall, state, regional
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User submissions for community features
CREATE TABLE IF NOT EXISTS user_submissions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255), -- Links to your existing auth system
  submission_type VARCHAR(50) NOT NULL, -- 'new_commit', 'athlete_update', 'correction'
  athlete_data JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by VARCHAR(255)
);

-- Edit requests for corrections
CREATE TABLE IF NOT EXISTS edit_requests (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255), -- Links to your existing auth system
  athlete_id INTEGER REFERENCES recruiting_athletes(id),
  field_name VARCHAR(100) NOT NULL,
  current_value TEXT,
  proposed_value TEXT NOT NULL,
  reason TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by VARCHAR(255)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_recruiting_athletes_graduation_year ON recruiting_athletes(graduation_year);
CREATE INDEX IF NOT EXISTS idx_recruiting_athletes_weight_class ON recruiting_athletes(weight_class);
CREATE INDEX IF NOT EXISTS idx_recruiting_athletes_college ON recruiting_athletes(college_committed);
CREATE INDEX IF NOT EXISTS idx_college_commitments_athlete ON college_commitments(athlete_id);
CREATE INDEX IF NOT EXISTS idx_prospect_rankings_year_weight ON prospect_rankings(graduation_year, weight_class);
