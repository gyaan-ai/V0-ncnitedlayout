import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get("file") as File

    // Handle different upload types
    const category = form.get("category") as string // For existing uploads
    const name = form.get("name") as string // For existing uploads
    const userId = form.get("userId") as string // For profile uploads
    const type = form.get("type") as string // For profile uploads (e.g., 'commit', 'profile')

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    let filename: string

    if (category && name) {
      // Existing upload format (for tournaments, etc.)
      const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, "-")
      filename = `${category}/${cleanName}-${Date.now()}.${file.name.split(".").pop()}`
    } else if (userId && type) {
      // New profile upload format
      const fileExt = file.name.split(".").pop()
      filename = `profiles/${type}/${userId}-${type}-${Date.now()}.${fileExt}`
    } else {
      // Fallback format
      const fileExt = file.name.split(".").pop()
      filename = `uploads/${Date.now()}.${fileExt}`
    }

    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false, // We're already adding a timestamp
    })

    return NextResponse.json({ success: true, url: blob.url })
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
