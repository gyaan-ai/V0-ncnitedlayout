import { NextResponse } from "next/server"
import { getAllLogos, getLogoStats } from "@/lib/logo-management"

export async function GET() {
  try {
    console.log("📊 Fetching logo statistics...")

    const [logos, stats] = await Promise.all([getAllLogos(), getLogoStats()])

    // Calculate additional stats
    const totalLogos = logos.length
    const logosByType = logos.reduce(
      (acc, logo) => {
        acc[logo.type] = (acc[logo.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const workingLogos = logos.filter(
      (logo) => logo.file_url && logo.file_url.includes("blob.vercel-storage.com"),
    ).length

    return NextResponse.json({
      success: true,
      stats: {
        total: totalLogos,
        working: workingLogos,
        byType: logosByType,
        detailed: stats,
      },
      logos: logos.map((logo) => ({
        id: logo.id,
        display_name: logo.display_name,
        type: logo.type,
        aliases_count: logo.aliases.length,
        has_blob_url: logo.file_url.includes("blob.vercel-storage.com"),
      })),
    })
  } catch (error) {
    console.error("❌ Error fetching logo stats:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch logo statistics" }, { status: 500 })
  }
}
