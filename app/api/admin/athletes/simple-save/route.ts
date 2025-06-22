import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    console.log("🔄 === SIMPLE SAVE STARTED ===")

    const body = await request.json()
    console.log("📄 Received data for:", body.first_name, body.last_name)

    // Simple, direct update - only the essential fields that definitely exist
    const result = await sql`
      UPDATE athletes 
      SET 
        first_name = ${body.first_name || ""},
        last_name = ${body.last_name || ""},
        high_school = ${body.high_school || ""},
        weight_class = ${body.weight_class || ""},
        graduation_year = ${body.graduation_year || 2025},
        updated_at = NOW()
      WHERE id = ${body.id}
      RETURNING *
    `

    if (result.length === 0) {
      throw new Error("No athlete found with that ID")
    }

    console.log("✅ Simple save successful!")
    return NextResponse.json({
      success: true,
      message: "Athlete saved successfully!",
      athlete: result[0],
    })
  } catch (error) {
    console.error("❌ Simple save error:", error)
    return NextResponse.json({ error: "Save failed", details: error.message }, { status: 500 })
  }
}
