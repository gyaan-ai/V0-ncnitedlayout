import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    console.log("🔧 Starting logo URL fix process...")

    // Get all logos with static file paths
    const logosToFix = await sql`
      SELECT id, name, display_name, type, file_url, file_name
      FROM logo_library 
      WHERE file_url NOT LIKE '%blob.vercel-storage.com%'
      AND file_url NOT LIKE 'http%'
      AND is_active = true
    `

    console.log(`Found ${logosToFix.length} logos that need URL fixes:`)
    logosToFix.forEach((logo) => {
      console.log(`- ${logo.display_name}: ${logo.file_url}`)
    })

    return NextResponse.json({
      success: true,
      message: `Found ${logosToFix.length} logos that need fixing`,
      logos: logosToFix,
      instructions: [
        "These logos have static file paths instead of blob URLs",
        "You need to re-upload these logos through the Logo Manager",
        "Or update the database with correct blob URLs if you have them",
      ],
    })
  } catch (error) {
    console.error("❌ Error checking logo URLs:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check logo URLs",
      },
      { status: 500 },
    )
  }
}
