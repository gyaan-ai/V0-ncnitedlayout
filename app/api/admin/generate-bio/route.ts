import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { athlete } = await request.json()

    if (!athlete.first_name || !athlete.last_name) {
      return NextResponse.json({ error: "Athlete name is required" }, { status: 400 })
    }

    console.log("🤖 Generating bio for:", athlete.first_name, athlete.last_name)

    // Generate headline
    const headlinePrompt = `Create a compelling 8-12 word headline for this wrestler's profile:

Name: ${athlete.first_name} ${athlete.last_name}
Weight Class: ${athlete.weight_class}lbs
Graduation Year: ${athlete.graduation_year}
High School: ${athlete.high_school}
${athlete.college_committed ? `Committed to: ${athlete.college_committed}` : ""}
${athlete.nc_united_team ? `NC United Team: ${athlete.nc_united_team}` : ""}

Key achievements: ${JSON.stringify(athlete.achievements || {})}
Wrestling record: ${JSON.stringify(athlete.wrestling_record || {})}

Create a headline that captures their wrestling excellence and commitment. Examples:
- "Elite State Champion Commits to Division I Wrestling"
- "Three-Time State Champion Joins UNC Wrestling"
- "NHSCA National Champion Commits to Tar Heels"

Headline:`

    const { text: headline } = await generateText({
      model: openai("gpt-4o"),
      prompt: headlinePrompt,
      maxTokens: 50,
    })

    // Generate bio
    const bioPrompt = `Write a compelling 150-200 word bio for this elite high school wrestler:

Name: ${athlete.first_name} ${athlete.last_name}
Weight Class: ${athlete.weight_class}lbs
Graduation Year: ${athlete.graduation_year}
High School: ${athlete.high_school}
Wrestling Club: ${athlete.wrestling_club || ""}
Hometown: ${athlete.hometown || ""}
${athlete.college_committed ? `Committed to: ${athlete.college_committed} (${athlete.college_division || ""})` : ""}
${athlete.nc_united_team ? `NC United Team: ${athlete.nc_united_team}` : ""}
GPA: ${athlete.gpa || ""}

Achievements: ${JSON.stringify(athlete.achievements || {})}
Wrestling Record: ${JSON.stringify(athlete.wrestling_record || {})}

Write in third person, highlighting their wrestling accomplishments, academic excellence, and character. Make it engaging and professional for college coaches and fans. Focus on specific achievements and what makes them special.

Bio:`

    const { text: bio } = await generateText({
      model: openai("gpt-4o"),
      prompt: bioPrompt,
      maxTokens: 300,
    })

    console.log("✅ Generated content:", { headline: headline.trim(), bio: bio.trim() })

    return NextResponse.json({
      success: true,
      generated_headline: headline.trim(),
      generated_bio: bio.trim(),
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
