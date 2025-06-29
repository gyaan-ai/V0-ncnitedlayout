import { NextResponse } from "next/server"
import { Database } from "@/lib/database"

export async function GET() {
  try {
    const athletes = await Database.getAthletes({
      committed: true,
      limit: 50,
    })

    return NextResponse.json(athletes)
  } catch (error) {
    console.error("Error fetching committed athletes:", error)
    return NextResponse.json({ error: "Failed to fetch athletes" }, { status: 500 })
  }
}
