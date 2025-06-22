import { type NextRequest, NextResponse } from "next/server"
import { list } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { logos } = body

    if (!logos || !Array.isArray(logos)) {
      return NextResponse.json({ success: false, error: "Logos array required" }, { status: 400 })
    }

    const urls: Record<string, string> = {}

    // List all blobs to find our logos
    const { blobs } = await list()

    for (const logoRequest of logos) {
      const { type, path } = logoRequest

      // Find the blob that matches this path
      const matchingBlob = blobs.find((blob) => blob.pathname.includes(path))

      if (matchingBlob) {
        urls[type] = matchingBlob.url
        console.log(`Found ${type} logo:`, matchingBlob.url)
      } else {
        console.log(`No blob found for ${type} with path ${path}`)
      }
    }

    return NextResponse.json({
      success: true,
      urls,
      totalBlobs: blobs.length,
      foundLogos: Object.keys(urls).length,
    })
  } catch (error) {
    console.error("Error fetching logo URLs:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch logo URLs",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
