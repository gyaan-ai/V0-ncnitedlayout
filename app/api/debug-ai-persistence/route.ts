import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    console.log("🔍 Debugging AI summary persistence...")

    // Get Liam's current data
    const { data: athlete, error } = await supabase
      .from("athletes")
      .select("*")
      .eq("first_name", "Liam")
      .eq("last_name", "Hickey")
      .single()

    if (error) {
      console.error("❌ Error fetching athlete:", error)
      return NextResponse.json({ error: "Failed to fetch athlete" }, { status: 500 })
    }

    // Check column existence
    const { data: columns, error: columnError } = await supabase
      .from("information_schema.columns")
      .select("column_name, data_type, is_nullable")
      .eq("table_name", "athletes")
      .in("column_name", ["generated_headline", "generated_bio", "bio_generated_at", "headline_generated_at"])

    const debugInfo = {
      athlete_data: {
        id: athlete.id,
        name: `${athlete.first_name} ${athlete.last_name}`,
        has_headline: !!athlete.generated_headline,
        has_bio: !!athlete.generated_bio,
        headline_length: athlete.generated_headline?.length || 0,
        bio_length: athlete.generated_bio?.length || 0,
        bio_generated_at: athlete.bio_generated_at,
        headline_generated_at: athlete.headline_generated_at,
        last_updated: athlete.updated_at,
      },
      database_columns: columns || [],
      raw_ai_data: {
        generated_headline: athlete.generated_headline,
        generated_bio: athlete.generated_bio?.substring(0, 200) + "..." || null,
      },
      timestamps: {
        current_time: new Date().toISOString(),
        bio_age_hours: athlete.bio_generated_at
          ? Math.round((Date.now() - new Date(athlete.bio_generated_at).getTime()) / (1000 * 60 * 60))
          : null,
        headline_age_hours: athlete.headline_generated_at
          ? Math.round((Date.now() - new Date(athlete.headline_generated_at).getTime()) / (1000 * 60 * 60))
          : null,
      },
    }

    console.log("📊 Debug info:", debugInfo)

    return NextResponse.json({
      success: true,
      debug_info: debugInfo,
      message: "AI persistence debug complete",
    })
  } catch (error) {
    console.error("❌ Debug error:", error)
    return NextResponse.json({ error: "Debug failed" }, { status: 500 })
  }
}

export async function POST() {
  try {
    console.log("🧪 Testing AI summary persistence...")

    // Test write
    const testData = {
      generated_headline: `Test Headline - ${new Date().toISOString()}`,
      generated_bio: `Test bio generated at ${new Date().toISOString()} to verify persistence.`,
      bio_generated_at: new Date().toISOString(),
      headline_generated_at: new Date().toISOString(),
    }

    const { data: updateResult, error: updateError } = await supabase
      .from("athletes")
      .update(testData)
      .eq("first_name", "Liam")
      .eq("last_name", "Hickey")
      .select()
      .single()

    if (updateError) {
      console.error("❌ Test update failed:", updateError)
      return NextResponse.json({ error: "Test update failed", details: updateError.message }, { status: 500 })
    }

    // Immediately read back
    const { data: readBack, error: readError } = await supabase
      .from("athletes")
      .select("generated_headline, generated_bio, bio_generated_at, headline_generated_at")
      .eq("first_name", "Liam")
      .eq("last_name", "Hickey")
      .single()

    if (readError) {
      console.error("❌ Test read failed:", readError)
      return NextResponse.json({ error: "Test read failed", details: readError.message }, { status: 500 })
    }

    const testResult = {
      write_successful: !!updateResult,
      read_successful: !!readBack,
      data_matches: readBack.generated_headline === testData.generated_headline,
      written_data: testData,
      read_data: readBack,
    }

    console.log("🧪 Test result:", testResult)

    return NextResponse.json({
      success: true,
      test_result: testResult,
      message: "Persistence test complete",
    })
  } catch (error) {
    console.error("❌ Test error:", error)
    return NextResponse.json({ error: "Test failed" }, { status: 500 })
  }
}
