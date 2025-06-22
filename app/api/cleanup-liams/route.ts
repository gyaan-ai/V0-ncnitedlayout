import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    const liams = await sql`
      SELECT * FROM athletes 
      WHERE LOWER(first_name) = 'liam' 
      AND LOWER(last_name) = 'hickey'
      ORDER BY created_at DESC
    `

    return NextResponse.json({ liams, count: liams.length })
  } catch (error) {
    console.error("Error fetching Liams:", error)
    return NextResponse.json({ error: "Failed to fetch Liam records" }, { status: 500 })
  }
}
