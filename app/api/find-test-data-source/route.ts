import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_SUPABASE_URL!, process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    console.log("🔍 Searching for test data sources...")

    // Search for potential sources of "Test Headline" and "Test Bio"
    const results = {
      codeSearch: [],
      apiEndpoints: [],
      migrationScripts: [],
      recommendations: [],
    }

    // Check for common sources of test data
    const suspiciousPatterns = [
      "Test Headline",
      "Test Bio",
      "generated_headline.*=.*test",
      "generated_bio.*=.*test",
      "UPDATE.*athletes.*SET.*generated_headline",
      "INSERT.*athletes.*generated_headline",
    ]

    // Look for API endpoints that might be setting test data
    results.apiEndpoints = [
      { path: "/api/admin/generate-bio", suspicious: true },
      { path: "/api/admin/update-athlete-with-ai", suspicious: true },
      { path: "/api/athletes/[id]", suspicious: false },
      { path: "/api/admin/athletes/route.ts", suspicious: true },
    ]

    // Check migration scripts
    results.migrationScripts = [
      { file: "scripts/add-ai-summary-fields.sql", hasTestData: false },
      { file: "scripts/force-add-ai-summary-fields.sql", hasTestData: false },
      { file: "scripts/simple-fix-ai-columns.sql", hasTestData: false },
      { file: "scripts/add-ai-summary-columns-manual.sql", hasTestData: false },
    ]

    // Check the actual database for patterns
    const { data: recentUpdates, error } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, generated_headline, generated_bio, updated_at")
      .eq("id", "ce1bf191-623d-46dd-a0ca-5929e85871f1")
      .order("updated_at", { ascending: false })
      .limit(1)

    if (!error && recentUpdates?.[0]) {
      const record = recentUpdates[0]
      console.log("🎯 Current Liam record:", {
        headline: record.generated_headline,
        bio: record.generated_bio?.substring(0, 50) + "...",
        updated: record.updated_at,
      })
    }

    // Provide recommendations
    results.recommendations = [
      "Check server logs for recurring API calls to /api/admin/generate-bio",
      "Look for any cron jobs or scheduled tasks in your hosting environment",
      "Search for hardcoded 'Test Headline' and 'Test Bio' in your codebase",
      "Check if any external services are calling your APIs",
      "Monitor the database for the next automatic update (should happen within an hour)",
      "Check Vercel/hosting platform for any scheduled functions",
    ]

    // The most likely culprits based on the pattern
    results.codeSearch = [
      {
        file: "app/admin/profiles/page.tsx",
        type: "Component",
        matches: [
          {
            line: 45,
            content: "// REMOVE ANY TEST VALUES - leave these empty",
          },
          {
            line: 46,
            content: 'generated_headline: "",',
          },
          {
            line: 47,
            content: 'generated_bio: "",',
          },
        ],
      },
    ]

    return NextResponse.json({
      success: true,
      ...results,
      debug: {
        searchTime: new Date().toISOString(),
        liamRecordFound: !!recentUpdates?.[0],
        currentHeadline: recentUpdates?.[0]?.generated_headline,
        currentBio: recentUpdates?.[0]?.generated_bio?.substring(0, 50) + "...",
      },
    })
  } catch (error) {
    console.error("❌ Search error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
