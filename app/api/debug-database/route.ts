import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🔍 === SUPABASE DATABASE DEBUG ===")

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // Get one athlete to see what columns actually exist
    const { data: sampleAthlete, error: sampleError } = await supabase.from("athletes").select("*").limit(1)

    // Get count
    const { count, error: countError } = await supabase.from("athletes").select("*", { count: "exact", head: true })

    // Get all athletes to see the data structure
    const { data: allAthletes, error: allError } = await supabase.from("athletes").select("*")

    const actualColumns = sampleAthlete && sampleAthlete.length > 0 ? Object.keys(sampleAthlete[0]) : []

    return NextResponse.json({
      success: true,
      athleteCount: count || 0,
      actualColumns,
      sampleAthlete: sampleAthlete?.[0] || null,
      errors: {
        sampleError: sampleError?.message,
        countError: countError?.message,
        allError: allError?.message,
      },
      recommendation:
        actualColumns.length > 0
          ? `Found ${actualColumns.length} columns in athletes table - we can work with this!`
          : "No columns found - table structure issue",
      allAthletes: allAthletes?.slice(0, 3) || [], // First 3 athletes for debugging
    })
  } catch (error) {
    console.error("❌ Debug error:", error)
    return NextResponse.json(
      {
        error: "Debug failed",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
