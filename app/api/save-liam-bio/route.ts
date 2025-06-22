import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const { headline, bio } = await request.json()

    console.log("💾 Saving Liam's bio to database...")
    console.log("Headline:", headline?.substring(0, 50) + "...")
    console.log("Bio length:", bio?.length, "characters")

    if (!headline || !bio) {
      return NextResponse.json({ error: "Headline and bio are required" }, { status: 400 })
    }

    // Update Liam Hickey's record
    const { data: updatedAthlete, error: updateError } = await supabase
      .from("athletes")
      .update({
        generated_headline: headline.trim(),
        generated_bio: bio.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", "ce1bf191-623d-46dd-a0ca-5929e85871f1") // Liam's ID
      .select()
      .single()

    if (updateError) {
      console.error("❌ Failed to update athlete:", updateError)
      return NextResponse.json({ error: "Failed to save bio to database" }, { status: 500 })
    }

    console.log("✅ Successfully saved Liam's bio!")

    return NextResponse.json({
      success: true,
      athlete_id: updatedAthlete.id,
      updated_headline: updatedAthlete.generated_headline,
      updated_bio: updatedAthlete.generated_bio,
      message: "Bio saved successfully to database!",
    })
  } catch (error) {
    console.error("❌ Save error:", error)
    return NextResponse.json(
      {
        error: "Failed to save bio",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
