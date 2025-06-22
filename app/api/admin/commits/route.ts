import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    console.log("🔍 === GET COMMITS ===")

    const { data: athletes, error } = await supabase
      .from("athletes")
      .select("*")
      .order("graduation_year", { ascending: false })

    if (error) {
      console.error("❌ Database error:", error)
      return NextResponse.json({ error: "Failed to fetch athletes" }, { status: 500 })
    }

    console.log(`📊 Found ${athletes.length} athletes`)

    // Transform the data for the commits page
    const commits = athletes.map((athlete) => ({
      id: athlete.id,
      first_name: athlete.first_name || "",
      last_name: athlete.last_name || "",
      weight_class: athlete.weight || "",
      graduation_year: athlete.graduation_year || 2025,
      high_school: athlete.high_school || "",
      hometown: athlete.hometown || "",
      college_committed: athlete.college_commitment || "",
      college_division: athlete.division || "",
      anticipated_weight: athlete.anticipated_weight || "",
      college_interest_level: athlete.college_interest_level || "",
      recruiting_notes: athlete.recruiting_notes || "",
      commitment_date: athlete.commitment_date || "",
      commitment_announcement: athlete.commitment_announcement || "",
      is_committed: athlete.is_committed || false,
      is_featured: athlete.is_featured || false,
    }))

    return NextResponse.json(commits)
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("💾 === CREATE NEW COMMIT ===")

    const body = await request.json()
    console.log("📥 Received data:", body)

    const { error } = await supabase.from("athletes").insert({
      first_name: body.first_name || "",
      last_name: body.last_name || "",
      college_commitment: body.college_committed || "",
      anticipated_weight: body.anticipated_weight || "",
      college_interest_level: body.college_interest_level || "",
      recruiting_notes: body.recruiting_notes || "",
      graduation_year: body.graduation_year || 2025,
      weight: body.weight_class || "",
      high_school: body.high_school || "",
      hometown: body.hometown || "",
      division: body.college_division || "",
      commitment_date: body.commitment_date || "",
      commitment_announcement: body.commitment_announcement || "",
      is_committed: body.is_committed || false,
      is_featured: body.is_featured || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("❌ Insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("✅ Athlete created successfully!")
    return NextResponse.json({ success: true, message: "Athlete created successfully!" })
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
