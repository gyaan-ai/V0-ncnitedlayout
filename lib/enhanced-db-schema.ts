// Enhanced database schema for comprehensive wrestling data

export type EnhancedWrestler = {
  id: string
  first_name: string
  last_name: string
  weight: number
  grade: string
  school: string
  hometown?: string
  birthdate?: string
  height?: string
  wrestling_style?: string
  favorite_move?: string
  coach?: string
  years_wrestling?: number
  image_url?: string
  bio?: string
  achievements?: string[]
  created_at: string
}

export type EnhancedTournament = {
  id: string
  name: string
  location: string
  start_date: string
  end_date: string
  season: string // "2024-25", "2023-24", etc.
  tournament_type: "national" | "regional" | "state" | "local" | "dual"
  division?: string
  weight_classes?: number[]
  description?: string
  image_url?: string
  created_at: string
}

export type EnhancedMatch = {
  id: string
  tournament_id: string
  wrestler_id: string
  season: string
  date: string
  round: string // "Prelims", "Quarterfinals", "Semifinals", "Finals", "Consolation"
  mat_number?: number
  opponent_name: string
  opponent_team: string
  opponent_record?: string
  opponent_seed?: number
  wrestler_seed?: number
  result: "W" | "L"
  win_type?: "PIN" | "TF" | "MD" | "DEC" | "FF" | "INJ" | "DQ"
  loss_type?: "PIN" | "TF" | "MD" | "DEC" | "FF" | "INJ" | "DQ"
  score?: string // "15-3", "7-2", etc.
  time?: string // "2:34", "6:00", etc.
  points_scored: number
  points_allowed: number
  team_points: number // Points earned for team
  takedowns?: number
  escapes?: number
  reversals?: number
  near_falls?: number
  penalties?: number
  riding_time?: string
  match_notes?: string
  video_url?: string
  created_at: string
}

export type CareerStats = {
  wrestler_id: string
  total_matches: number
  total_wins: number
  total_losses: number
  win_percentage: number
  pins: number
  tech_falls: number
  major_decisions: number
  decisions: number
  forfeits: number
  total_team_points: number
  avg_team_points: number
  takedowns_total: number
  escapes_total: number
  reversals_total: number
  near_falls_total: number
  fastest_pin?: string
  longest_match?: string
  win_streak?: number
  current_streak?: number
  vs_ranked_opponents?: { wins: number; losses: number }
  tournament_titles?: number
  all_american?: boolean
  state_placer?: boolean
}

export type SeasonStats = {
  wrestler_id: string
  season: string
  matches: number
  wins: number
  losses: number
  pins: number
  tech_falls: number
  major_decisions: number
  decisions: number
  team_points: number
  tournaments_entered: number
  tournament_wins: number
  tournament_places: number
  season_highlights?: string[]
}
