import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Search for potential sources of "Test" values
    const suspiciousPatterns = [
      "Test Headline",
      "Test Bio",
      "generated_headline.*test",
      "generated_bio.*test",
      "Test.*headline",
      "Test.*bio",
      "default.*headline",
      "default.*bio",
    ]

    const potentialSources = [
      {
        file: "/api/admin/generate-bio/route.ts",
        suspicious: "Contains OpenAI bio generation - could have fallback values",
      },
      {
        file: "/api/admin/update-athlete-with-ai/route.ts",
        suspicious: "Updates AI fields - could insert test data",
      },
      {
        file: "/app/admin/profiles/page.tsx",
        suspicious: "Profile management - could have default form values",
      },
      {
        file: "Bio generation functions",
        suspicious: "OpenAI might return test responses on errors",
      },
    ]

    const recommendations = [
      "Check OpenAI API error handling - does it return 'Test' values on failure?",
      "Look for form initialization with test data",
      "Check if any middleware is modifying data",
      "Review database triggers or functions",
      "Check for auto-save functionality with default values",
    ]

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      patterns_searched: suspiciousPatterns,
      potential_sources: potentialSources,
      recommendations,
      next_steps: [
        "Use the Data Trap to catch real-time changes",
        "Check OpenAI API logs for actual responses",
        "Review form submission code paths",
        "Look for any scheduled/background processes",
      ],
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search code", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
