import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    console.log("🔍 Checking athletes table schema...")

    // Get table schema
    const { data: columns, error: schemaError } = await supabase.rpc("get_table_columns", {
      table_name: "athletes",
    })

    if (schemaError) {
      console.log("Schema RPC failed, trying direct query...")

      // Fallback: try to get a sample record to see what columns exist
      const { data: sampleData, error: sampleError } = await supabase.from("athletes").select("*").limit(1)

      if (sampleError) {
        console.error("❌ Sample query error:", sampleError)
        return NextResponse.json(
          {
            error: sampleError.message,
            suggestion: "The athletes table might not exist. Please run the SQL script to create it.",
          },
          { status: 500 },
        )
      }

      const availableColumns = sampleData && sampleData.length > 0 ? Object.keys(sampleData[0]) : []

      return NextResponse.json({
        success: true,
        message: "Schema check completed (via sample data)",
        availableColumns,
        sampleRecord: sampleData?.[0] || null,
        totalRecords: sampleData?.length || 0,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Schema check completed",
      columns,
    })
  } catch (error) {
    console.error("❌ Schema check error:", error)
    return NextResponse.json(
      {
        error: "Failed to check schema",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
