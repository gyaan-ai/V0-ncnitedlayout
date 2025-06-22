import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: athlete, error } = await supabase.from("athletes").select("*").eq("id", params.id).single()

    if (error) {
      console.error("❌ Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch athlete", details: error.message }, { status: 500 })
    }

    return NextResponse.json(athlete)
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("💾 Updating athlete:", params.id)
    const data = await request.json()

    const { data: athlete, error } = await supabase.from("athletes").update(data).eq("id", params.id).select().single()

    if (error) {
      console.error("❌ Supabase error:", error)
      return NextResponse.json({ error: "Failed to update athlete", details: error.message }, { status: 500 })
    }

    console.log("✅ Updated successfully")
    return NextResponse.json({
      success: true,
      message: "Athlete updated successfully - all fields saved!",
      athlete,
    })
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from("athletes").delete().eq("id", params.id)

    if (error) {
      console.error("❌ Supabase error:", error)
      return NextResponse.json({ error: "Failed to delete athlete", details: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Athlete deleted successfully!" })
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
