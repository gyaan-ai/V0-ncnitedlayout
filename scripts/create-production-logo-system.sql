-- Create comprehensive logo management system
CREATE TABLE IF NOT EXISTS institution_logos (
  id SERIAL PRIMARY KEY,
  institution_name VARCHAR(255) NOT NULL,
  institution_type VARCHAR(50) NOT NULL CHECK (institution_type IN ('college', 'high_school', 'club', 'team')),
  display_name VARCHAR(255) NOT NULL,
  short_name VARCHAR(100),
  logo_url VARCHAR(500) NOT NULL,
  logo_filename VARCHAR(255) NOT NULL,
  aliases TEXT[] DEFAULT '{}',
  primary_color VARCHAR(7), -- hex color
  secondary_color VARCHAR(7), -- hex color
  state VARCHAR(2),
  division VARCHAR(50), -- for colleges
  conference VARCHAR(100), -- for colleges
  classification VARCHAR(50), -- for high schools
  is_active BOOLEAN DEFAULT true,
  upload_date TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW(),
  uploaded_by VARCHAR(255),
  usage_count INTEGER DEFAULT 0,
  UNIQUE(institution_name, institution_type)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_institution_logos_type ON institution_logos(institution_type);
CREATE INDEX IF NOT EXISTS idx_institution_logos_name ON institution_logos(institution_name);
CREATE INDEX IF NOT EXISTS idx_institution_logos_active ON institution_logos(is_active);
CREATE INDEX IF NOT EXISTS idx_institution_logos_state ON institution_logos(state);

-- Create logo usage tracking
CREATE TABLE IF NOT EXISTS logo_usage_log (
  id SERIAL PRIMARY KEY,
  logo_id INTEGER REFERENCES institution_logos(id),
  athlete_id INTEGER,
  usage_context VARCHAR(100), -- 'commit_card', 'profile', 'roster', etc.
  used_at TIMESTAMP DEFAULT NOW()
);

-- Create logo upload queue for batch processing
CREATE TABLE IF NOT EXISTS logo_upload_queue (
  id SERIAL PRIMARY KEY,
  institution_name VARCHAR(255) NOT NULL,
  institution_type VARCHAR(50) NOT NULL,
  priority INTEGER DEFAULT 1, -- 1=high, 2=medium, 3=low
  requested_by VARCHAR(255),
  requested_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
  notes TEXT,
  processed_at TIMESTAMP
);

-- Insert initial high-priority institutions
INSERT INTO logo_upload_queue (institution_name, institution_type, priority, requested_by, notes) VALUES
('University of North Carolina at Chapel Hill', 'college', 1, 'system', 'Liam Hickey commitment'),
('Cardinal Gibbons High School', 'high_school', 1, 'system', 'Liam Hickey commitment'),
('RAW Wrestling', 'club', 1, 'system', 'Liam Hickey commitment'),
('NC State University', 'college', 1, 'system', 'Common NC school'),
('Duke University', 'college', 1, 'system', 'Common NC school'),
('Wake Forest University', 'college', 1, 'system', 'Common NC school'),
('East Carolina University', 'college', 1, 'system', 'Common NC school'),
('NC United Blue', 'club', 1, 'system', 'Our team'),
('NC United Gold', 'club', 1, 'system', 'Our team');

-- Create function to update usage count
CREATE OR REPLACE FUNCTION update_logo_usage_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE institution_logos 
  SET usage_count = usage_count + 1, last_updated = NOW()
  WHERE id = NEW.logo_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for usage tracking
DROP TRIGGER IF EXISTS trigger_update_logo_usage ON logo_usage_log;
CREATE TRIGGER trigger_update_logo_usage
  AFTER INSERT ON logo_usage_log
  FOR EACH ROW
  EXECUTE FUNCTION update_logo_usage_count();
