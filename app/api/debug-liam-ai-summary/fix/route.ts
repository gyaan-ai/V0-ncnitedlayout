import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_SUPABASE_URL!, process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const liamId = "ce1bf191-623d-46dd-a0ca-5929e85871f1"

    console.log("🔧 DIRECT FIX: Starting direct database update for Liam...")

    const correctData = {
      generated_headline: "Liam Hickey Caps Elite Career with D1 Open Milestone and UNC Commitment",
      generated_bio: `Graduating senior Liam Hickey, a UNC wrestling commit from Kinston High School, has established himself as one of North Carolina's premier wrestlers. Competing at 132 pounds for NC United Blue, Hickey has consistently performed at the highest levels of competition.

His wrestling resume includes standout performances at national tournaments, with notable appearances at NHSCA Nationals and other elite competitions. Hickey's technical skill and competitive drive have made him a key contributor to NC United's success in team competitions.

Academically, Hickey has maintained strong grades while balancing the demands of elite-level wrestling. His commitment to the University of North Carolina represents the culmination of years of hard work both on the mat and in the classroom.

As he prepares for his final high school season, Hickey continues to train with NC United Blue, working toward his goals of competing at the highest levels and making an immediate impact in college wrestling.`,
      updated_at: new Date().toISOString(),
    }

    console.log("🔧 DIRECT FIX: Update data prepared:", {
      id: liamId,
      headline_length: correctData.generated_headline.length,
      bio_length: correctData.generated_bio.length,
    })

    // First, let's check the current data
    const { data: beforeData, error: beforeError } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, generated_headline, generated_bio")
      .eq("id", liamId)
      .single()

    if (beforeError) {
      console.error("❌ Error fetching before data:", beforeError)
      throw beforeError
    }

    console.log("📊 BEFORE UPDATE:", {
      id: beforeData.id,
      name: `${beforeData.first_name} ${beforeData.last_name}`,
      current_headline: beforeData.generated_headline,
      current_bio: beforeData.generated_bio?.substring(0, 50) + "...",
    })

    // Perform the update
    const { data: updateData, error: updateError } = await supabase
      .from("athletes")
      .update(correctData)
      .eq("id", liamId)
      .select("id, first_name, last_name, generated_headline, generated_bio")
      .single()

    if (updateError) {
      console.error("❌ Update error:", updateError)
      throw updateError
    }

    console.log("✅ UPDATE SUCCESSFUL:", {
      id: updateData.id,
      name: `${updateData.first_name} ${updateData.last_name}`,
      new_headline: updateData.generated_headline,
      new_bio: updateData.generated_bio?.substring(0, 50) + "...",
    })

    // Verify the update worked
    const { data: afterData, error: afterError } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, generated_headline, generated_bio, updated_at")
      .eq("id", liamId)
      .single()

    if (afterError) {
      console.error("❌ Error fetching after data:", afterError)
      throw afterError
    }

    console.log("🔍 VERIFICATION:", {
      id: afterData.id,
      name: `${afterData.first_name} ${afterData.last_name}`,
      headline_fixed: afterData.generated_headline !== "Test Headline",
      bio_fixed: afterData.generated_bio !== "Test Bio",
      updated_at: afterData.updated_at,
    })

    return NextResponse.json({
      success: true,
      message: "Liam's AI summary fixed successfully!",
      before: beforeData,
      after: afterData,
      verification: {
        headline_fixed: afterData.generated_headline !== "Test Headline",
        bio_fixed: afterData.generated_bio !== "Test Bio",
        headline_correct: afterData.generated_headline === correctData.generated_headline,
        bio_correct: afterData.generated_bio === correctData.generated_bio,
      },
    })
  } catch (error) {
    console.error("❌ Direct fix error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: {
          errorType: error.constructor.name,
          errorMessage: error.message,
        },
      },
      { status: 500 },
    )
  }
}
