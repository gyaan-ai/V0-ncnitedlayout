// Enhanced profile types for role-based system
export type UserRole =
  | "wrestler"
  | "parent"
  | "college_coach"
  | "high_school_coach"
  | "club_coach"
  | "generic"
  | "admin"

export type BaseProfile = {
  id: string
  email: string
  first_name: string
  last_name: string
  role: UserRole
  phone?: string
  profile_image_url?: string
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

// College Division Types
export type CollegeDivision = "Division I" | "Division II" | "Division III" | "NAIA" | "NJCAA"

// Achievement Types
export type TournamentPlacement =
  | "1st"
  | "2nd"
  | "3rd"
  | "4th"
  | "5th"
  | "6th"
  | "7th"
  | "8th"
  | "9th"
  | "10th"
  | "11th"
  | "12th"
  | "13th"
  | "14th"
  | "15th"
  | "16th"
  | "DNP"

export type GradeLevel = "freshman" | "sophomore" | "junior" | "senior"

export type TournamentResult = {
  year: number
  placement: TournamentPlacement
  record?: string // e.g., "5-2", "3-1"
  weight_class?: string
  notes?: string
}

export type NCHSAAResult = {
  grade: GradeLevel
  year: number
  placement: TournamentPlacement
  record?: string
  weight_class?: string
  notes?: string
}

export type WrestlingAchievements = {
  super32: TournamentResult[]
  nhsca: TournamentResult[]
  fargo: TournamentResult[]
  nchsaa: NCHSAAResult[]
  freeform_achievements: string[] // comma-separated achievements
  achievement_paragraph?: string // AI-generated or user-written paragraph
}

// College Commitment Data
export type CollegeCommitData = {
  commitment_date: string // ISO date string
  university: string
  anticipated_weight: string
  division: CollegeDivision
  commitment_photo_url?: string
  announcement_text?: string
  coach_name?: string
  coach_contact?: string
}

// Wrestler Profile Data
export type WrestlerProfileData = {
  weight_class: string
  grade: string
  graduation_year: number
  high_school: string
  club_team?: string
  hometown?: string
  gender?: string
  achievements: WrestlingAchievements
  wrestling_style: string[] // folkstyle, freestyle, greco
  competition_level: string // youth, high_school, college, senior
  gpa?: number
  sat_score?: number
  act_score?: number
  college_interests: string[]
  college_commit?: CollegeCommitData
  parent_contact: {
    name: string
    email: string
    phone: string
    relationship: string
  }
  emergency_contact: {
    name: string
    phone: string
    relationship: string
  }
  medical_info?: {
    allergies?: string
    medications?: string
    conditions?: string
  }
}

// Parent Profile Data
export type ParentProfileData = {
  children: {
    wrestler_id?: string
    name: string
    relationship: string
  }[]
  emergency_contact: {
    name: string
    phone: string
    relationship: string
  }
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
}

// College Coach Profile Data
export type CollegeCoachProfileData = {
  university: string
  position: string
  division: string // D1, D2, D3, NAIA, NJCAA
  conference?: string
  recruiting_classes: number[]
  specialties: string[]
  coaching_experience: number
  contact_preferences: {
    email: boolean
    phone: boolean
    text: boolean
  }
}

// High School Coach Profile Data
export type HighSchoolCoachProfileData = {
  school: string
  position: string
  teams: string[] // varsity, jv, middle_school
  years_coaching: number
  wrestling_background: string
  contact_preferences: {
    email: boolean
    phone: boolean
  }
}

// Club Coach Profile Data
export type ClubCoachProfileData = {
  club_name: string
  position: string
  location: {
    city: string
    state: string
    address?: string
  }
  specialties: string[] // youth, high_school, freestyle, greco, etc.
  certifications: string[]
  years_coaching: number
  contact_preferences: {
    email: boolean
    phone: boolean
    text: boolean
  }
}

// Generic Profile Data
export type GenericProfileData = {
  bio?: string
  interests?: string
}

// Union type for all role data
export type RoleProfileData =
  | WrestlerProfileData
  | ParentProfileData
  | CollegeCoachProfileData
  | HighSchoolCoachProfileData
  | ClubCoachProfileData
  | GenericProfileData

export type UserProfile = BaseProfile & {
  role_data: RoleProfileData
}
