import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    console.log("🔍 Checking database columns...")

    // Check what columns actually exist in the athletes table
    const { data, error } = await supabase.rpc("check_table_columns", { table_name: "athletes" })

    if (error) {
      // Fallback: try to get table info another way
      const { data: tableInfo, error: infoError } = await supabase
        .from("information_schema.columns")
        .select("column_name, data_type")
        .eq("table_name", "athletes")

      return NextResponse.json({
        success: !infoError,
        message: "Checked via information_schema",
        columns: tableInfo,
        error: infoError?.message,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Column check successful",
      columns: data,
    })
  } catch (error) {
    console.error("❌ Server error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
