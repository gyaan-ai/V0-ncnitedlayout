import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(`logos/teams/nc-united-blue-${Date.now()}.png`, file, {
      access: "public",
    })

    // Check if logo already exists
    const existing = await sql`
      SELECT id FROM logo_library 
      WHERE name = 'nc-united-blue' AND type = 'team'
    `

    if (existing.length > 0) {
      // Update existing logo
      await sql`
        UPDATE logo_library 
        SET 
          file_url = ${blob.url},
          file_name = ${blob.pathname},
          aliases = ARRAY['nc united blue', 'nc-united-blue', 'blue team', 'blue'],
          is_active = true,
          updated_at = NOW()
        WHERE name = 'nc-united-blue' AND type = 'team'
      `
    } else {
      // Insert new logo
      await sql`
        INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases)
        VALUES (
          'nc-united-blue',
          'NC United Blue',
          'team',
          ${blob.url},
          ${blob.pathname},
          ARRAY['nc united blue', 'nc-united-blue', 'blue team', 'blue']
        )
      `
    }

    return NextResponse.json({
      success: true,
      url: blob.url,
      message: "NC United Blue logo uploaded successfully",
    })
  } catch (error) {
    console.error("Error uploading NC United Blue logo:", error)
    return NextResponse.json(
      {
        error: "Failed to upload logo",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
