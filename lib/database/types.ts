// Database types for NC United Wrestling CRM

export type UserRole = "wrestler" | "parent" | "college_coach" | "hs_coach" | "club_coach" | "admin"

export type Gender = "Male" | "Female"

export type NCUnitedTeam = "Blue" | "Gold" | "Red" | "White" | "Black"

export type SubscriptionStatus = "active" | "cancelled" | "past_due" | "unpaid"

export type MessageType = "direct" | "group" | "announcement"

export type EventType = "practice" | "tournament" | "meeting"

export type AttendeeStatus = "attending" | "not_attending" | "maybe"

export type InterestLevel = "High" | "Medium" | "Low"

export type InstitutionType = "college" | "high_school" | "club" | "team"

export type MediaType = "image" | "video"

export interface Profile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  role: UserRole
  profile_image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Athlete {
  id: string
  profile_id?: string

  // Basic Info
  first_name: string
  last_name: string
  email?: string
  phone?: string
  date_of_birth?: string
  gender: Gender
  hometown?: string

  // Academic Info
  high_school?: string
  graduation_year?: number
  grade?: string
  gpa?: number
  sat_score?: number
  act_score?: number

  // Wrestling Info
  weight_class?: string
  wrestling_club?: string
  nc_united_team?: NCUnitedTeam

  // Wrestling Record
  wins: number
  losses: number
  pins: number
  tech_falls: number

  // College Recruiting
  is_committed: boolean
  college_committed?: string
  college_division?: string
  college_weight?: string
  commitment_date?: string
  commitment_image_url?: string

  // Media
  profile_image_url?: string
  youtube_highlight_url?: string
  instagram_handle?: string
  twitter_handle?: string

  // AI Generated Content
  generated_headline?: string
  generated_bio?: string

  // Contact Info
  parent_name?: string
  parent_email?: string
  parent_phone?: string
  address?: string

  // Goals and Notes
  wrestling_goals?: string
  academic_goals?: string
  notes?: string

  // Status Flags
  is_active: boolean
  is_featured: boolean
  is_public: boolean

  // Timestamps
  created_at: string
  updated_at: string
}

export interface AthleteAchievement {
  id: string
  athlete_id: string
  tournament_name: string
  year: number
  placement?: string
  weight_class?: string
  record?: string
  style?: string
  grade?: string
  notes?: string
  created_at: string
}

export interface TeamMembership {
  id: string
  athlete_id: string
  team_name: string
  season: string
  is_active: boolean
  joined_date: string
  created_at: string
}

export interface Subscription {
  id: string
  profile_id: string
  athlete_id: string
  plan_type: string
  status: SubscriptionStatus
  stripe_subscription_id?: string
  stripe_customer_id?: string
  current_period_start?: string
  current_period_end?: string
  amount_cents: number
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  subject?: string
  content: string
  is_read: boolean
  message_type: MessageType
  group_id?: string
  created_at: string
}

export interface Event {
  id: string
  created_by: string
  title: string
  description?: string
  event_type?: EventType
  start_time: string
  end_time: string
  location?: string
  is_public: boolean
  max_attendees?: number
  team_specific?: NCUnitedTeam
  created_at: string
}

export interface EventAttendee {
  id: string
  event_id: string
  profile_id: string
  status: AttendeeStatus
  created_at: string
}

export interface CollegeProfile {
  id: string
  name: string
  division: string
  conference?: string
  location?: string
  head_coach?: string
  assistant_coaches?: string[]
  website_url?: string
  logo_url?: string
  description?: string
  recruiting_info?: string
  is_active: boolean
  created_at: string
}

export interface RecruitingNote {
  id: string
  coach_id: string
  athlete_id: string
  college_id: string
  interest_level?: InterestLevel
  notes?: string
  last_contact?: string
  next_contact?: string
  created_at: string
  updated_at: string
}

export interface Logo {
  id: string
  institution_name: string
  institution_type: InstitutionType
  logo_url: string
  aliases?: string[]
  is_verified: boolean
  created_at: string
}

export interface MediaFile {
  id: string
  athlete_id: string
  file_url: string
  file_type: MediaType
  title?: string
  description?: string
  is_featured: boolean
  created_at: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Form types
export interface AthleteFormData extends Omit<Athlete, "id" | "created_at" | "updated_at"> {}

export interface ProfileFormData extends Omit<Profile, "id" | "created_at" | "updated_at"> {}

// Filter types
export interface AthleteFilters {
  nc_united_team?: NCUnitedTeam
  graduation_year?: number
  weight_class?: string
  is_committed?: boolean
  is_featured?: boolean
  search?: string
  limit?: number
  offset?: number
}

export interface EventFilters {
  event_type?: EventType
  team_specific?: NCUnitedTeam
  start_date?: string
  end_date?: string
  is_public?: boolean
}
