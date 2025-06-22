import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, generated_headline, generated_bio } = body

    if (!id) {
      return NextResponse.json({ error: "Athlete ID is required" }, { status: 400 })
    }

    // Create Supabase client with service role key for admin operations
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // Prepare update data
    const updateData: any = {}

    if (generated_headline !== undefined) {
      updateData.generated_headline = generated_headline
      updateData.headline_generated_at = new Date().toISOString()
    }

    if (generated_bio !== undefined) {
      updateData.generated_bio = generated_bio
      updateData.bio_generated_at = new Date().toISOString()
    }

    // Update the athlete
    const { data, error } = await supabase.from("athletes").update(updateData).eq("id", id).select()

    if (error) {
      console.error("Error updating athlete:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "AI summary fields updated successfully",
      data,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 })
  }
}
