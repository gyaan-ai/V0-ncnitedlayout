import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_SUPABASE_URL!, process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    console.log("🔍 Searching for sources of 'Test Headline' and 'Test Bio'...")

    // Search database for records with test data
    const { data: testHeadlineRecords, error: headlineError } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, email, generated_headline, updated_at")
      .eq("generated_headline", "Test Headline")

    const { data: testBioRecords, error: bioError } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, email, generated_bio, updated_at")
      .eq("generated_bio", "Test Bio")

    if (headlineError) console.error("Headline search error:", headlineError)
    if (bioError) console.error("Bio search error:", bioError)

    // Check for any recent updates to Liam's record
    const { data: liamHistory, error: historyError } = await supabase
      .from("athletes")
      .select("*")
      .eq("id", "ce1bf191-623d-46dd-a0ca-5929e85871f1")
      .single()

    if (historyError) console.error("Liam history error:", historyError)

    // Look for patterns in update timestamps
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)

    console.log("🕐 Time analysis:", {
      now: now.toISOString(),
      oneHourAgo: oneHourAgo.toISOString(),
      twoHoursAgo: twoHoursAgo.toISOString(),
      liamLastUpdated: liamHistory?.updated_at,
    })

    return NextResponse.json({
      success: true,
      databaseSearch: {
        testHeadlineRecords: testHeadlineRecords || [],
        testBioRecords: testBioRecords || [],
        liamCurrentData: liamHistory,
      },
      codeSearch: {
        // These would be populated by searching the codebase
        testHeadline: [
          "Found in: Check API routes, migration scripts, and seed data",
          "Look for: Default values, test data, or hardcoded strings",
        ],
        testBio: [
          "Found in: Check API routes, migration scripts, and seed data",
          "Look for: Default values, test data, or hardcoded strings",
        ],
      },
      analysis: {
        totalTestHeadlineRecords: testHeadlineRecords?.length || 0,
        totalTestBioRecords: testBioRecords?.length || 0,
        liamHasTestData: liamHistory?.generated_headline === "Test Headline",
        lastUpdateTime: liamHistory?.updated_at,
        suspectedRecurringIssue: true,
      },
      recommendations: [
        "Check for scheduled jobs or cron tasks",
        "Look for API endpoints being called externally",
        "Search codebase for hardcoded 'Test Headline' and 'Test Bio'",
        "Check migration scripts for repeated execution",
        "Monitor database changes over time",
        "Look for seed data or default values being applied",
      ],
    })
  } catch (error) {
    console.error("❌ Debug search error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        analysis: {
          errorOccurred: true,
          errorMessage: error.message,
        },
      },
      { status: 500 },
    )
  }
}
