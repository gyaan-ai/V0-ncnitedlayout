import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("🔍 Debug: Received data:", JSON.stringify(body, null, 2))

    // Check if athlete exists
    const { data: existingAthlete, error: fetchError } = await supabase
      .from("athletes")
      .select("*")
      .eq("id", body.id)
      .single()

    if (fetchError) {
      console.log("❌ Fetch error:", fetchError)
      return NextResponse.json({ error: "Athlete not found", details: fetchError })
    }

    console.log("✅ Existing athlete:", existingAthlete)

    // Check table structure
    const { data: tableInfo, error: tableError } = await supabase.rpc("get_table_columns", {
      table_name: "athletes",
    })

    if (tableError) {
      console.log("⚠️ Could not get table info:", tableError)
    } else {
      console.log("📋 Table columns:", tableInfo)
    }

    // Try a simple update first
    const { data: updateResult, error: updateError } = await supabase
      .from("athletes")
      .update({ first_name: body.first_name || existingAthlete.first_name })
      .eq("id", body.id)
      .select()

    if (updateError) {
      console.log("❌ Simple update error:", updateError)
      return NextResponse.json({
        error: "Update failed",
        details: updateError,
        existingData: existingAthlete,
        attemptedData: body,
      })
    }

    console.log("✅ Simple update successful:", updateResult)

    return NextResponse.json({
      success: true,
      message: "Debug successful",
      existingData: existingAthlete,
      updateResult: updateResult,
    })
  } catch (error) {
    console.error("❌ Debug error:", error)
    return NextResponse.json({
      error: "Debug failed",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
