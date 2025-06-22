import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Test basic connection
    const [result] = await sql`SELECT 1 as test`

    // Check if athletes table exists
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'athletes'
    `

    const athletesTableExists = tables.length > 0
    let athletesCount = 0
    let tableStructure = []

    if (athletesTableExists) {
      // Get table structure
      tableStructure = await sql`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'athletes' 
        ORDER BY ordinal_position
      `

      // Count athletes
      const [countResult] = await sql`SELECT COUNT(*) as count FROM athletes`
      athletesCount = countResult.count
    }

    return NextResponse.json({
      connection: "OK",
      test_query: result,
      athletes_table_exists: athletesTableExists,
      athletes_count: athletesCount,
      table_structure: tableStructure,
      database_url_set: !!process.env.DATABASE_URL,
    })
  } catch (error) {
    console.error("Database debug error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        database_url_set: !!process.env.DATABASE_URL,
      },
      { status: 500 },
    )
  }
}
