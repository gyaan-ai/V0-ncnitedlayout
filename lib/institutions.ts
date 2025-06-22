import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface College {
  id: number
  name: string
  display_name: string
  short_name?: string
  aliases: string[]
  division?: string
  conference?: string
  state?: string
  logo_url?: string
  website_url?: string
  is_active: boolean
}

export interface HighSchool {
  id: number
  name: string
  display_name: string
  short_name?: string
  aliases: string[]
  city?: string
  state: string
  classification?: string
  logo_url?: string
  website_url?: string
  is_active: boolean
}

export interface WrestlingClub {
  id: number
  name: string
  display_name: string
  short_name?: string
  aliases: string[]
  city?: string
  state?: string
  region?: string
  logo_url?: string
  website_url?: string
  head_coach?: string
  is_active: boolean
}

// College functions
export async function getAllColleges() {
  const rows = await sql`
    SELECT * FROM colleges 
    WHERE is_active = true 
    ORDER BY display_name
  `
  return rows as College[]
}

export async function getCollegesByDivision(division: string) {
  const rows = await sql`
    SELECT * FROM colleges 
    WHERE division = ${division} AND is_active = true 
    ORDER BY display_name
  `
  return rows as College[]
}

export async function searchColleges(query: string) {
  const searchTerm = `%${query.toLowerCase()}%`
  const rows = await sql`
    SELECT * FROM colleges 
    WHERE is_active = true 
    AND (
      LOWER(display_name) LIKE ${searchTerm}
      OR LOWER(short_name) LIKE ${searchTerm}
      OR EXISTS (
        SELECT 1 FROM unnest(aliases) AS alias 
        WHERE LOWER(alias) LIKE ${searchTerm}
      )
    )
    ORDER BY 
      CASE 
        WHEN LOWER(display_name) LIKE ${query.toLowerCase() + "%"} THEN 1
        WHEN LOWER(short_name) LIKE ${query.toLowerCase() + "%"} THEN 2
        ELSE 3
      END,
      display_name
    LIMIT 20
  `
  return rows as College[]
}

export async function createCollege(college: Omit<College, "id" | "is_active">) {
  const rows = await sql`
    INSERT INTO colleges (name, display_name, short_name, aliases, division, conference, state, logo_url, website_url)
    VALUES (${college.name}, ${college.display_name}, ${college.short_name}, ${college.aliases}, 
            ${college.division}, ${college.conference}, ${college.state}, ${college.logo_url}, ${college.website_url})
    RETURNING *
  `
  return rows[0] as College
}

// High School functions
export async function getAllHighSchools() {
  const rows = await sql`
    SELECT * FROM high_schools 
    WHERE is_active = true 
    ORDER BY state, display_name
  `
  return rows as HighSchool[]
}

export async function getHighSchoolsByState(state: string) {
  const rows = await sql`
    SELECT * FROM high_schools 
    WHERE state = ${state} AND is_active = true 
    ORDER BY display_name
  `
  return rows as HighSchool[]
}

export async function searchHighSchools(query: string, state?: string) {
  const searchTerm = `%${query.toLowerCase()}%`

  let queryBuilder = sql`
    SELECT * FROM high_schools 
    WHERE is_active = true 
    AND (
      LOWER(display_name) LIKE ${searchTerm}
      OR LOWER(short_name) LIKE ${searchTerm}
      OR EXISTS (
        SELECT 1 FROM unnest(aliases) AS alias 
        WHERE LOWER(alias) LIKE ${searchTerm}
      )
    )
  `

  if (state) {
    queryBuilder = sql`
      SELECT * FROM high_schools 
      WHERE is_active = true 
      AND state = ${state}
      AND (
        LOWER(display_name) LIKE ${searchTerm}
        OR LOWER(short_name) LIKE ${searchTerm}
        OR EXISTS (
          SELECT 1 FROM unnest(aliases) AS alias 
          WHERE LOWER(alias) LIKE ${searchTerm}
        )
      )
    `
  }

  const rows = await queryBuilder`
    ORDER BY 
      CASE 
        WHEN LOWER(display_name) LIKE ${query.toLowerCase() + "%"} THEN 1
        WHEN LOWER(short_name) LIKE ${query.toLowerCase() + "%"} THEN 2
        ELSE 3
      END,
      state, display_name
    LIMIT 20
  `
  return rows as HighSchool[]
}

