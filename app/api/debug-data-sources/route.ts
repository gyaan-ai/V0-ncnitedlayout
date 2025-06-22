import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Method 1: Direct Supabase with service role
    const supabaseService = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { data: supabaseDirect, error: error1 } = await supabaseService
      .from("athletes")
      .select("generated_headline, generated_bio, updated_at")
      .eq("first_name", "Liam")
      .eq("last_name", "Hickey")
      .single()

    // Method 2: Client query
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { data: clientQuery, error: error2 } = await supabaseClient
      .from("athletes")
      .select("generated_headline, generated_bio, updated_at")
      .eq("first_name", "Liam")
      .eq("last_name", "Hickey")
      .single()

    // Method 3: Raw SQL (if available)
    let rawSql = null
    try {
      const { data: rawSqlData } = await supabaseService.rpc("get_liam_data")
      rawSql = rawSqlData
    } catch (e) {
      // Raw SQL function might not exist
    }

    // Compare results
    const discrepancies = []

    if (supabaseDirect?.generated_headline !== clientQuery?.generated_headline) {
      discrepancies.push({
        field: "generated_headline",
        supabase_direct: supabaseDirect?.generated_headline,
        client_query: clientQuery?.generated_headline,
      })
    }

    if (supabaseDirect?.generated_bio !== clientQuery?.generated_bio) {
      discrepancies.push({
        field: "generated_bio",
        supabase_direct: supabaseDirect?.generated_bio?.substring(0, 50),
        client_query: clientQuery?.generated_bio?.substring(0, 50),
      })
    }

    return NextResponse.json({
      supabase_direct: supabaseDirect,
      client_query: clientQuery,
      raw_sql: rawSql,
      discrepancies,
      errors: {
        error1: error1?.message,
        error2: error2?.message,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check data sources", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
