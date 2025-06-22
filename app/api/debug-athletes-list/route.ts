import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-only"

export async function GET() {
  try {
    console.log("🔍 Fetching all athletes from database...")

    const { data: athletes, error } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, full_name, is_committed")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Error fetching athletes:", error)
      return NextResponse.json({ error: "Database error", details: error }, { status: 500 })
    }

    console.log(`✅ Found ${athletes?.length || 0} athletes`)

    return NextResponse.json({
      count: athletes?.length || 0,
      athletes: athletes || [],
      committed: athletes?.filter((a) => a.is_committed) || [],
    })
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
