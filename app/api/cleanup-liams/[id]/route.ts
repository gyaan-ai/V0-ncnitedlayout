import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    await sql`
      DELETE FROM athletes 
      WHERE id = ${params.id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting Liam:", error)
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 })
  }
}
