import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Get all logos to see what we have
    const allLogos = await sql`
      SELECT id, name, display_name, type, file_url, aliases, is_active
      FROM logo_library 
      ORDER BY type, name
    `

    // Check specific searches for Liam's organizations
    const rawSearch = await sql`
      SELECT * FROM logo_library 
      WHERE type = 'club' 
        AND is_active = true
        AND (
          LOWER(name) LIKE '%raw%' OR
          LOWER(display_name) LIKE '%raw%' OR
          'raw' = ANY(SELECT LOWER(unnest(aliases)))
        )
    `

    const uncSearch = await sql`
      SELECT * FROM logo_library 
      WHERE type = 'college' 
        AND is_active = true
        AND (
          LOWER(name) LIKE '%north carolina%' OR
          LOWER(display_name) LIKE '%unc%' OR
          LOWER(name) LIKE '%carolina%' OR
          'unc' = ANY(SELECT LOWER(unnest(aliases)))
        )
    `

    const ncUnitedSearch = await sql`
      SELECT * FROM logo_library 
      WHERE type = 'team' 
        AND is_active = true
        AND (
          LOWER(name) LIKE '%nc-united%' OR
          LOWER(name) LIKE '%nc united%' OR
          LOWER(display_name) LIKE '%nc united%'
        )
    `

    return NextResponse.json({
      allLogos,
      searches: {
        raw: rawSearch,
        unc: uncSearch,
        ncUnited: ncUnitedSearch,
      },
      liamData: {
        college_committed: "University of North Carolina",
        wrestling_club: "RAW",
        nc_united_team: "Blue",
      },
    })
  } catch (error) {
    console.error("Error debugging logos:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
