import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    console.log("🔍 Debugging Liam Hickey bio...")

    // Get all Liam Hickey records
    const { data: athletes, error } = await supabase
      .from("athletes")
      .select("*")
      .ilike("first_name", "liam")
      .ilike("last_name", "hickey")

    if (error) {
      console.error("❌ Database error:", error)
      return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 })
    }

    console.log(`✅ Found ${athletes?.length || 0} Liam Hickey records`)

    // Analyze the data
    const summary = {
      total_records: athletes?.length || 0,
      with_bio: athletes?.filter((a) => a.generated_bio || a.ai_summary).length || 0,
      with_headline: athletes?.filter((a) => a.generated_headline).length || 0,
    }

    // Log details for each record
    athletes?.forEach((athlete, index) => {
      console.log(`📋 Record ${index + 1}:`, {
        id: athlete.id,
        name: `${athlete.first_name} ${athlete.last_name}`,
        has_generated_bio: !!athlete.generated_bio,
        has_ai_summary: !!athlete.ai_summary,
        has_headline: !!athlete.generated_headline,
        bio_length: athlete.generated_bio?.length || 0,
        summary_length: athlete.ai_summary?.length || 0,
        headline_length: athlete.generated_headline?.length || 0,
        updated_at: athlete.updated_at,
      })
    })

    return NextResponse.json({
      success: true,
      athletes: athletes || [],
      summary,
      message: `Found ${athletes?.length || 0} Liam Hickey records`,
    })
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
