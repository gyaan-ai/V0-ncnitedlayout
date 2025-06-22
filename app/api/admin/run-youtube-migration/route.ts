import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST() {
  try {
    console.log("🚀 Starting YouTube column migration...")

    // Check if column already exists
    const { data: columnCheck, error: columnError } = await supabase.rpc("check_column_exists", {
      table_name: "athletes",
      column_name: "youtube_highlight_url",
    })

    if (columnError) {
      console.log("⚠️ Could not check column existence, proceeding with migration...")
    }

    // Add the column using raw SQL
    const { data, error } = await supabase.rpc("exec_sql", {
      sql: `
        ALTER TABLE athletes 
        ADD COLUMN IF NOT EXISTS youtube_highlight_url TEXT;
        
        UPDATE athletes 
        SET updated_at = CURRENT_TIMESTAMP 
        WHERE youtube_highlight_url IS NULL;
      `,
    })

    if (error) {
      console.error("❌ Migration failed:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Migration failed",
          details: error.message,
        },
        { status: 500 },
      )
    }

    console.log("✅ YouTube column migration completed successfully")

    // Verify the column was added
    const { data: verifyData, error: verifyError } = await supabase
      .from("information_schema.columns")
      .select("column_name, data_type")
      .eq("table_name", "athletes")
      .eq("column_name", "youtube_highlight_url")

    return NextResponse.json({
      success: true,
      message: "YouTube highlight URL column added successfully",
      columnExists: verifyData && verifyData.length > 0,
      verification: verifyData,
    })
  } catch (error) {
    console.error("❌ Migration error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Migration failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
