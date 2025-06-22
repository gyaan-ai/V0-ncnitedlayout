import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // Get current Liam data
    const { data: currentData, error } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, generated_headline, generated_bio, updated_at")
      .ilike("first_name", "liam")
      .ilike("last_name", "hickey")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Check if data has been modified (contains "Test")
    const isModified = currentData?.generated_headline?.includes("Test") || currentData?.generated_bio?.includes("Test")

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      athlete_found: !!currentData,
      current_data: currentData,
      is_modified: isModified,
      trap_status: isModified ? "🚨 TRAP TRIGGERED!" : "✅ Data intact",
      monitoring: true,
    })
  } catch (error) {
    console.error("Monitor error:", error)
    return NextResponse.json(
      {
        error: "Monitor failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
