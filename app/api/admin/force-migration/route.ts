import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function POST() {
  try {
    console.log("🚀 === FORCE MIGRATION STARTED ===")

    // Add all missing columns in one go
    await sql`
      ALTER TABLE athletes 
      ADD COLUMN IF NOT EXISTS is_committed BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
      ADD COLUMN IF NOT EXISTS anticipated_weight VARCHAR(10),
      ADD COLUMN IF NOT EXISTS college_interest_level VARCHAR(50),
      ADD COLUMN IF NOT EXISTS college_preferences TEXT,
      ADD COLUMN IF NOT EXISTS recruiting_notes TEXT,
      ADD COLUMN IF NOT EXISTS recruiting_summary TEXT,
      ADD COLUMN IF NOT EXISTS commitment_announcement TEXT,
      ADD COLUMN IF NOT EXISTS coach_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS commitment_date DATE,
      ADD COLUMN IF NOT EXISTS bio_summary TEXT,
      ADD COLUMN IF NOT EXISTS media_notes TEXT,
      ADD COLUMN IF NOT EXISTS parent_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS parent_relationship VARCHAR(50),
      ADD COLUMN IF NOT EXISTS parent_email VARCHAR(255),
      ADD COLUMN IF NOT EXISTS parent_phone VARCHAR(20),
      ADD COLUMN IF NOT EXISTS emergency_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS emergency_relationship VARCHAR(50),
      ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(20),
      ADD COLUMN IF NOT EXISTS instagram_handle VARCHAR(100),
      ADD COLUMN IF NOT EXISTS twitter_handle VARCHAR(100),
      ADD COLUMN IF NOT EXISTS academic_honors TEXT,
      ADD COLUMN IF NOT EXISTS intended_major VARCHAR(255),
      ADD COLUMN IF NOT EXISTS commitment_photo_url TEXT,
      ADD COLUMN IF NOT EXISTS red_team BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS black_team BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS white_team BOOLEAN DEFAULT false
    `

    console.log("✅ Migration completed!")

    // Check what columns exist now
    const columns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'athletes' 
      ORDER BY column_name
    `

    return NextResponse.json({
      success: true,
      message: "Migration completed successfully!",
      columns: columns.map((c) => c.column_name),
      total_columns: columns.length,
    })
  } catch (error) {
    console.error("❌ Migration Error:", error)
    return NextResponse.json(
      {
        error: "Migration failed",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
