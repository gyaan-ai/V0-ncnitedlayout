// NC United Wrestling CRM Constants

export const USER_ROLES = {
  WRESTLER: "wrestler",
  PARENT: "parent",
  COLLEGE_COACH: "college_coach",
  HS_COACH: "hs_coach",
  CLUB_COACH: "club_coach",
  ADMIN: "admin",
} as const

export const NC_UNITED_TEAMS = {
  BLUE: "Blue",
  GOLD: "Gold",
  RED: "Red",
  WHITE: "White",
  BLACK: "Black",
} as const

export const WEIGHT_CLASSES = {
  MALE: ["106", "113", "120", "126", "132", "138", "144", "150", "157", "165", "175", "190", "215", "285"],
  FEMALE: ["100", "105", "110", "115", "120", "125", "130", "135", "140", "145", "155", "170", "190", "235"],
} as const

export const COLLEGE_DIVISIONS = ["NCAA Division I", "NCAA Division II", "NCAA Division III", "NAIA", "NJCAA"] as const

export const GRADUATION_YEARS = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032] as const

export const GRADE_LEVELS = [
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
  "College Freshman",
  "College Sophomore",
  "College Junior",
  "College Senior",
  "Graduate",
] as const

export const TOURNAMENT_NAMES = [
  "NCHSAA State Championships",
  "NHSCA Nationals",
  "Super32",
  "Fargo Nationals",
  "Southeast Regionals",
  "Beast of the East",
  "Ironman",
  "Walsh Jesuit Ironman",
  "Other",
] as const

export const SUBSCRIPTION_PLANS = {
  BLUE_TEAM: {
    name: "Blue Team",
    price: 15000, // $150.00 in cents
    description: "Premium training program for competitive wrestlers",
  },
  GOLD_TEAM: {
    name: "Gold Team",
    price: 17500, // $175.00 in cents
    description: "Elite women's wrestling program",
  },
} as const

export const MESSAGE_TYPES = {
  DIRECT: "direct",
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
} as const

export const EVENT_TYPES = {
  PRACTICE: "practice",
  TOURNAMENT: "tournament",
  MEETING: "meeting",
  CAMP: "camp",
  FUNDRAISER: "fundraiser",
} as const

export const INTEREST_LEVELS = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
} as const

export const INSTITUTION_TYPES = {
  COLLEGE: "college",
  HIGH_SCHOOL: "high_school",
  CLUB: "club",
  TEAM: "team",
} as const

export const MEDIA_TYPES = {
  IMAGE: "image",
  VIDEO: "video",
} as const

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  PROFILE: "/profile",
  ATHLETES: "/athletes",
  RECRUITING: "/recruiting",
  TEAMS: "/teams",
  CALENDAR: "/calendar",
  MESSAGES: "/messages",
  ADMIN: "/admin",
} as const

export const API_ENDPOINTS = {
  ATHLETES: "/api/athletes",
  PROFILES: "/api/profiles",
  SUBSCRIPTIONS: "/api/subscriptions",
  MESSAGES: "/api/messages",
  EVENTS: "/api/events",
  COLLEGES: "/api/colleges",
  LOGOS: "/api/logos",
  MEDIA: "/api/media",
} as const

// Validation patterns
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^$$\d{3}$$ \d{3}-\d{4}$/,
  YOUTUBE_URL: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
  INSTAGRAM_HANDLE: /^@?[a-zA-Z0-9._]{1,30}$/,
  TWITTER_HANDLE: /^@?[a-zA-Z0-9_]{1,15}$/,
} as const

// File upload limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_VIDEO_TYPES: ["video/mp4", "video/webm"],
  MAX_IMAGES_PER_ATHLETE: 20,
  MAX_VIDEOS_PER_ATHLETE: 5,
} as const

// UI Constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const

export const COLORS = {
  PRIMARY: "#1a1b5c", // Navy
  SECONDARY: "#bc0c03", // Red
  ACCENT: "#ffd700", // Gold
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  ERROR: "#ef4444",
  INFO: "#3b82f6",
} as const
