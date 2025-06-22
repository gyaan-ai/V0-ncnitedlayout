import { NextResponse } from "next/server"

export async function GET() {
  try {
    // For static export, return a status that works without Redis
    const hasRedisEnv = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

    return NextResponse.json({
      success: true,
      database_type: "Redis (Upstash)",
      connection: hasRedisEnv ? "✅ Environment configured" : "⚠️ Using preview data",
      data_status: "✅ Preview data available",
      tournaments: {
        count: 2,
        list: [
          { id: "preview-nhsca", name: "NHSCA 2025" },
          { id: "preview-ucd", name: "Ultimate Club Duals 2024" },
        ],
      },
      wrestlers: {
        count: 3,
        sample: [
          { id: "preview-1", name: "Luke Richards", weight: 106 },
          { id: "preview-2", name: "Jekai Sedgwick", weight: 113 },
          { id: "preview-3", name: "Mac Johnson", weight: 120 },
        ],
      },
      environment_variables: {
        KV_REST_API_URL: process.env.KV_REST_API_URL ? "✅ Set" : "❌ Missing",
        KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? "✅ Set" : "❌ Missing",
        REDIS_URL: process.env.REDIS_URL ? "✅ Set" : "❌ Missing",
      },
      next_steps: hasRedisEnv
        ? [
            "✅ Environment configured for Redis",
            "Visit /tournaments/nhsca-2025 to see results",
            "Visit /tournaments to see all tournaments",
          ]
        : [
            "Using preview data for demonstration",
            "Add Redis environment variables for full functionality",
            "Visit /tournaments/nhsca-2025 to see preview results",
          ],
    })
  } catch (error) {
    console.error("Database status check failed:", error)
    return NextResponse.json(
      {
        success: false,
        database_type: "Redis (Upstash)",
        connection: "❌ Failed",
        error: error instanceof Error ? error.message : String(error),
        environment_variables: {
          KV_REST_API_URL: process.env.KV_REST_API_URL ? "✅ Set" : "❌ Missing",
          KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? "✅ Set" : "❌ Missing",
          REDIS_URL: process.env.REDIS_URL ? "✅ Set" : "❌ Missing",
        },
      },
      { status: 500 },
    )
  }
}
