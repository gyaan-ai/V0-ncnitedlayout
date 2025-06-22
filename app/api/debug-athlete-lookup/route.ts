import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "No ID provided" })
    }

    const supabase = createClient()

    // First, let's see all athletes to understand the data structure
    const { data: allAthletes, error: allError } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, is_active, is_committed")
      .limit(5)

    console.log("Sample athletes:", allAthletes)

    // Now look for the specific athlete
    const { data: athlete, error } = await supabase.from("athletes").select("*").eq("id", id).single()

    // Also try looking by name if ID fails
    const { data: liamAthletes, error: liamError } = await supabase
      .from("athletes")
      .select("*")
      .ilike("first_name", "%liam%")

    return NextResponse.json({
      searchId: id,
      athlete,
      error: error?.message,
      sampleAthletes: allAthletes,
      liamAthletes,
      liamError: liamError?.message,
    })
  } catch (error) {
    console.error("Debug lookup error:", error)
    return NextResponse.json({ error: error.message })
  }
}
