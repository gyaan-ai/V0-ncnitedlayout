import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // First, let's see what athletes exist
    const allAthletes = await sql`
      SELECT first_name, last_name, is_active, is_committed 
      FROM athletes 
      ORDER BY first_name, last_name
    `

    // Then specifically look for Liam
    const liamResults = await sql`
      SELECT * FROM athletes 
      WHERE LOWER(first_name) LIKE '%liam%' 
         OR LOWER(last_name) LIKE '%hickey%'
    `

    // Check table structure
    const tableInfo = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'athletes'
      ORDER BY ordinal_position
    `

    return NextResponse.json({
      totalAthletes: allAthletes.length,
      allAthletes: allAthletes,
      liamResults: liamResults,
      tableStructure: tableInfo,
    })
  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
