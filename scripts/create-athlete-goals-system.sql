-- Create athlete goals system
-- This allows athletes to set and track high school, collegiate, and life goals

-- Create the athlete_goals table
CREATE TABLE IF NOT EXISTS athlete_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  
  -- High School Goals
  high_school_goals JSONB DEFAULT '{}',
  high_school_wrestling_goals TEXT[],
  high_school_academic_goals TEXT[],
  high_school_personal_goals TEXT[],
  
  -- Collegiate Goals  
  collegiate_goals JSONB DEFAULT '{}',
  collegiate_wrestling_goals TEXT[],
  collegiate_academic_goals TEXT[],
  collegiate_personal_goals TEXT[],
  
  -- Life Goals
  life_goals JSONB DEFAULT '{}',
  career_goals TEXT[],
  personal_life_goals TEXT[],
  community_goals TEXT[],
  
  -- Goal tracking
  goals_last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  goals_visibility VARCHAR(20) DEFAULT 'private', -- 'public', 'coaches_only', 'private'
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one goals record per athlete
  UNIQUE(athlete_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_athlete_goals_athlete_id ON athlete_goals(athlete_id);
CREATE INDEX IF NOT EXISTS idx_athlete_goals_visibility ON athlete_goals(goals_visibility);
CREATE INDEX IF NOT EXISTS idx_athlete_goals_updated ON athlete_goals(updated_at);

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_athlete_goals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.goals_last_updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS trigger_update_athlete_goals_updated_at ON athlete_goals;
CREATE TRIGGER trigger_update_athlete_goals_updated_at
  BEFORE UPDATE ON athlete_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_athlete_goals_updated_at();

-- Add RLS (Row Level Security) policies
ALTER TABLE athlete_goals ENABLE ROW LEVEL SECURITY;

-- Policy: Athletes can view and edit their own goals
CREATE POLICY "Athletes can manage their own goals" ON athlete_goals
  FOR ALL USING (
    athlete_id IN (
      SELECT id FROM athletes WHERE user_id = auth.uid()
    )
  );

-- Policy: Coaches can view goals based on visibility settings
CREATE POLICY "Coaches can view appropriate goals" ON athlete_goals
  FOR SELECT USING (
    goals_visibility = 'public' OR
    (goals_visibility = 'coaches_only' AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('college_coach', 'high_school_coach', 'club_coach', 'admin')
    ))
  );

-- Policy: Admins can view all goals
CREATE POLICY "Admins can view all goals" ON athlete_goals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Insert sample goals for Liam Hickey if he exists
DO $$
DECLARE
  liam_id UUID;
BEGIN
  -- Find Liam's athlete ID
  SELECT id INTO liam_id 
  FROM athletes 
  WHERE first_name = 'Liam' AND last_name = 'Hickey'
  LIMIT 1;
  
  -- Insert sample goals if Liam exists
  IF liam_id IS NOT NULL THEN
    INSERT INTO athlete_goals (
      athlete_id,
      high_school_wrestling_goals,
      high_school_academic_goals,
      high_school_personal_goals,
      collegiate_wrestling_goals,
      collegiate_academic_goals,
      collegiate_personal_goals,
      career_goals,
      personal_life_goals,
      community_goals,
      goals_visibility
    ) VALUES (
      liam_id,
      -- High School Wrestling Goals
      ARRAY[
        'Win 2025 NCHSAA State Championship',
        'Achieve All-American status at NHSCA Nationals',
        'Maintain undefeated season record',
        'Break school pin record',
        'Lead team to state championship'
      ],
      -- High School Academic Goals
      ARRAY[
        'Maintain 3.7+ GPA through senior year',
        'Complete AP Business courses with A grades',
        'Earn Academic All-American recognition',
        'Graduate with honors'
      ],
      -- High School Personal Goals
      ARRAY[
        'Mentor younger wrestlers on the team',
        'Improve leadership skills as team captain',
        'Stay injury-free through senior season',
        'Build stronger relationships with teammates'
      ],
      -- Collegiate Wrestling Goals
      ARRAY[
        'Earn starting spot at UNC as freshman',
        'Qualify for NCAA Championships by sophomore year',
        'Become NCAA All-American',
        'Win ACC Championship',
        'Maintain top 10 national ranking',
        'Graduate as 4-time NCAA qualifier'
      ],
      -- Collegiate Academic Goals
      ARRAY[
        'Maintain 3.5+ GPA in Business Administration',
        'Complete internships with major corporations',
        'Join business honor society',
        'Study abroad program junior year',
        'Graduate with Business degree in 4 years'
      ],
      -- Collegiate Personal Goals
      ARRAY[
        'Develop time management skills',
        'Build professional network',
        'Volunteer in local community',
        'Maintain strong family relationships',
        'Stay mentally and physically healthy'
      ],
      -- Career Goals
      ARRAY[
        'Start career in sports management or business',
        'Launch own wrestling academy',
        'Become successful entrepreneur',
        'Give back to wrestling community',
        'Achieve financial independence by 30'
      ],
      -- Personal Life Goals
      ARRAY[
        'Start a family',
        'Travel internationally',
        'Buy first home by 25',
        'Stay involved in wrestling as coach/mentor',
        'Maintain lifelong friendships'
      ],
      -- Community Goals
      ARRAY[
        'Coach youth wrestling programs',
        'Establish scholarship fund for wrestlers',
        'Volunteer at local schools',
        'Support NC United Wrestling Club',
        'Mentor young athletes'
      ],
      'coaches_only' -- Visibility setting
    )
    ON CONFLICT (athlete_id) DO NOTHING; -- Don't overwrite if already exists
    
    RAISE NOTICE 'Sample goals created for Liam Hickey (ID: %)', liam_id;
  ELSE
    RAISE NOTICE 'Liam Hickey not found in athletes table';
  END IF;
END $$;

-- Create view for easy goal retrieval with athlete info
CREATE OR REPLACE VIEW athlete_goals_with_info AS
SELECT 
  ag.*,
  a.first_name,
  a.last_name,
  a.high_school,
  a.graduation_year,
  a.college_committed,
  a.weight_class
FROM athlete_goals ag
JOIN athletes a ON ag.athlete_id = a.id
WHERE a.is_active = true;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON athlete_goals TO authenticated;
GRANT SELECT ON athlete_goals_with_info TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Success message
SELECT 'Athlete goals system created successfully!' as status;
