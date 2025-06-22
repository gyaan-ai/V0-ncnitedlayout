import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    console.log("🔄 Loading athletes from Supabase...")

    const { data: athletes, error } = await supabase
      .from("athletes")
      .select("*")
      .order("graduation_year", { ascending: false })

    if (error) {
      console.error("❌ Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch athletes", details: error.message }, { status: 500 })
    }

    console.log("✅ Loaded", athletes?.length || 0, "athletes")
    return NextResponse.json(athletes || [])
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { data: athlete, error } = await supabase.from("athletes").insert([data]).select().single()

    if (error) {
      console.error("❌ Supabase error:", error)
      return NextResponse.json({ error: "Failed to create athlete", details: error.message }, { status: 500 })
    }

    return NextResponse.json(athlete)
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
