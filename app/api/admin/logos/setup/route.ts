import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Drop table if exists and recreate (for clean setup)
    await sql`DROP TABLE IF EXISTS logo_library CASCADE;`

    // Create the table
    await sql`
      CREATE TABLE logo_library (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        display_name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL CHECK (type IN ('college', 'high_school', 'club', 'team')),
        file_url VARCHAR(255) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        aliases TEXT[],
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `

    // Create indexes
    await sql`CREATE INDEX idx_logo_library_type ON logo_library(type);`
    await sql`CREATE INDEX idx_logo_library_name ON logo_library(name);`
    await sql`CREATE INDEX idx_logo_library_active ON logo_library(is_active);`

    // Insert initial data
    await sql`
      INSERT INTO logo_library (name, display_name, type, file_url, file_name, aliases) VALUES
      ('unc-chapel-hill', 'University of North Carolina at Chapel Hill', 'college', '/images/logos/colleges/unc-chapel-hill.png', 'unc-chapel-hill.png', ARRAY['university of north carolina', 'unc', 'tar heels', 'unc chapel hill']),
      ('cardinal-gibbons', 'Cardinal Gibbons High School', 'high_school', '/images/logos/high-schools/cardinal-gibbons.png', 'cardinal-gibbons.png', ARRAY['cardinal gibbons hs', 'cardinal gibbons high school']),
      ('raw-wrestling', 'RAW Wrestling', 'club', '/images/logos/clubs/raw-wrestling.png', 'raw-wrestling.png', ARRAY['raw', 'raw club', 'raw wrestling club']),
      ('nc-state', 'NC State University', 'college', '/images/logos/colleges/nc-state.png', 'nc-state.png', ARRAY['north carolina state', 'ncsu', 'wolfpack', 'nc state']),
      ('duke', 'Duke University', 'college', '/images/logos/colleges/duke.png', 'duke.png', ARRAY['duke blue devils', 'blue devils']),
      ('wake-forest', 'Wake Forest University', 'college', '/images/logos/colleges/wake-forest.png', 'wake-forest.png', ARRAY['wake forest', 'demon deacons']);
    `

    return NextResponse.json({
      success: true,
      message: "Logo system setup completed successfully",
      tablesCreated: ["logo_library"],
      logosInserted: 6,
    })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
