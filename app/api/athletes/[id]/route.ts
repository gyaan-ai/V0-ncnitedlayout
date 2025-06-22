import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { data: athlete, error } = await supabase.from("athletes").select("*").eq("id", params.id).single()

    if (error) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 })
    }

    return NextResponse.json(athlete)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    console.log("🔥 DIRECT SAVE - AI Summary Data:", {
      id: params.id,
      generated_headline: body.generated_headline,
      generated_bio: body.generated_bio?.substring(0, 100) + "...",
    })

    // Remove system fields that shouldn't be updated
    const { id, created_at, updated_at, ...updateData } = body

    // DIRECT UPDATE - no timestamps, just the AI content
    const { data: athlete, error } = await supabase
      .from("athletes")
      .update({
        // Basic fields
        first_name: updateData.first_name,
        last_name: updateData.last_name,
        email: updateData.email,
        phone: updateData.phone,
        gender: updateData.gender,
        weight_class: updateData.weight_class,
        graduation_year: updateData.graduation_year,
        high_school: updateData.high_school,
        wrestling_club: updateData.wrestling_club,
        nc_united_team: updateData.nc_united_team,
        hometown: updateData.hometown,
        date_of_birth: updateData.date_of_birth,
        grade: updateData.grade,
        gpa: updateData.gpa,
        sat_score: updateData.sat_score,
        is_active: updateData.is_active,
        is_committed: updateData.is_committed,
        is_featured: updateData.is_featured,
        is_public: updateData.is_public,
        college_committed: updateData.college_committed,
        college_division: updateData.college_division,
        college_weight: updateData.college_weight,
        commitment_image_url: updateData.commitment_image_url,
        profile_image_url: updateData.profile_image_url,
        youtube_highlight_url: updateData.youtube_highlight_url,
        parent_name: updateData.parent_name,
        parent_email: updateData.parent_email,
        parent_phone: updateData.parent_phone,
        address: updateData.address,
        wrestling_goals: updateData.wrestling_goals,
        academic_goals: updateData.academic_goals,
        academic_achievements: updateData.academic_achievements,
        interest_level: updateData.interest_level,
        notes: updateData.notes,
        additional_links: updateData.additional_links,
        // JSON fields
        achievements: updateData.achievements,
        wrestling_record: updateData.wrestling_record,
        // AI SUMMARY FIELDS - NO TIMESTAMPS
        generated_headline: updateData.generated_headline,
        generated_bio: updateData.generated_bio,
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("❌ DIRECT SAVE FAILED:", error)
      return NextResponse.json(
        {
          error: "Failed to update athlete",
          details: error.message,
          hint: error.hint,
        },
        { status: 500 },
      )
    }

    console.log("✅ DIRECT SAVE SUCCESS - AI Summary Saved:", {
      saved_headline: athlete.generated_headline,
      saved_bio: athlete.generated_bio?.substring(0, 100) + "...",
    })

    return NextResponse.json({ success: true, athlete })
  } catch (error) {
    console.error("❌ Server error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Soft delete - just set is_active to false
    const { data: athlete, error } = await supabase
      .from("athletes")
      .update({ is_active: false })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Delete error:", error)
      return NextResponse.json({ error: "Failed to delete athlete" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Athlete deactivated successfully" })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
