import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name")

    if (!name) {
      return NextResponse.json({ error: "Name parameter is required" }, { status: 400 })
    }

    console.log("🔍 Searching for athlete by name:", name)

    // Split the name into first and last name
    const nameParts = name.split(" ")
    const firstName = nameParts[0]
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""

    console.log(`Looking for first_name=${firstName}, last_name=${lastName}`)

    // Query by first and last name
    let query = supabase.from("athletes").select("*")

    if (firstName && lastName) {
      // Try exact match on first and last name
      query = query.eq("first_name", firstName).eq("last_name", lastName)
    } else {
      // If only one name provided, try to match either first or last name
      query = query.or(`first_name.eq.${name},last_name.eq.${name}`)
    }

    const { data: athletes, error } = await query.limit(1)

    if (error) {
      console.error("❌ Error fetching athlete by name:", error)
      return NextResponse.json({ error: "Failed to fetch athlete" }, { status: 500 })
    }

    if (!athletes || athletes.length === 0) {
      console.log("⚠️ No athlete found with name:", name)
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 })
    }

    console.log("✅ Found athlete:", athletes[0].id, athletes[0].first_name, athletes[0].last_name)
    return NextResponse.json(athletes[0])
  } catch (error) {
    console.error("❌ Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
