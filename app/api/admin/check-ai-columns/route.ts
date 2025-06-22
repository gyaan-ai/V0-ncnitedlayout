import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    // Check what columns exist in the athletes table
    const { data: columns, error } = await supabase
      .from("information_schema.columns")
      .select("column_name, data_type, is_nullable")
      .eq("table_name", "athletes")
      .order("column_name")

    if (error) {
      console.error("❌ Error checking columns:", error)
      return NextResponse.json({ error: "Failed to check columns" }, { status: 500 })
    }

    const aiColumns =
      columns?.filter(
        (col) =>
          col.column_name.includes("generated") ||
          col.column_name.includes("bio_generated") ||
          col.column_name.includes("headline_generated"),
      ) || []

    return NextResponse.json({
      success: true,
      allColumns: columns?.length || 0,
      aiColumns: aiColumns,
      hasAiColumns: aiColumns.length > 0,
    })
  } catch (error) {
    console.error("❌ Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
