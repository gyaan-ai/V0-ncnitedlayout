import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export const dynamic = "force-dynamic"

export async function POST() {
  try {
    // Update Liam's weight class
    const updateResult = await sql`
      UPDATE athletes 
      SET 
        weight_class = '132',
        updated_at = CURRENT_TIMESTAMP
      WHERE 
        LOWER(first_name) = 'liam' 
        AND LOWER(last_name) = 'hickey'
        AND is_active = true
      RETURNING *
    `

    // Verify the update
    const [verifyResult] = await sql`
      SELECT 
        first_name,
        last_name,
        weight_class,
        high_school,
        college_committed,
        updated_at
      FROM athletes 
      WHERE 
        LOWER(first_name) = 'liam' 
        AND LOWER(last_name) = 'hickey'
        AND is_active = true
    `

    return NextResponse.json({
      success: true,
      updated_records: updateResult.length,
      updated_data: updateResult[0],
      verification: verifyResult,
      message: `Successfully updated Liam Hickey's weight class to 132`,
    })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
