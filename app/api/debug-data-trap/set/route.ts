import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const trapTimestamp = new Date().toISOString()
    const uniqueId = Math.random().toString(36).substring(7)

    // Set GOOD data that we expect to stay - catch when it gets changed to "Test" values
    const trapData = {
      generated_headline: `Liam Hickey Commits to UNC - TRAP DATA ${uniqueId}`,
      generated_bio: `Liam Hickey, a standout wrestler from North Carolina United Wrestling, has officially committed to the University of North Carolina. This talented athlete has shown exceptional skill and dedication throughout his high school career. TRAP TIMESTAMP: ${trapTimestamp} - ID: ${uniqueId}`,
      updated_at: trapTimestamp,
    }

    const { error } = await supabase
      .from("athletes")
      .update(trapData)
      .eq("first_name", "Liam")
      .eq("last_name", "Hickey")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      trap_data: trapData,
      message: "Trap data set successfully! Now monitoring for changes...",
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to set trap data", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
