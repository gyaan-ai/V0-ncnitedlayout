import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Client-side types and utilities (no database connection here)
export interface AthleteCommitData {
  id: number
  first_name: string
  last_name: string
  full_name: string
  profile_image_url?: string
  commitment_image_url?: string
  college_committed?: string
  college_division?: string
  high_school: string
  wrestling_club?: string
  nc_united_team?: "Blue" | "Gold" | "Red" | "White" | "Black"
  graduation_year: number
  weight_class: string
  instagram_handle?: string
  commitment_date?: string
  achievements: any
  is_committed: boolean
  is_featured: boolean
  generated_headline?: string
  generated_bio?: string
}

export interface LogoUrls {
  college?: string
  high_school?: string
  club?: string
  nc_united?: string
}

export interface AthleteWithLogos extends AthleteCommitData {
  logos: LogoUrls
}

// Convert athlete data to commit card props (preserving existing card interface)
export function athleteToCommitCardProps(athlete: AthleteCommitData, logos: LogoUrls) {
  return {
    id: athlete.id,
    athleteName: athlete.full_name,
    firstName: athlete.first_name,
    lastName: athlete.last_name,
    commitPhotoUrl: athlete.commitment_image_url,
    collegeName: athlete.college_committed || "TBD",
    collegeLogo: logos.college,
    highSchool: athlete.high_school,
    highSchoolLogo: logos.high_school,
    club: athlete.wrestling_club,
    clubLogo: logos.club,
    ncUnitedTeam: athlete.nc_united_team,
    graduationYear: athlete.graduation_year,
    weightClass: athlete.weight_class,
    division: athlete.college_division || "NCAA Division I",
    instagramHandle: athlete.instagram_handle,
    achievements: athlete.achievements?.other_achievements || [],
    commitmentDate: athlete.commitment_date,
    location: "RALEIGH, NC", // Default location
  }
}

// Server-side database function
export async function getCommittedAthletes(): Promise<AthleteWithLogos[]> {
  try {
    // Get all committed athletes from database
    const athletes = await sql`
      SELECT 
        id,
        first_name,
        last_name,
        (first_name || ' ' || last_name) as full_name,
        profile_image_url,
        commitment_image_url,
        college_committed,
        college_division,
        high_school,
        wrestling_club,
        nc_united_team,
        graduation_year,
        weight_class,
        instagram_handle,
        commitment_date,
        is_committed,
        is_featured,
        generated_headline,
        generated_bio
      FROM athletes 
      WHERE is_committed = true 
        AND is_active = true
      ORDER BY commitment_date DESC, created_at DESC
    `

    // Get logos for each athlete
    const athletesWithLogos = await Promise.all(
      athletes.map(async (athlete) => {
        const logos = await getLogosForAthlete(athlete)
        return {
          ...athlete,
          achievements: { other_achievements: [] },
          logos,
        }
      }),
    )

    return athletesWithLogos
  } catch (error) {
    console.error("Error fetching committed athletes:", error)
    return []
  }
}

async function getLogosForAthlete(athlete: any) {
  const logos: any = {}

  try {
    // Get college logo
    if (athlete.college_committed) {
      const [collegeLogo] = await sql`
        SELECT file_url FROM logo_library 
        WHERE type = 'college' 
          AND is_active = true
          AND LOWER(name) LIKE '%' || LOWER(${athlete.college_committed}) || '%'
        LIMIT 1
      `
      if (collegeLogo) logos.college = collegeLogo.file_url
    }

    // Get high school logo
    if (athlete.high_school) {
      const [hsLogo] = await sql`
        SELECT file_url FROM logo_library 
        WHERE type = 'high_school' 
          AND is_active = true
          AND LOWER(name) = LOWER(${athlete.high_school})
        LIMIT 1
      `
      if (hsLogo) logos.high_school = hsLogo.file_url
    }

    // Get club logo
    if (athlete.wrestling_club) {
      const [clubLogo] = await sql`
        SELECT file_url FROM logo_library 
        WHERE type = 'club' 
          AND is_active = true
          AND LOWER(name) = LOWER(${athlete.wrestling_club})
        LIMIT 1
      `
      if (clubLogo) logos.club = clubLogo.file_url
    }

    // Get NC United team logo
    if (athlete.nc_united_team) {
      const [teamLogo] = await sql`
        SELECT file_url FROM logo_library 
        WHERE type = 'team' 
          AND is_active = true
          AND LOWER(name) LIKE '%nc united%' 
          AND LOWER(name) LIKE '%' || LOWER(${athlete.nc_united_team}) || '%'
        LIMIT 1
      `
      if (teamLogo) logos.nc_united = teamLogo.file_url
    }
  } catch (error) {
    console.error("Error fetching logos for athlete:", error)
  }

  return logos
}

// Client-side API functions
export async function fetchCommittedAthletes(): Promise<AthleteWithLogos[]> {
  try {
    const response = await fetch("/api/athletes/committed")
    if (!response.ok) throw new Error("Failed to fetch committed athletes")
    return await response.json()
  } catch (error) {
    console.error("Error fetching committed athletes:", error)
    return []
  }
}

export async function fetchAthleteByName(firstName: string, lastName: string): Promise<AthleteWithLogos | null> {
  try {
    const response = await fetch(
      `/api/athletes/by-name?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`,
    )
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error("Failed to fetch athlete")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching athlete by name:", error)
    return null
  }
}
