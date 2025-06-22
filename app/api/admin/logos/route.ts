import { type NextRequest, NextResponse } from "next/server"
import { createLogo, getAllLogos } from "@/lib/logo-management"

export async function POST(request: NextRequest) {
  try {
    console.log("🔄 POST /api/admin/logos - Creating new logo")
    const logoData = await request.json()
    console.log("📝 Logo data received:", logoData)

    // Validate required fields
    if (!logoData.display_name || !logoData.type || !logoData.file_url) {
      console.log("❌ Missing required fields")
      return NextResponse.json(
        { success: false, error: "Missing required fields: display_name, type, file_url" },
        { status: 400 },
      )
    }

    const newLogo = await createLogo(logoData)
    console.log("✅ Logo created successfully:", newLogo)

    return NextResponse.json({ success: true, logo: newLogo })
  } catch (error) {
    console.error("❌ Error creating logo:", error)
    return NextResponse.json({ success: false, error: `Failed to create logo: ${error.message}` }, { status: 500 })
  }
}

export async function GET() {
  try {
    console.log("🔄 GET /api/admin/logos - Fetching all logos")
    const logos = await getAllLogos()
    console.log(`✅ Found ${logos?.length || 0} logos`)

    return NextResponse.json({ success: true, logos: logos || [] })
  } catch (error) {
    console.error("❌ Error fetching logos:", error)
    return NextResponse.json({ success: false, error: `Failed to fetch logos: ${error.message}` }, { status: 500 })
  }
}
