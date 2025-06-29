-- NC United Wrestling CRM - Clean Database Schema
-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.athlete_achievements CASCADE;
DROP TABLE IF EXISTS public.team_memberships CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.event_attendees CASCADE;
DROP TABLE IF EXISTS public.college_profiles CASCADE;
DROP TABLE IF EXISTS public.recruiting_notes CASCADE;
DROP TABLE IF EXISTS public.logos CASCADE;
DROP TABLE IF EXISTS public.media_files CASCADE;
DROP TABLE IF EXISTS public.athletes CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table (authentication and basic info)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('wrestler', 'parent', 'college_coach', 'hs_coach', 'club_coach', 'admin')),
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Athletes table (comprehensive wrestler data)
CREATE TABLE public.athletes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    -- Basic Info
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('Male', 'Female')) DEFAULT 'Male',
    hometown TEXT,
    
    -- Academic Info
    high_school TEXT,
    graduation_year INTEGER,
    grade TEXT,
    gpa DECIMAL(3,2),
    sat_score INTEGER,
    act_score INTEGER,
    
    -- Wrestling Info
    weight_class TEXT,
    wrestling_club TEXT,
    nc_united_team TEXT CHECK (nc_united_team IN ('Blue', 'Gold', 'Red', 'White', 'Black')),
    
    -- Wrestling Record
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    pins INTEGER DEFAULT 0,
    tech_falls INTEGER DEFAULT 0,
    
    -- College Recruiting
    is_committed BOOLEAN DEFAULT false,
    college_committed TEXT,
    college_division TEXT,
    college_weight TEXT,
    commitment_date DATE,
    commitment_image_url TEXT,
    
    -- Media
    profile_image_url TEXT,
    youtube_highlight_url TEXT,
    instagram_handle TEXT,
    twitter_handle TEXT,
    
    -- AI Generated Content
    generated_headline TEXT,
    generated_bio TEXT,
    
    -- Contact Info
    parent_name TEXT,
    parent_email TEXT,
    parent_phone TEXT,
    address TEXT,
    
    -- Goals and Notes
    wrestling_goals TEXT,
    academic_goals TEXT,
    notes TEXT,
    
    -- Status Flags
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Athlete achievements table
CREATE TABLE public.athlete_achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    athlete_id UUID REFERENCES public.athletes(id) ON DELETE CASCADE,
    tournament_name TEXT NOT NULL,
    year INTEGER NOT NULL,
    placement TEXT,
    weight_class TEXT,
    record TEXT,
    style TEXT, -- freestyle, greco, folkstyle
    grade TEXT, -- for NCHSAA
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team memberships table
CREATE TABLE public.team_memberships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    athlete_id UUID REFERENCES public.athletes(id) ON DELETE CASCADE,
    team_name TEXT NOT NULL, -- 'Blue', 'Gold', etc.
    season TEXT NOT NULL, -- '2024-2025'
    is_active BOOLEAN DEFAULT true,
    joined_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    athlete_id UUID REFERENCES public.athletes(id) ON DELETE CASCADE,
    plan_type TEXT NOT NULL, -- 'blue_team', 'gold_team'
    status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due', 'unpaid')),
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    current_period_start DATE,
    current_period_end DATE,
    amount_cents INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    message_type TEXT DEFAULT 'direct', -- 'direct', 'group', 'announcement'
    group_id TEXT, -- for group messages
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT, -- 'practice', 'tournament', 'meeting'
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    is_public BOOLEAN DEFAULT false,
    max_attendees INTEGER,
    team_specific TEXT, -- 'Blue', 'Gold', null for all
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event attendees table
CREATE TABLE public.event_attendees (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('attending', 'not_attending', 'maybe')) DEFAULT 'attending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, profile_id)
);

-- College profiles table
CREATE TABLE public.college_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    division TEXT NOT NULL,
    conference TEXT,
    location TEXT,
    head_coach TEXT,
    assistant_coaches TEXT[],
    website_url TEXT,
    logo_url TEXT,
    description TEXT,
    recruiting_info TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recruiting notes table
CREATE TABLE public.recruiting_notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    coach_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    athlete_id UUID REFERENCES public.athletes(id) ON DELETE CASCADE,
    college_id UUID REFERENCES public.college_profiles(id) ON DELETE CASCADE,
    interest_level TEXT CHECK (interest_level IN ('High', 'Medium', 'Low')),
    notes TEXT,
    last_contact DATE,
    next_contact DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Logos table
CREATE TABLE public.logos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    institution_name TEXT NOT NULL,
    institution_type TEXT CHECK (institution_type IN ('college', 'high_school', 'club', 'team')),
    logo_url TEXT NOT NULL,
    aliases TEXT[], -- alternative names for matching
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media files table
CREATE TABLE public.media_files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    athlete_id UUID REFERENCES public.athletes(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_type TEXT CHECK (file_type IN ('image', 'video')),
    title TEXT,
    description TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_athletes_nc_united_team ON public.athletes(nc_united_team);
CREATE INDEX idx_athletes_graduation_year ON public.athletes(graduation_year);
CREATE INDEX idx_athletes_weight_class ON public.athletes(weight_class);
CREATE INDEX idx_athletes_is_committed ON public.athletes(is_committed);
CREATE INDEX idx_athletes_is_featured ON public.athletes(is_featured);
CREATE INDEX idx_athletes_is_public ON public.athletes(is_public);
CREATE INDEX idx_achievements_athlete_id ON public.athlete_achievements(athlete_id);
CREATE INDEX idx_achievements_tournament ON public.athlete_achievements(tournament_name);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_messages_recipient ON public.messages(recipient_id);
CREATE INDEX idx_events_start_time ON public.events(start_time);
CREATE INDEX idx_logos_institution_name ON public.logos(institution_name);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athlete_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.college_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruiting_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can read their own profile, admins can read all
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Athletes: Public profiles are viewable by all, private only by owner/admin
CREATE POLICY "Public athletes viewable by all" ON public.athletes
    FOR SELECT USING (is_public = true);

CREATE POLICY "Athletes can view own profile" ON public.athletes
    FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "Admins can manage all athletes" ON public.athletes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Messages: Users can see messages they sent or received
CREATE POLICY "Users can view own messages" ON public.messages
    FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- Events: Public events viewable by all, team events by team members
CREATE POLICY "Public events viewable by all" ON public.events
    FOR SELECT USING (is_public = true);

-- College profiles: Viewable by all
CREATE POLICY "College profiles viewable by all" ON public.college_profiles
    FOR SELECT USING (true);

-- Logos: Viewable by all
CREATE POLICY "Logos viewable by all" ON public.logos
    FOR SELECT USING (true);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_athletes_updated_at BEFORE UPDATE ON public.athletes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recruiting_notes_updated_at BEFORE UPDATE ON public.recruiting_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
