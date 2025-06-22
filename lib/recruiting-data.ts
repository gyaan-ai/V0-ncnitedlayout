export type Athlete = {
  id: number
  name: string
  firstName: string
  lastName: string
  image_url: string
  weight_class: string
  graduation_year: number
  high_school: string
  wrestling_club: string
  college_committed: string
  college_division: string
  commitment_date: string
  gender: "Male" | "Female"
  ncUnitedTeam: "Blue" | "White" | "Red" | "Black"
  instagramHandle: string
  achievements: string[]
  recruiting_profile: string
  stats: {
    career_wins: number
    career_losses: number
    pins: number
    tech_falls: number
    major_decisions: number
    decisions: number
  }
  social_links: {
    instagram: string
  }
}

export const sampleAthletes: Athlete[] = [
  {
    id: 1,
    name: "Liam Hickey",
    firstName: "Liam",
    lastName: "Hickey",
    image_url: "/images/liam-hickey-commit-announcement.png",
    weight_class: "157",
    graduation_year: 2025,
    high_school: "Cardinal Gibbons High School",
    wrestling_club: "RAW Wrestling",
    college_committed: "University of North Carolina at Chapel Hill",
    college_division: "NCAA Division I",
    commitment_date: "2024-11-15",
    gender: "Male",
    ncUnitedTeam: "Blue" as const,
    instagramHandle: "@liamhickey_",
    achievements: [
      "2024 NHSCA National Champion (157 lbs)",
      "3x NC State Champion (2022, 2023, 2024)",
      "2024 Ultimate Club Duals Champion",
      "FloWrestling #47 Nationally Ranked (Class of 2025)",
      "2024 Beast of the East Champion",
      "2023 Powerade Tournament Champion",
      "2024 Academic All-American (3.8+ GPA)",
      "4x Regional Champion",
      "2024 Team Captain - Cardinal Gibbons",
      "2023 Outstanding Wrestler Award - NC State Championships",
      "2024 Ironman Tournament Finalist",
      "3x All-Conference Selection",
      "2024 NC United Blue Team Captain",
      "2023 Knockout Sportswear Classic Champion",
      "2024 Virginia Duals Champion",
      "2022 Freshman State Champion",
      "2024 Most Valuable Wrestler - Cardinal Gibbons",
      "2023 Shrine Bowl Wrestling Champion",
      "4x Honor Roll Student",
      "2024 Community Service Award Recipient",
      "2023 Leadership Award - RAW Wrestling",
      "2024 Sportsmanship Award - NHSCA Nationals",
    ],
    recruiting_profile:
      "Liam Hickey is a dominant force on the wrestling mat and an exceptional student-athlete. As a 3-time North Carolina State Champion and 2024 NHSCA National Champion, Liam has proven himself at the highest levels of high school wrestling. His technical prowess, combined with his relentless work ethic and leadership qualities, make him a perfect fit for the University of North Carolina wrestling program. Ranked #47 nationally by FloWrestling, Liam brings both championship experience and academic excellence to Chapel Hill.",
    stats: {
      career_wins: 156,
      career_losses: 12,
      pins: 89,
      tech_falls: 23,
      major_decisions: 18,
      decisions: 26,
    },
    social_links: {
      instagram: "@liamhickey_",
    },
  },
]

// Weight classes for filtering
export const weightClasses = [
  "106",
  "113",
  "120",
  "126",
  "132",
  "138",
  "144",
  "150",
  "157",
  "165",
  "175",
  "190",
  "215",
  "285",
]

// College divisions
export const collegeDivisions = ["NCAA D1", "NCAA D2", "NCAA D3", "NAIA", "NJCAA"]

// Graduation years (current and future)
export const graduationYears = [2025, 2026, 2027, 2028, 2029]

// Helper functions
export function getAthletesByGraduationYear(athletes: Athlete[], year: number) {
  return athletes.filter((athlete) => athlete.graduation_year === year)
}

export function getAthletesByWeightClass(athletes: Athlete[], weightClass: string) {
  return athletes.filter((athlete) => athlete.weight_class === weightClass)
}

export function getAthletesByCollege(athletes: Athlete[], college: string) {
  return athletes.filter((athlete) => athlete.college_committed === college)
}

export function getCommitmentsByDivision(athletes: Athlete[]) {
  const divisions = athletes.reduce(
    (acc, athlete) => {
      if (athlete.college_division) {
        acc[athlete.college_division] = (acc[athlete.college_division] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  return divisions
}

export function getTopColleges(athletes: Athlete[], limit = 10) {
  const colleges = athletes.reduce(
    (acc, athlete) => {
      if (athlete.college_committed) {
        acc[athlete.college_committed] = (acc[athlete.college_committed] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(colleges)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([college, count]) => ({ college, count }))
}
