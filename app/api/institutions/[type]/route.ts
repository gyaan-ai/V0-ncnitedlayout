import { type NextRequest, NextResponse } from "next/server"
import {
  getAllColleges,
  getAllHighSchools,
  getAllWrestlingClubs,
  searchColleges,
  searchHighSchools,
  searchWrestlingClubs,
} from "@/lib/institutions"

// Add this function to pre-define the possible route parameters
export function generateStaticParams() {
  return [{ type: "college" }, { type: "high_school" }, { type: "wrestling_club" }]
}

export async function GET(request: NextRequest, { params }: { params: { type: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const state = searchParams.get("state")
    const division = searchParams.get("division")

    switch (params.type) {
      case "college":
        if (query) {
          const results = await searchColleges(query)
          return NextResponse.json(results)
        }
        const colleges = await getAllColleges()
        return NextResponse.json(colleges)

      case "high_school":
        if (query) {
          const results = await searchHighSchools(query, state || undefined)
          return NextResponse.json(results)
        }
        const highSchools = await getAllHighSchools()
        return NextResponse.json(highSchools)

      case "wrestling_club":
        if (query) {
          const results = await searchWrestlingClubs(query)
          return NextResponse.json(results)
        }
        const clubs = await getAllWrestlingClubs()
        return NextResponse.json(clubs)

      default:
        return NextResponse.json({ error: "Invalid institution type" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error fetching institutions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { type: string } }) {
  try {
    const body = await request.json()

    // Here you would implement creation logic for new institutions
    // This would typically require admin authentication

    return NextResponse.json({ message: "Institution creation not implemented yet" }, { status: 501 })
  } catch (error) {
    console.error("Error creating institution:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
