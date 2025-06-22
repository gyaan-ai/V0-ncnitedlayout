import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_SUPABASE_URL!, process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY!)

// Store previous state to detect changes
let previousData = null

export async function GET() {
  try {
    // Get current Liam data
    const { data: currentData, error } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, generated_headline, generated_bio, updated_at")
      .eq("id", "ce1bf191-623d-46dd-a0ca-5929e85871f1")
      .single()

    if (error) {
      console.error("Monitor error:", error)
      throw error
    }

    // Check if data changed (indicating a reset)
    let resetDetected = false
    let timeSinceLastReset = null

    if (previousData) {
      const headlineChanged = previousData.generated_headline !== currentData.generated_headline
      const bioChanged = previousData.generated_bio !== currentData.generated_bio
      const updatedAtChanged = previousData.updated_at !== currentData.updated_at

      if (headlineChanged || bioChanged || updatedAtChanged) {
        resetDetected = true
        const prevTime = new Date(previousData.updated_at)
        const currTime = new Date(currentData.updated_at)
        timeSinceLastReset = currTime.getTime() - prevTime.getTime()

        console.log("🚨 RESET DETECTED:", {
          previousHeadline: previousData.generated_headline,
          currentHeadline: currentData.generated_headline,
          previousBio: previousData.generated_bio?.substring(0, 50) + "...",
          currentBio: currentData.generated_bio?.substring(0, 50) + "...",
          timeDiff: timeSinceLastReset,
        })
      }
    }

    // Store current data for next comparison
    const responseData = {
      success: true,
      currentData,
      previousData,
      resetDetected,
      timeSinceLastReset,
      timestamp: new Date().toISOString(),
      analysis: {
        hasTestHeadline: currentData.generated_headline === "Test Headline",
        hasTestBio: currentData.generated_bio === "Test Bio",
        lastUpdated: currentData.updated_at,
        isLikelyTestData:
          currentData.generated_headline === "Test Headline" && currentData.generated_bio === "Test Bio",
      },
    }

    previousData = { ...currentData }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("❌ Monitor API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
