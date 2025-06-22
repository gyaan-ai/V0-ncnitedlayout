import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_SUPABASE_URL!, process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const { generated_headline, generated_bio } = await request.json()

    console.log("🎯 Setting monitoring data for Liam:", {
      headline: generated_headline,
      bio: generated_bio.substring(0, 50) + "...",
    })

    // Update Liam's record with monitoring data
    const { data, error } = await supabase
      .from("athletes")
      .update({
        generated_headline,
        generated_bio,
        updated_at: new Date().toISOString(),
      })
      .eq("id", "ce1bf191-623d-46dd-a0ca-5929e85871f1")
      .select()
      .single()

    if (error) {
      console.error("❌ Update error:", error)
      throw error
    }

    console.log("✅ Liam's data updated successfully:", {
      id: data.id,
      headline: data.generated_headline,
      bio: data.generated_bio?.substring(0, 50) + "...",
      updated_at: data.updated_at,
    })

    return NextResponse.json({
      success: true,
      message: "Monitoring data set successfully",
      updatedData: data,
      timestamp: new Date().toISOString(),
      nextExpectedReset: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
    })
  } catch (error) {
    console.error("❌ API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
