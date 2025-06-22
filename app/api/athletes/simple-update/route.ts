import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("🔄 Simple athlete update:", body)

    // Only update basic fields to avoid schema issues
    const updateData = {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone,
      weight_class: body.weight_class,
      graduation_year: body.graduation_year,
      high_school: body.high_school,
      wrestling_club: body.wrestling_club,
      nc_united_team: body.nc_united_team,
      is_committed: body.is_committed || false,
      is_featured: body.is_featured || false,
      is_public: body.is_public !== false,
      is_active: body.is_active !== false,
      updated_at: new Date().toISOString(),
    }

    // Remove undefined values
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key]
      }
    })

    console.log("📝 Cleaned update data:", updateData)

    const { data: athlete, error } = await supabase
      .from("athletes")
      .update(updateData)
      .eq("id", body.id)
      .select()
      .single()

    if (error) {
      console.error("❌ Update error:", error)
      return NextResponse.json({
        success: false,
        error: "Update failed",
        details: error.message,
        hint: error.hint,
      })
    }

    console.log("✅ Update successful:", athlete)
    return NextResponse.json({ success: true, athlete })
  } catch (error) {
    console.error("❌ Server error:", error)
    return NextResponse.json({
      success: false,
      error: "Server error",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
