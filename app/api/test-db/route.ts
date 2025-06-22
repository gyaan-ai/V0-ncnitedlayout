import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    console.log("Testing database connection...")

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "DATABASE_URL not configured" }, { status: 500 })
    }

    const sql = neon(process.env.DATABASE_URL)

    // Test basic connection
    const [result] = await sql`SELECT 1 as test`
    console.log("Basic connection test:", result)

    // Check if athletes table exists
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'athletes'
    `
    console.log("Athletes table exists:", tables.length > 0)

    if (tables.length === 0) {
      return NextResponse.json({
        error: "Athletes table does not exist",
        available_tables: await sql`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public'
        `,
      })
    }

    // Get table structure
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'athletes'
      ORDER BY ordinal_position
    `
    console.log("Table columns:", columns)

    // Count records
    const [count] = await sql`SELECT COUNT(*) as count FROM athletes`
    console.log("Record count:", count)

    // Get sample records
    const sample = await sql`SELECT * FROM athletes LIMIT 3`
    console.log("Sample records:", sample)

    return NextResponse.json({
      success: true,
      database_connected: true,
      table_exists: true,
      columns: columns,
      record_count: count.count,
      sample_records: sample,
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
        database_url_exists: !!process.env.DATABASE_URL,
      },
      { status: 500 },
    )
  }
}
