import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    console.log("🔍 Fetching athletes from database...")

    const { data: athletes, error } = await supabase
      .from("athletes")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Error fetching athletes:", error)
      return NextResponse.json([]) // Return empty array on error
    }

    console.log(`✅ Found ${athletes?.length || 0} athletes`)

    // Always return the athletes array directly
    return NextResponse.json(athletes || [])
  } catch (error) {
    console.error("❌ Athletes API error:", error)
    return NextResponse.json([]) // Return empty array on error
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("🔍 Creating athlete:", body)

    const { data: newAthlete, error } = await supabase.from("athletes").insert([body]).select().single()

    if (error) {
      console.error("❌ Error creating athlete:", error)
      return NextResponse.json({
        success: false,
        error: "Failed to create athlete",
        details: error.message,
      })
    }

    console.log("✅ Created athlete:", newAthlete)

    return NextResponse.json({
      success: true,
      athlete: newAthlete,
    })
  } catch (error) {
    console.error("❌ Create athlete error:", error)
    return NextResponse.json({
      success: false,
      error: "API error",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
