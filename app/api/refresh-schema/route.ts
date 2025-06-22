import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST() {
  try {
    console.log("🔄 Forcing schema refresh...")

    // Method 1: Try to select the new columns to force cache refresh
    const { data: testData, error: testError } = await supabase
      .from("athletes")
      .select("generated_headline, generated_bio")
      .limit(1)

    if (testError) {
      console.error("❌ Columns still not recognized:", testError)

      // Method 2: Try a simple update to force recognition
      const { error: updateError } = await supabase
        .from("athletes")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", "ce1bf191-623d-46dd-a0ca-5929e85871f1")

      return NextResponse.json({
        success: false,
        message: "Columns not yet recognized by Supabase",
        testError: testError.message,
        updateWorked: !updateError,
        suggestion: "Wait a few minutes and try again, or restart your Supabase project",
      })
    }

    // Method 3: Try a test update with the new columns
    const { error: updateError } = await supabase
      .from("athletes")
      .update({
        generated_headline: "Test headline",
        generated_bio: "Test bio",
      })
      .eq("id", "ce1bf191-623d-46dd-a0ca-5929e85871f1")

    return NextResponse.json({
      success: !updateError,
      message: updateError ? "Update failed" : "Schema refresh successful - new columns work!",
      error: updateError?.message,
      testData,
    })
  } catch (error) {
    console.error("❌ Server error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
