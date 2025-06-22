import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST() {
  try {
    console.log("🔍 Testing save with AI fields...")

    // First, let's try to select the new columns to force cache refresh
    console.log("🔄 Attempting to select new columns...")
    const { data: testSelect, error: selectError } = await supabase
      .from("athletes")
      .select("id, generated_headline, generated_bio")
      .limit(1)

    if (selectError) {
      console.log("❌ Select error:", selectError)
      return NextResponse.json({
        success: false,
        error: "Cannot select new columns",
        details: selectError.message,
        hint: selectError.hint,
        code: selectError.code,
      })
    }

    console.log("✅ Can select new columns:", testSelect)

    // Now try to update with the new fields
    console.log("🔄 Attempting update with AI fields...")
    const { data: athlete, error } = await supabase
      .from("athletes")
      .update({
        generated_headline: "Test AI Headline",
        generated_bio: "Test AI Bio Content",
      })
      .eq("id", "ce1bf191-623d-46dd-a0ca-5929e85871f1")
      .select()
      .single()

    if (error) {
      console.log("❌ Update error:", error)
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
    }

    console.log("✅ Update successful:", athlete)
    return NextResponse.json({
      success: true,
      message: "AI fields updated successfully!",
      athlete,
    })
  } catch (error) {
    console.error("❌ Server error:", error)
    return NextResponse.json({
      success: false,
      error: "Server error",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
