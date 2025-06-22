import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.SUPABASE_POSTGRES_URL!)

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Get database connection info
    const connectionString = process.env.SUPABASE_POSTGRES_URL || ""
    const url = new URL(connectionString)

    const result = {
      database_type: connectionString.includes("neon")
        ? "Neon"
        : connectionString.includes("supabase")
          ? "Supabase"
          : "Unknown",
      database_host: url.hostname,
      connection_masked: connectionString.replace(/:[^:@]*@/, ":****@"),
      current_time: null,
      liam_data: null,
      available_env_vars: {
        has_database_url: !!process.env.DATABASE_URL,
        has_supabase_postgres_url: !!process.env.SUPABASE_POSTGRES_URL,
        has_postgres_url: !!process.env.POSTGRES_URL,
      },
    }

    // Test connection and get current time
    try {
      const [timeResult] = await sql`SELECT NOW() as current_time`
      result.current_time = timeResult.current_time
    } catch (error) {
      result.error = `Time query failed: ${error.message}`
    }

    // Get Liam's data from current database
    try {
      const [liamData] = await sql`
        SELECT 
          id,
          first_name,
          last_name,
          weight_class,
          high_school,
          college_committed,
          updated_at
        FROM athletes 
        WHERE LOWER(first_name) = 'liam'
          AND LOWER(last_name) = 'hickey'
          AND is_active = true
        LIMIT 1
      `
      result.liam_data = liamData
    } catch (error) {
      result.liam_error = `Liam query failed: ${error.message}`
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Database check error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
