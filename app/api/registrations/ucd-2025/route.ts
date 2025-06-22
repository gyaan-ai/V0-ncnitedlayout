import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

// Initialize Redis connection
let redis: Redis

try {
  redis = Redis.fromEnv()
} catch (error) {
  console.warn("Redis connection not available:", error)
  redis = {} as Redis
}

// Helper function to check if we're in preview mode
function isPreviewMode(): boolean {
  try {
    return typeof redis.smembers !== "function"
  } catch (error) {
    return true
  }
}

// Helper function to generate IDs
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form data
    const interest = {
      id: generateId(),
      name: formData.get("name") as string,
      email: formData.get("parentEmail") as string, // Use parent email as primary
      phone: formData.get("parentPhone") as string,
      highSchool: formData.get("highSchool") as string,
      grade: formData.get("grade") as string,
      age: formData.get("age") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      team: formData.get("team") as string,
      weightClass: formData.get("weightClass") as string,
      parentName: formData.get("parentName") as string,
      parentEmail: formData.get("parentEmail") as string,
      parentPhone: formData.get("parentPhone") as string,
      previousExperience: formData.get("previousCompetition") as string,
      club: (formData.get("club") as string) || "None",
      additionalInfo: (formData.get("additionalInfo") as string) || "",
      submittedAt: new Date().toISOString(),
      status: "pending",
      wrestlerEmail: formData.get("name")
        ? `${(formData.get("name") as string).toLowerCase().replace(/\s+/g, ".")}@student.email`
        : "",
      wrestlerPhone: formData.get("parentPhone") as string, // Assuming same as parent for now
    }

    if (isPreviewMode()) {
      console.log("Preview mode - interest would be saved:", interest)
      return NextResponse.json({
        success: true,
        message: "Interest submitted successfully (preview mode)",
        id: interest.id,
      })
    }

    // Save to Redis
    await redis.hset(`ucd2025:interest:${interest.id}`, interest)
    await redis.sadd("ucd2025:interests:all", interest.id)

    // Track by team
    await redis.sadd(`ucd2025:interests:${interest.team.toLowerCase()}`, interest.id)

    // Track returning vs new wrestlers
    const isReturning =
      interest.previousExperience &&
      (interest.previousExperience.includes("UCD 2024") || interest.previousExperience.includes("2025 NHSCA Duals"))

    if (isReturning) {
      await redis.sadd("ucd2025:interests:returning", interest.id)
    } else {
      await redis.sadd("ucd2025:interests:new", interest.id)
    }

    console.log("Interest saved successfully:", interest.id)

    return NextResponse.json({
      success: true,
      message: "Interest form submitted successfully!",
      id: interest.id,
    })
  } catch (error) {
    console.error("Error saving interest:", error)
    return NextResponse.json({ success: false, message: "Failed to save interest" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const team = searchParams.get("team")
    const status = searchParams.get("status")
    const returning = searchParams.get("returning")

    if (isPreviewMode()) {
      // Return mock data for preview
      const mockInterests = [
        {
          id: "preview-1",
          name: "Jake Thompson",
          email: "mike.thompson@email.com",
          phone: "(555) 123-4567",
          highSchool: "East Mecklenburg High School",
          grade: "11th",
          age: "17",
          team: "Blue",
          weightClass: "155 LBS",
          parentName: "Mike Thompson",
          parentEmail: "mike.thompson@email.com",
          parentPhone: "(555) 123-4567",
          previousExperience: "2025 NHSCA Duals",
          club: "Carolina Wrestling Club",
          submittedAt: "2025-01-15T10:30:00Z",
          status: "pending",
          additionalInfo: "Strong wrestler with state tournament experience",
        },
        {
          id: "preview-2",
          name: "Sarah Martinez",
          email: "carlos.martinez@email.com",
          phone: "(555) 234-5678",
          highSchool: "Charlotte Catholic High School",
          grade: "10th",
          age: "16",
          team: "Gold",
          weightClass: "128",
          parentName: "Carlos Martinez",
          parentEmail: "carlos.martinez@email.com",
          parentPhone: "(555) 234-5678",
          previousExperience: "No Previous Experience",
          club: "Queen City Wrestling",
          submittedAt: "2025-01-14T14:20:00Z",
          status: "approved",
          additionalInfo: "Excellent technique, great potential",
        },
        {
          id: "preview-3",
          name: "Connor Williams",
          email: "jennifer.williams@email.com",
          phone: "(555) 345-6789",
          highSchool: "Ardrey Kell High School",
          grade: "12th",
          age: "18",
          team: "Blue",
          weightClass: "175 LBS",
          parentName: "Jennifer Williams",
          parentEmail: "jennifer.williams@email.com",
          parentPhone: "(555) 345-6789",
          previousExperience: "UCD 2024, 2025 NHSCA Duals",
          club: "Metrolina Wrestling",
          submittedAt: "2025-01-13T09:15:00Z",
          status: "rejected",
          additionalInfo: "Weight class already filled",
        },
      ]

      return NextResponse.json({
        success: true,
        registrations: mockInterests,
        stats: {
          total: 3,
          pending: 1,
          approved: 1,
          rejected: 1,
          blueTeam: 2,
          goldTeam: 1,
          returning: 2,
          new: 1,
        },
      })
    }

    // Get all interest IDs
    const allIds = (await redis.smembers("ucd2025:interests:all")) as string[]

    if (!allIds.length) {
      return NextResponse.json({
        success: true,
        registrations: [],
        stats: {
          total: 0,
          pending: 0,
          approved: 0,
          rejected: 0,
          blueTeam: 0,
          goldTeam: 0,
          returning: 0,
          new: 0,
        },
      })
    }

    // Fetch all interests
    const interests = await Promise.all(
      allIds.map(async (id) => {
        const interest = await redis.hgetall(`ucd2025:interest:${id}`)
        return {
          id,
          ...interest,
        }
      }),
    )

    // Calculate stats
    const stats = {
      total: interests.length,
      pending: interests.filter((r) => r.status === "pending").length,
      approved: interests.filter((r) => r.status === "approved").length,
      rejected: interests.filter((r) => r.status === "rejected").length,
      blueTeam: interests.filter((r) => r.team === "Blue").length,
      goldTeam: interests.filter((r) => r.team === "Gold").length,
      returning: interests.filter(
        (r) =>
          r.previousExperience &&
          (r.previousExperience.includes("UCD 2024") || r.previousExperience.includes("2025 NHSCA Duals")),
      ).length,
      new: interests.filter((r) => !r.previousExperience || r.previousExperience.includes("No Previous Experience"))
        .length,
    }

    // Apply filters
    let filteredInterests = interests

    if (team && team !== "all") {
      filteredInterests = filteredInterests.filter((r) => r.team === team)
    }

    if (status && status !== "all") {
      filteredInterests = filteredInterests.filter((r) => r.status === status)
    }

    if (returning && returning !== "all") {
      const isReturning = returning === "true"
      filteredInterests = filteredInterests.filter((r) => {
        const hasExperience =
          r.previousExperience &&
          (r.previousExperience.includes("UCD 2024") || r.previousExperience.includes("2025 NHSCA Duals"))
        return isReturning ? hasExperience : !hasExperience
      })
    }

    return NextResponse.json({
      success: true,
      registrations: filteredInterests,
      stats,
    })
  } catch (error) {
    console.error("Error fetching interests:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch interests" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status, notes } = await request.json()

    if (isPreviewMode()) {
      console.log("Preview mode - status update would be saved:", { id, status, notes })
      return NextResponse.json({
        success: true,
        message: "Status updated successfully (preview mode)",
      })
    }

    // Update interest status
    await redis.hset(`ucd2025:interest:${id}`, {
      status,
      notes: notes || "",
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Interest status updated successfully",
    })
  } catch (error) {
    console.error("Error updating interest:", error)
    return NextResponse.json({ success: false, message: "Failed to update interest" }, { status: 500 })
  }
}
