import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createClient()

    const { data: wrestlers, error } = await supabase
      .from("athletes")
      .select(`
        id,
        first_name,
        last_name,
        weight_class,
        graduation_year,
        high_school,
        profile_image_url,
        is_active
      `)
      .eq("is_active", true)
      .order("last_name")

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      wrestlers: wrestlers || [],
    })
  } catch (error) {
    console.error("Error fetching wrestlers:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch wrestlers",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
