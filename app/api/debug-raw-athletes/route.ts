import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createClient()

    const { data: athletes, error } = await supabase.from("athletes").select("*").limit(10)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      athletes: athletes || [],
      count: athletes?.length || 0,
    })
  } catch (error) {
    console.error("Error in debug-raw-athletes:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch athletes",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
