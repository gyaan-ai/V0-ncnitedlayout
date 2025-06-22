import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    const { data: athletes, error } = await supabase
      .from("athletes")
      .select(`
        id, first_name, last_name, profile_image_url,
        commitment_image_url, college_committed, college_division,
        high_school, wrestling_club, nc_united_team, graduation_year,
        weight_class, instagram_handle, commitment_date,
        is_committed, is_featured, generated_headline, generated_bio
      `)
      .eq("is_committed", true)
      .eq("is_active", true)
      .order("commitment_date", { ascending: false })

    if (error) throw error

    return NextResponse.json(athletes || [])
  } catch (error) {
    console.error("Error fetching athletes:", error)
    return NextResponse.json({ error: "Failed to fetch athletes" }, { status: 500 })
  }
}
