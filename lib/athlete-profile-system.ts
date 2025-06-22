// Core athlete profile - contains ALL data
export type AthleteProfile = {
  // Basic Info
  id: string
  first_name: string
  last_name: string
  birthdate: string
  hometown: string
  current_school: string
  graduation_year: number

  // Academic Info (for recruiting)
  gpa?: number
  sat_score?: number
  act_score?: number
  academic_honors?: string[]
  intended_major?: string

  // Athletic Info
  primary_sport: string
  secondary_sports?: string[]
  years_competing: number
  current_weight?: number
  height?: string

  // Wrestling Specific
  wrestling_data?: {
    weight_class: number
    wrestling_style: string[] // "folkstyle", "freestyle", "greco"
    favorite_moves: string[]
    current_grade: "freshman" | "sophomore" | "junior" | "senior"
    club_team: string
    high_school_team: string
    coach_name: string
  }

  // Media
  profile_image?: string
  action_photos?: string[]
  highlight_videos?: string[]

  // Achievements & Records
  career_highlights: string[]
  awards: Array<{
    title: string
    year: string
    level: "local" | "regional" | "state" | "national"
  }>

  // College Recruiting (for recruiting portal)
  recruiting_data?: {
    recruiting_status: "uncommitted" | "committed" | "signed"
    college_interest_level: "high" | "medium" | "low"
    committed_school?: string
    committed_date?: string
    college_visits?: Array<{
      school: string
      date: string
      type: "official" | "unofficial"
    }>
    scholarship_offers?: Array<{
      school: string
      offer_date: string
      scholarship_type: "full" | "partial" | "academic"
    }>
  }

  created_at: string
  updated_at: string
}

// Tournament-specific performance data
export type TournamentPerformance = {
  athlete_id: string
  tournament_id: string
  season: string
  weight_class: number
  seed?: number
  final_placement?: number

  // Tournament totals
  total_matches: number
  wins: number
  losses: number
  team_points_contributed: number

  // Match breakdown
  pins: number
  tech_falls: number
  major_decisions: number
  decisions: number
  forfeits_received: number

  // Individual matches
  matches: Array<{
    round: string
    opponent_name: string
    opponent_team: string
    opponent_seed?: number
    result: "W" | "L"
    win_type?: "PIN" | "TF" | "MD" | "DEC" | "FF"
    score: string
    time?: string
    team_points_earned: number
    match_notes?: string
  }>

  tournament_highlights?: string[]
}

// Different card templates for different use cases
export type CardTemplate = {
  id: string
  name: string
  use_case: "tournament" | "recruiting" | "season_summary" | "career_highlights"
  front_layout: {
    primary_image: "profile" | "action" | "commit_ceremony"
    title_format: string
    subtitle_fields: string[]
    stats_display: string[]
    badges: string[]
  }
  back_layout: {
    sections: Array<{
      title: string
      data_source: string
      format: "table" | "list" | "stats_grid" | "timeline"
      fields: string[]
    }>
  }
}
