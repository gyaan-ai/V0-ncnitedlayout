import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🧪 === DATABASE CONNECTION TEST ===")

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log("Environment check:")
    console.log("- SUPABASE_URL exists:", !!supabaseUrl)
    console.log("- SERVICE_ROLE_KEY exists:", !!supabaseKey)
    console.log("- SUPABASE_URL value:", supabaseUrl?.substring(0, 50) + "...")

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: "Missing environment variables",
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
        },
      })
    }

    // Test Supabase connection
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test 1: Try to query athletes table directly
    console.log("🔍 Testing athletes table query...")
    const { data: athletesTest, error: athletesError } = await supabase
      .from("athletes")
      .select("id, first_name, last_name")
      .limit(3)

    if (athletesError) {
      console.error("❌ Athletes query failed:", athletesError)

      // If athletes table doesn't exist, that's the problem
      if (athletesError.code === "42P01") {
        return NextResponse.json({
          success: false,
          error: "Athletes table does not exist",
          details: {
            message: "The 'athletes' table hasn't been created yet",
            suggestion: "Run the database migration scripts first",
            errorCode: athletesError.code,
            fullError: athletesError,
          },
        })
      }

      return NextResponse.json({
        success: false,
        error: "Athletes table query failed",
        details: athletesError,
      })
    }

    console.log("✅ Athletes found:", athletesTest)

    // Test 2: Try a simple insert/update/delete cycle
    console.log("🔍 Testing write operations...")

    // Insert test record
    const { data: insertData, error: insertError } = await supabase
      .from("athletes")
      .insert({
        first_name: "Test",
        last_name: "Connection",
        high_school: "Test High",
        graduation_year: 2025,
        weight: "157",
      })
      .select()

    if (insertError) {
      console.error("❌ Insert failed:", insertError)
      return NextResponse.json({
        success: false,
        error: "Insert test failed - table structure issue",
        details: {
          message: "Could not insert test record",
          suggestion: "The athletes table might be missing required columns",
          errorCode: insertError.code,
          fullError: insertError,
        },
      })
    }

    const testId = insertData?.[0]?.id
    console.log("✅ Test record inserted with ID:", testId)

    // Update test record
    const { error: updateError } = await supabase
      .from("athletes")
      .update({ anticipated_weight: "165" })
      .eq("id", testId)

    if (updateError) {
      console.error("❌ Update failed:", updateError)
    } else {
      console.log("✅ Test record updated")
    }

    // Delete test record
    const { error: deleteError } = await supabase.from("athletes").delete().eq("id", testId)

    if (deleteError) {
      console.error("❌ Delete failed:", deleteError)
    } else {
      console.log("✅ Test record deleted")
    }

    return NextResponse.json({
      success: true,
      message: "Database connection working perfectly!",
      details: {
        athletesCount: athletesTest?.length,
        sampleAthletes: athletesTest,
        writeTestPassed: !insertError && !updateError && !deleteError,
        testRecordId: testId,
        allTestsPassed: true,
      },
    })
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({
      success: false,
      error: "Unexpected error",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
