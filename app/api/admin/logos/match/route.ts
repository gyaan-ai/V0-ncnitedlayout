import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name")
    const type = searchParams.get("type")

    if (!name) {
      return NextResponse.json({ success: false, error: "Name required" }, { status: 400 })
    }

    let query = supabase.from("logo_library").select("*").eq("is_active", true).ilike("display_name", name)

    if (type) {
      query = query.eq("type", type)
    }

    const { data: logos, error } = await query.limit(1)

    if (error) throw error

    if (logos && logos.length > 0) {
      return NextResponse.json({ success: true, logo: logos[0] })
    } else {
      return NextResponse.json({ success: false, error: "Logo not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Logo match error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
