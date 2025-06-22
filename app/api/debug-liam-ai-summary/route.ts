import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_SUPABASE_URL!, process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 DEBUG: Searching for all Liam Hickey records...")

    // Add cache-busting headers
    const headers = {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    }

    // Search for all possible Liam records with fresh data
    const { data: records, error } = await supabase
      .from("athletes")
      .select("*")
      .or("first_name.ilike.%liam%,last_name.ilike.%hickey%,email.ilike.%liam%")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Database error:", error)
      throw error
    }

    console.log("📊 Found Liam records:", {
      count: records?.length || 0,
      records: records?.map((r) => ({
        id: r.id,
        name: `${r.first_name} ${r.last_name}`,
        email: r.email,
        generated_headline: r.generated_headline,
        generated_bio: r.generated_bio?.substring(0, 50) + "...",
      })),
    })

    // Also check for the specific ID we know about
    const { data: specificRecord, error: specificError } = await supabase
      .from("athletes")
      .select("*")
      .eq("id", "ce1bf191-623d-46dd-a0ca-5929e85871f1")
      .single()

    if (!specificError && specificRecord) {
      console.log("🎯 Specific Liam record (ce1bf191...):", {
        id: specificRecord.id,
        name: `${specificRecord.first_name} ${specificRecord.last_name}`,
        generated_headline: specificRecord.generated_headline,
        generated_bio: specificRecord.generated_bio?.substring(0, 100) + "...",
        updated_at: specificRecord.updated_at,
      })
    }

    return NextResponse.json(
      {
        success: true,
        records: records || [],
        specificRecord: specificRecord || null,
        debug: {
          searchQuery: "first_name.ilike.%liam% OR last_name.ilike.%hickey% OR email.ilike.%liam%",
          foundCount: records?.length || 0,
          specificRecordFound: !!specificRecord,
          timestamp: new Date().toISOString(),
        },
      },
      { headers },
    )
  } catch (error) {
    console.error("❌ Debug API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        records: [],
        debug: {
          errorType: error.constructor.name,
          errorMessage: error.message,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }
}
