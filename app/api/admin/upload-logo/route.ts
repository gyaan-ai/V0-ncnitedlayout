import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const targetPath = formData.get("path") as string

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 })
    }

    if (!targetPath) {
      return NextResponse.json({ success: false, message: "No target path provided" }, { status: 400 })
    }

    // Upload to Vercel Blob storage
    const blob = await put(targetPath, file, {
      access: "public",
    })

    return NextResponse.json({
      success: true,
      message: "Logo uploaded successfully",
      path: blob.url,
      publicPath: targetPath,
    })
  } catch (error) {
    console.error("Logo upload error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 },
    )
  }
}
