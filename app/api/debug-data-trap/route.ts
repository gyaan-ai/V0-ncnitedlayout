import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Store the last known state
let lastKnownState: any = null

export async function GET() {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // Get REAL current Liam data from database
    const { data: currentData, error } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, generated_headline, generated_bio, updated_at")
      .eq("first_name", "Liam")
      .eq("last_name", "Hickey")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    let changesDetected = false
    let changes = {}

    // Check if data was corrupted to "Test" values
    if (currentData.generated_headline === "Test Headline" || currentData.generated_bio === "Test Bio") {
      changesDetected = true
      changes = {
        ...changes,
        corruption_detected: {
          headline_is_test: currentData.generated_headline === "Test Headline",
          bio_is_test: currentData.generated_bio === "Test Bio",
          timestamp: new Date().toISOString(),
        },
      }
    }

    if (lastKnownState) {
      // Compare with last known state for any changes
      if (lastKnownState.generated_headline !== currentData.generated_headline) {
        changesDetected = true
        changes = {
          ...changes,
          headline_changed: {
            from: lastKnownState.generated_headline,
            to: currentData.generated_headline,
          },
        }
      }

      if (lastKnownState.generated_bio !== currentData.generated_bio) {
        changesDetected = true
        changes = {
          ...changes,
          bio_changed: {
            from: lastKnownState.generated_bio?.substring(0, 50) + "...",
            to: currentData.generated_bio?.substring(0, 50) + "...",
          },
        }
      }
    }

    // Update last known state
    lastKnownState = currentData

    return NextResponse.json({
      changes_detected: changesDetected,
      changes,
      current_liam_data: currentData,
      monitoring_active: true,
      debug_info: {
        headline_contains_trap: currentData.generated_headline?.includes("TRAP"),
        bio_contains_trap: currentData.generated_bio?.includes("TRAP"),
        is_test_data: currentData.generated_headline === "Test Headline" && currentData.generated_bio === "Test Bio",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to monitor data", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