export async function createHighSchool(highSchool: Omit<HighSchool, "id" | "is_active">) {
  const rows = await sql`
    INSERT INTO high_schools (name, display_name, short_name, aliases, city, state, classification, logo_url, website_url)
    VALUES (${highSchool.name}, ${highSchool.display_name}, ${highSchool.short_name}, ${highSchool.aliases}, 
            ${highSchool.city}, ${highSchool.state}, ${highSchool.classification}, ${highSchool.logo_url}, ${highSchool.website_url})
    RETURNING *
  `
  return rows[0] as HighSchool
}

// Wrestling Club functions
export async function getAllWrestlingClubs() {
  const rows = await sql`
    SELECT * FROM wrestling_clubs 
    WHERE is_active = true 
    ORDER BY display_name
  `
  return rows as WrestlingClub[]
}

export async function getWrestlingClubsByState(state: string) {
  const rows = await sql`
    SELECT * FROM wrestling_clubs 
    WHERE state = ${state} AND is_active = true 
    ORDER BY display_name
  `
  return rows as WrestlingClub[]
}

export async function searchWrestlingClubs(query: string) {
  const searchTerm = `%${query.toLowerCase()}%`
  const rows = await sql`
    SELECT * FROM wrestling_clubs 
    WHERE is_active = true 
    AND (
      LOWER(display_name) LIKE ${searchTerm}
      OR LOWER(short_name) LIKE ${searchTerm}
      OR EXISTS (
        SELECT 1 FROM unnest(aliases) AS alias 
        WHERE LOWER(alias) LIKE ${searchTerm}
      )
    )
    ORDER BY 
      CASE 
        WHEN LOWER(display_name) LIKE ${query.toLowerCase() + "%"} THEN 1
        WHEN LOWER(short_name) LIKE ${query.toLowerCase() + "%"} THEN 2
        ELSE 3
      END,
      display_name
    LIMIT 20
  `
  return rows as WrestlingClub[]
}

export async function createWrestlingClub(club: Omit<WrestlingClub, "id" | "is_active">) {
  const rows = await sql`
    INSERT INTO wrestling_clubs (name, display_name, short_name, aliases, city, state, region, logo_url, website_url, head_coach)
    VALUES (${club.name}, ${club.display_name}, ${club.short_name}, ${club.aliases}, 
            ${club.city}, ${club.state}, ${club.region}, ${club.logo_url}, ${club.website_url}, ${club.head_coach})
    RETURNING *
  `
  return rows[0] as WrestlingClub
}

// Utility functions
export async function findInstitutionByName(name: string, type: "college" | "high_school" | "wrestling_club") {
  const normalizedName = name.toLowerCase().trim()

  switch (type) {
    case "college":
      const colleges = await sql`
        SELECT * FROM colleges 
        WHERE is_active = true 
        AND (
          LOWER(name) = ${normalizedName}
          OR LOWER(display_name) = ${normalizedName}
          OR LOWER(short_name) = ${normalizedName}
          OR ${normalizedName} = ANY(SELECT LOWER(unnest(aliases)))
        )
        LIMIT 1
      `
      return colleges[0] as College | undefined

    case "high_school":
      const highSchools = await sql`
        SELECT * FROM high_schools 
        WHERE is_active = true 
        AND (
          LOWER(name) = ${normalizedName}
          OR LOWER(display_name) = ${normalizedName}
          OR LOWER(short_name) = ${normalizedName}
          OR ${normalizedName} = ANY(SELECT LOWER(unnest(aliases)))
        )
        LIMIT 1
      `
      return highSchools[0] as HighSchool | undefined

    case "wrestling_club":
      const clubs = await sql`
        SELECT * FROM wrestling_clubs 
        WHERE is_active = true 
        AND (
          LOWER(name) = ${normalizedName}
          OR LOWER(display_name) = ${normalizedName}
          OR LOWER(short_name) = ${normalizedName}
          OR ${normalizedName} = ANY(SELECT LOWER(unnest(aliases)))
        )
        LIMIT 1
      `
      return clubs[0] as WrestlingClub | undefined
  }
}

// Get institution statistics
export async function getInstitutionStats() {
  const stats = await sql`
    SELECT 
      (SELECT COUNT(*) FROM colleges WHERE is_active = true) as total_colleges,
      (SELECT COUNT(*) FROM high_schools WHERE is_active = true) as total_high_schools,
      (SELECT COUNT(*) FROM wrestling_clubs WHERE is_active = true) as total_wrestling_clubs,
      (SELECT COUNT(*) FROM recruiting_athletes WHERE college_id IS NOT NULL) as athletes_with_college_commits,
      (SELECT COUNT(DISTINCT college_id) FROM recruiting_athletes WHERE college_id IS NOT NULL) as colleges_with_commits
  `

  return stats[0]
}
