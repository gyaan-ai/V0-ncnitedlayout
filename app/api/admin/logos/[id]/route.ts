import { type NextRequest, NextResponse } from "next/server"
import { updateLogo, deleteLogo } from "@/lib/logo-management"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const logoData = await request.json()
    const logoId = Number.parseInt(params.id)

    const updatedLogo = await updateLogo(logoId, logoData)

    if (!updatedLogo) {
      return NextResponse.json({ success: false, error: "Logo not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, logo: updatedLogo })
  } catch (error) {
    console.error("Error updating logo:", error)
    return NextResponse.json({ success: false, error: "Failed to update logo" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const logoId = Number.parseInt(params.id)
    const deletedLogo = await deleteLogo(logoId)

    if (!deletedLogo) {
      return NextResponse.json({ success: false, error: "Logo not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Logo deleted successfully" })
  } catch (error) {
    console.error("Error deleting logo:", error)
    return NextResponse.json({ success: false, error: "Failed to delete logo" }, { status: 500 })
  }
}
