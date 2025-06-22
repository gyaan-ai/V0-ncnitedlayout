import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name")
    const type = searchParams.get("type")

    if (!name) {
      return NextResponse.json({ success: false, error: "Name parameter required" })
    }

    console.log(`🔍 Looking for logo: "${name}", type: ${type || "any"}`)

    // Get ALL active logos first
    const { data: allLogos, error } = await supabase.from("logo_library").select("*").eq("is_active", true)

    if (error) {
      console.error("❌ Database error:", error)
      return NextResponse.json({ success: false, error: "Database error" })
    }

    console.log(`📋 Found ${allLogos.length} total logos`)

    // Simple matching logic - exactly like Corinth Holders works
    for (const logo of allLogos) {
      console.log(`🔍 Checking: ${logo.name} (type: ${logo.type})`)

      // Skip if type doesn't match (when type is specified)
      if (type && type !== "any" && logo.type !== type) {
        console.log(`⏭️ Skipping ${logo.name} - type mismatch (${logo.type} vs ${type})`)
        continue
      }

      // Check exact name match (case insensitive)
      if (logo.name.toLowerCase() === name.toLowerCase()) {
        console.log(`✅ EXACT MATCH: ${logo.name}`)
        return NextResponse.json({
          success: true,
          logo: {
            id: logo.id,
            name: logo.name,
            display_name: logo.display_name || logo.name,
            type: logo.type,
            file_url: logo.logo_url,
            aliases: logo.aliases || [],
          },
        })
      }

      // Check aliases
      if (logo.aliases && Array.isArray(logo.aliases)) {
        for (const alias of logo.aliases) {
          if (alias.toLowerCase() === name.toLowerCase()) {
            console.log(`✅ ALIAS MATCH: ${logo.name} (alias: ${alias})`)
            return NextResponse.json({
              success: true,
              logo: {
                id: logo.id,
                name: logo.name,
                display_name: logo.display_name || logo.name,
                type: logo.type,
                file_url: logo.logo_url,
                aliases: logo.aliases || [],
              },
            })
          }
        }
      }
    }

    console.log(`❌ No match found for "${name}"`)
    return NextResponse.json({ success: false, error: "Logo not found" })
  } catch (error) {
    console.error("❌ API Error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" })
  }
}
