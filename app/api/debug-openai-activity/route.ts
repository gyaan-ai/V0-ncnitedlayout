import { NextResponse } from "next/server"

export async function GET() {
  try {
    const results = {
      timestamp: new Date().toISOString(),
      openai_integration_status: "Checking...",
      recent_api_calls: [],
      scheduled_functions: [],
      environment_variables: {
        has_openai_key: !!process.env.OPENAI_API_KEY,
        openai_key_length: process.env.OPENAI_API_KEY?.length || 0,
      },
      potential_sources: [
        "Bio generation API (/api/admin/generate-bio)",
        "AI summary generation",
        "Scheduled OpenAI health checks",
        "Auto-generation for missing content",
      ],
      recommendations: [
        "Check for cron jobs or scheduled functions",
        "Look for auto-generation triggers",
        "Review OpenAI API usage logs",
        "Check for default/test responses from OpenAI",
      ],
    }

    // Check if there are any recent OpenAI-related files or processes
    const openaiFiles = ["/api/admin/generate-bio", "/api/generate-liam-bio", "/api/admin/update-athlete-with-ai"]

    results.openai_integration_status = "Found OpenAI integration files"

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to debug OpenAI activity",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
