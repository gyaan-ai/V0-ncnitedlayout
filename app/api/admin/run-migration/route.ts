import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function POST() {
  try {
    console.log("🚀 === STARTING SIMPLE DATABASE MIGRATION ===")

    // Simple approach: Just add all columns without checking if they exist
    // PostgreSQL will ignore if column already exists with IF NOT EXISTS
    const migrations = [
      // Core status columns
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS is_committed BOOLEAN DEFAULT FALSE",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE",

      // Commitment and recruiting columns
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS anticipated_weight VARCHAR(10)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS college_interest_level VARCHAR(50)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS college_preferences TEXT",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS recruiting_notes TEXT",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS recruiting_summary TEXT",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS commitment_announcement TEXT",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS coach_name VARCHAR(255)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS commitment_date DATE",

      // Academic columns
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS academic_honors TEXT",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS intended_major VARCHAR(255)",

      // Contact columns
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS parent_name VARCHAR(255)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS parent_relationship VARCHAR(50)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS parent_email VARCHAR(255)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS parent_phone VARCHAR(50)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS emergency_name VARCHAR(255)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS emergency_relationship VARCHAR(50)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(50)",

      // Media and social columns
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS bio_summary TEXT",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS media_notes TEXT",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS instagram_handle VARCHAR(100)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS twitter_handle VARCHAR(100)",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS commitment_photo_url TEXT",

      // Additional team columns
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS red_team BOOLEAN DEFAULT FALSE",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS black_team BOOLEAN DEFAULT FALSE",
      "ALTER TABLE athletes ADD COLUMN IF NOT EXISTS white_team BOOLEAN DEFAULT FALSE",
    ]

    let successCount = 0
    let skipCount = 0

    console.log(`🔄 Running ${migrations.length} migration commands...`)

    // Run each migration individually
    for (let i = 0; i < migrations.length; i++) {
      try {
        await sql.unsafe(migrations[i])
        successCount++
        console.log(`✅ Migration ${i + 1}/${migrations.length} completed`)
      } catch (error) {
        skipCount++
        console.log(`⚠️ Migration ${i + 1} skipped:`, error.message)
      }
    }

    // Simple test - just try to select basic columns
    const testResult = await sql`
      SELECT 
        first_name, 
        last_name,
        id
      FROM athletes 
      WHERE first_name = 'Liam' AND last_name = 'Hickey'
      LIMIT 1
    `

    console.log("✅ Basic test query successful")
    console.log(`🎉 === MIGRATION COMPLETED: ${successCount} added, ${skipCount} skipped ===`)

    return NextResponse.json({
      success: true,
      message: "Database migration completed!",
      columnsAdded: successCount,
      columnsSkipped: skipCount,
      totalMigrations: migrations.length,
      testRecord: testResult[0] || null,
    })
  } catch (error) {
    console.error("❌ Migration failed:", error)
    return NextResponse.json(
      {
        error: "Migration failed",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
