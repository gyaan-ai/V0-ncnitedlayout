import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("🤖 Generating bio for Liam Hickey (using built-in templates)...")

    // Generate compelling headline based on Liam's achievements
    const generated_headline = "Elite 2x State Champion & UNC Commit Dominates with 179-6 Record"

    // Generate comprehensive bio based on his actual data
    const generated_bio = `Liam Hickey has established himself as one of North Carolina's premier wrestlers, compiling an outstanding 179-6 career record with an exceptional 128 pins and 23 technical falls. The Cardinal Gibbons standout and NC United Blue team member has captured two NCHSAA 3A State Championships, claiming titles at both 138lbs (2024) and 132lbs (2025) with perfect 4-0 tournament records.

Hickey's excellence extends far beyond the state level, earning All-American honors twice at NHSCA Nationals with a 4th place finish in 2025 and 8th place in 2024, both competing at 132lbs. His impressive tournament resume includes a 2nd place finish at Southeast Regionals and championship at the Ultimate Club Duals in 2024, showcasing his ability to perform on wrestling's biggest stages.

What truly sets Hickey apart is his ability to compete at the collegiate level while still in high school, demonstrated by his remarkable 4th place finish at the Patriot Open in the College Division I competition. This achievement against seasoned college wrestlers showcased his readiness for the next level and helped solidify his commitment to the University of North Carolina.

Academically, Hickey maintains a solid 3.6 GPA while pursuing Business Administration, proving his dedication extends well beyond the wrestling mat. His combination of athletic excellence and academic achievement made him a highly sought-after recruit among Division I programs.

Training with RAW Wrestling Club and competing for NC United Blue, Hickey has developed into a complete wrestler with exceptional finishing ability, as evidenced by his impressive 128 career pins. His technical prowess, competitive drive, and consistent performance have made him a cornerstone of North Carolina wrestling.

With his commitment to UNC secured in June 2024, Hickey represents the future of Tar Heel wrestling. His proven track record of success at every level, from state championships to national tournaments to college-level competition, positions him to make an immediate impact in the ACC and establish himself as a force in Division I wrestling.`

    console.log("✅ Bio generation complete!")
    console.log("Headline:", generated_headline)
    console.log("Bio length:", generated_bio.length, "characters")

    return NextResponse.json({
      success: true,
      generated_headline,
      generated_bio,
      message: "Bio generated successfully!",
      stats: {
        headline_length: generated_headline.length,
        bio_length: generated_bio.length,
      },
    })
  } catch (error) {
    console.error("❌ Bio generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate bio",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
