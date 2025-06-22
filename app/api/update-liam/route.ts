import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const data = await request.json()

    // Update Liam's record
    const [updatedLiam] = await sql`
      UPDATE athletes 
      SET 
        first_name = ${data.first_name},
        last_name = ${data.last_name},
        weight_class = ${data.weight_class},
        graduation_year = ${data.graduation_year},
        high_school = ${data.high_school},
        wrestling_club = ${data.wrestling_club},
        email = ${data.email},
        phone = ${data.phone},
        college_commitment = ${data.college_commitment},
        division = ${data.division},
        image_url = ${data.image_url},
        commitment_photo_url = ${data.commitment_photo_url},
        achievements = ${data.achievements},
        blue_team = ${data.blue_team || false},
        gold_team = ${data.gold_team || false},
        is_featured = ${data.is_featured || false},
        updated_at = CURRENT_TIMESTAMP
      WHERE first_name = 'Liam' AND last_name = 'Hickey'
      RETURNING *
    `

    return NextResponse.json({ success: true, athlete: updatedLiam })
  } catch (error) {
    console.error("Error updating Liam:", error)
    return NextResponse.json({ error: "Failed to update Liam" }, { status: 500 })
  }
}
