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

// Event type
export type CalendarEvent = {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  location: string
  type: "blue" | "gold" | "tournament"
  description?: string
  created_at: string
}

export type CalendarEventInput = Omit<CalendarEvent, "id" | "created_at">

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

// Sample data for preview mode
const PREVIEW_EVENTS: CalendarEvent[] = [
  {
    id: "preview-1",
    title: "NC United Blue Practice",
    date: "2025-01-15",
    startTime: "18:00",
    endTime: "20:00",
    location: "Elite Wrestling Academy",
    type: "blue",
    description: "Technical drilling and live wrestling",
    created_at: new Date().toISOString(),
  },
  {
    id: "preview-2",
    title: "NC United Gold Training",
    date: "2025-01-16",
    startTime: "17:30",
    endTime: "19:30",
    location: "NC State Wrestling Room",
    type: "gold",
    description: "Freestyle technique and conditioning",
    created_at: new Date().toISOString(),
  },
  {
    id: "preview-3",
    title: "NHSCA Duals Tournament",
    date: "2025-01-18",
    startTime: "09:00",
    endTime: "18:00",
    location: "Virginia Beach Sports Center",
    type: "tournament",
    description: "National high school wrestling tournament",
    created_at: new Date().toISOString(),
  },
  {
    id: "preview-4",
    title: "NC United Blue Practice",
    date: "2025-01-22",
    startTime: "18:00",
    endTime: "20:00",
    location: "Elite Wrestling Academy",
    type: "blue",
    description: "Match preparation and strategy",
    created_at: new Date().toISOString(),
  },
  {
    id: "preview-5",
    title: "NC United Gold Practice",
    date: "2025-01-23",
    startTime: "17:30",
    endTime: "19:30",
    location: "Greensboro College",
    type: "gold",
    description: "Women's freestyle development",
    created_at: new Date().toISOString(),
  },
  {
    id: "preview-6",
    title: "Ultimate Club Duals",
    date: "2025-01-25",
    startTime: "08:00",
    endTime: "20:00",
    location: "Chicago, IL",
    type: "tournament",
    description: "Premier club wrestling tournament",
    created_at: new Date().toISOString(),
  },
]

// GET - Fetch all calendar events
export async function GET() {
  try {
    if (isPreviewMode()) {
      return NextResponse.json({
        success: true,
        events: PREVIEW_EVENTS,
      })
    }

    const eventIds = (await redis.smembers("calendar:events:all")) as string[]
    if (!eventIds.length) {
      return NextResponse.json({
        success: true,
        events: [],
      })
    }

    const events = await Promise.all(
      eventIds.map(async (id) => {
        const event = await redis.hgetall(`calendar:event:${id}`)
        return {
          id,
          ...event,
        } as CalendarEvent
      }),
    )

    // Sort events by date
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return NextResponse.json({
      success: true,
      events,
    })
  } catch (error) {
    console.error("Error fetching calendar events:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch calendar events",
        events: PREVIEW_EVENTS, // Fallback to preview data
      },
      { status: 500 },
    )
  }
}

// POST - Create a new calendar event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, date, startTime, endTime, location, type, description } = body

    // Validate required fields
    if (!title || !date || !startTime || !endTime || !location || !type) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Validate event type
    if (!["blue", "gold", "tournament"].includes(type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid event type",
        },
        { status: 400 },
      )
    }

    if (isPreviewMode()) {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot create events in preview mode",
        },
        { status: 403 },
      )
    }

    const id = generateId()
    const newEvent: CalendarEvent = {
      id,
      title,
      date,
      startTime,
      endTime,
      location,
      type,
      description: description || "",
      created_at: new Date().toISOString(),
    }

    // Store event in Redis
    await redis.hset(`calendar:event:${id}`, newEvent)
    await redis.sadd("calendar:events:all", id)

    return NextResponse.json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    })
  } catch (error) {
    console.error("Error creating calendar event:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create calendar event",
      },
      { status: 500 },
    )
  }
}

// DELETE - Delete a calendar event
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get("id")

    if (!eventId) {
      return NextResponse.json(
        {
          success: false,
          error: "Event ID is required",
        },
        { status: 400 },
      )
    }

    if (isPreviewMode()) {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot delete events in preview mode",
        },
        { status: 403 },
      )
    }

    // Remove event from Redis
    await redis.del(`calendar:event:${eventId}`)
    await redis.srem("calendar:events:all", eventId)

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting calendar event:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete calendar event",
      },
      { status: 500 },
    )
  }
}
