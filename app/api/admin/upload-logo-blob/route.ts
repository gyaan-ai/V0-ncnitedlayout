import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const path = formData.get("path") as string
    const filename = formData.get("filename") as string

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    if (!path || !filename) {
      return NextResponse.json({ success: false, error: "Path and filename required" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(`${path}${filename}`, file, {
      access: "public",
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      path: `${path}${filename}`,
      message: "Logo uploaded successfully",
    })
  } catch (error) {
    console.error("Logo upload error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
