import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Create Supabase client with service role key for admin operations
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // First, let's try to select from the athletes table to see what columns exist
    const { data: testData, error: testError } = await supabase.from("athletes").select("*").limit(1)

    if (testError) {
      return NextResponse.json({ error: `Cannot access athletes table: ${testError.message}` }, { status: 500 })
    }

    const existingColumns = testData && testData.length > 0 ? Object.keys(testData[0]) : []
    console.log("Existing columns in athletes table:", existingColumns)

    // Check which AI columns are missing
    const requiredColumns = ["generated_headline", "generated_bio", "bio_generated_at", "headline_generated_at"]
    const missingColumns = requiredColumns.filter((col) => !existingColumns.includes(col))

    console.log("Missing columns:", missingColumns)

    // If no columns are missing, return success
    if (missingColumns.length === 0) {
      return NextResponse.json({
        message: "All AI summary columns already exist",
        existingColumns,
        missingColumns: [],
        success: true,
      })
    }

    // Try to add missing columns by attempting an update with those fields
    // This will help us identify if the columns exist or not
    const testUpdate = {
      ...(missingColumns.includes("generated_headline") && { generated_headline: "test" }),
      ...(missingColumns.includes("generated_bio") && { generated_bio: "test" }),
      ...(missingColumns.includes("bio_generated_at") && { bio_generated_at: new Date().toISOString() }),
      ...(missingColumns.includes("headline_generated_at") && { headline_generated_at: new Date().toISOString() }),
    }

    // Try to update a record to see if columns exist
    const { error: updateError } = await supabase
      .from("athletes")
      .update(testUpdate)
      .eq("id", "00000000-0000-0000-0000-000000000000") // Non-existent ID, just to test column existence

    return NextResponse.json({
      message: "Column check completed",
      existingColumns,
      missingColumns,
      testUpdateError: updateError?.message,
      canUpdateAIFields: !updateError || !updateError.message.includes("column"),
      recommendation: updateError?.message.includes("column")
        ? "Columns need to be added via Supabase dashboard or SQL editor"
        : "Columns appear to exist and can be updated",
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 })
  }
}
