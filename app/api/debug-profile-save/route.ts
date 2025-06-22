import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("🔍 Debug Profile Save - Received data:", JSON.stringify(body, null, 2))

    // Test 1: Check if we can connect to database
    const { data: connectionTest, error: connectionError } = await supabase.from("athletes").select("count").limit(1)

    if (connectionError) {
      console.error("❌ Database connection failed:", connectionError)
      return NextResponse.json({
        success: false,
        error: "Database connection failed",
        details: connectionError.message,
      })
    }

    console.log("✅ Database connection successful")

    // Test 2: Validate UUID format
    if (!body.id || typeof body.id !== "string") {
      return NextResponse.json({
        success: false,
        error: "Invalid athlete ID",
        details: "Athlete ID is required and must be a string",
      })
    }

    // Check if it looks like a UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(body.id)) {
      return NextResponse.json({
        success: false,
        error: "Invalid UUID format",
        details: `Expected UUID format like '550e8400-e29b-41d4-a716-446655440000', got '${body.id}'`,
      })
    }

    console.log("✅ UUID format is valid")

    // Test 2: Check if athlete exists
    const { data: existingAthlete, error: findError } = await supabase
      .from("athletes")
      .select("*")
      .eq("id", body.id)
      .single()

    if (findError && findError.code !== "PGRST116") {
      console.error("❌ Error finding athlete:", findError)
      return NextResponse.json({
        success: false,
        error: "Error finding athlete",
        details: findError.message,
      })
    }

    console.log("🔍 Existing athlete:", existingAthlete ? "Found" : "Not found")

    // Test 3: Try a simple update with minimal data
    const minimalUpdate = {
      first_name: body.first_name || "Test",
      last_name: body.last_name || "User",
      email: body.email || "test@example.com",
      updated_at: new Date().toISOString(),
    }

    console.log("🔄 Attempting minimal update:", minimalUpdate)

    const { data: updateResult, error: updateError } = await supabase
      .from("athletes")
      .update(minimalUpdate)
      .eq("id", body.id)
      .select()
      .single()

    if (updateError) {
      console.error("❌ Update failed:", updateError)
      return NextResponse.json({
        success: false,
        error: "Update failed",
        details: updateError.message,
        hint: updateError.hint,
        code: updateError.code,
      })
    }

    console.log("✅ Update successful:", updateResult)

    return NextResponse.json({
      success: true,
      message: "Profile save debug completed",
      results: {
        database_connected: true,
        athlete_found: !!existingAthlete,
        update_successful: !!updateResult,
        updated_data: updateResult,
      },
    })
  } catch (error) {
    console.error("❌ Debug error:", error)
    return NextResponse.json({
      success: false,
      error: "Debug failed",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
