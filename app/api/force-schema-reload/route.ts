import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("🔄 Forcing PostgREST schema reload...")

    // Method 1: Try to force reload via Supabase REST API
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    // Send a NOTIFY command to reload schema
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/notify_pgrst`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
      body: JSON.stringify({}),
    })

    if (!response.ok) {
      console.log("❌ NOTIFY failed, trying alternative...")

      // Method 2: Try direct SQL execution
      const sqlResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
        body: JSON.stringify({
          query: "NOTIFY pgrst, 'reload schema'",
        }),
      })

      if (!sqlResponse.ok) {
        console.log("❌ Both methods failed")
        return NextResponse.json({
          success: false,
          message: "Could not force schema reload",
          suggestion: "Try restarting your Supabase project in the dashboard",
        })
      }
    }

    // Wait a moment for the reload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Test if columns are now accessible
    const testResponse = await fetch(
      `${supabaseUrl}/rest/v1/athletes?select=id,generated_headline,generated_bio&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
      },
    )

    const testResult = await testResponse.text()

    return NextResponse.json({
      success: testResponse.ok,
      message: testResponse.ok
        ? "Schema reload successful!"
        : "Schema reload may have worked, but columns still not accessible",
      testResult: testResult.substring(0, 500),
      statusCode: testResponse.status,
    })
  } catch (error) {
    console.error("❌ Error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
