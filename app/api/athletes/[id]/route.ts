import { NextResponse } from "next/server"
import { Database } from "@/lib/database"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const athlete = await Database.getAthleteById(params.id)

    if (!athlete) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 })
    }

    return NextResponse.json(athlete)
  } catch (error) {
    console.error("Error fetching athlete:", error)
    return NextResponse.json({ error: "Failed to fetch athlete" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    const athlete = await Database.updateAthlete(params.id, updates)

    return NextResponse.json(athlete)
  } catch (error) {
    console.error("Error updating athlete:", error)
    return NextResponse.json({ error: "Failed to update athlete" }, { status: 500 })
  }
}
