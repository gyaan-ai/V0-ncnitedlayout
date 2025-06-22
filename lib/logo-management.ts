import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export interface Logo {
  id: number
  name: string
  display_name: string
  type: "college" | "high_school" | "club" | "team"
  file_url: string
  file_name: string
  aliases: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface LogoInput {
  name: string
  display_name: string
  type: "college" | "high_school" | "club" | "team"
  file_url: string
  file_name: string
  aliases?: string[]
}

// Get all logos by type
export async function getLogosByType(type: string) {
  try {
    console.log(`🔍 Fetching logos by type: ${type}`)
    const { data, error } = await supabase
      .from("logo_library")
      .select("*")
      .eq("type", type)
      .eq("is_active", true)
      .order("display_name")

    if (error) {
      console.error(`❌ Error fetching logos by type ${type}:`, error)
      throw error
    }

    console.log(`✅ Found ${data.length} logos for type: ${type}`)
    return data as Logo[]
  } catch (error) {
    console.error(`❌ Error fetching logos by type ${type}:`, error)
    throw error
  }
}

// Get all logos
export async function getAllLogos() {
  try {
    console.log("🔍 Fetching all logos from database")

    const { data, error } = await supabase
      .from("logo_library")
      .select("*")
      .eq("is_active", true)
      .order("type", { ascending: true })
      .order("display_name", { ascending: true })

    if (error) {
      console.error("❌ Error fetching all logos:", error)
      // If table doesn't exist, return empty array
      if (error.code === "PGRST116" || error.message.includes("does not exist")) {
        console.log("⚠️ logo_library table does not exist")
        return []
      }
      throw error
    }

    console.log(`✅ Successfully fetched ${data.length} logos`)
    console.log(
      "📊 Logos:",
      data.map((r) => ({ id: r.id, display_name: r.display_name, type: r.type })),
    )

    return data as Logo[]
  } catch (error) {
    console.error("❌ Error fetching all logos:", error)
    return []
  }
}

// Create new logo
export async function createLogo(logo: LogoInput) {
  try {
    console.log("🔄 Creating new logo:", logo)

    // Generate name if not provided
    const logoName = logo.name || logo.display_name.toLowerCase().replace(/[^a-z0-9]/g, "-")

    const { data, error } = await supabase
      .from("logo_library")
      .insert([
        {
          name: logoName,
          display_name: logo.display_name,
          type: logo.type,
          file_url: logo.file_url,
          file_name: logo.file_name,
          aliases: logo.aliases || [],
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .select("*")

    if (error) {
      console.error("❌ Error creating logo:", error)
      throw error
    }

    console.log("✅ Logo created successfully:", data![0])
    return data![0] as Logo
  } catch (error) {
    console.error("❌ Error creating logo:", error)
    throw error
  }
}

// Update logo
export async function updateLogo(id: number, updates: Partial<LogoInput>) {
  try {
    console.log(`🔄 Updating logo ${id}:`, updates)

    const { data, error } = await supabase
      .from("logo_library")
      .update({ ...updates, updated_at: new Date() })
      .eq("id", id)
      .select("*")

    if (error) {
      console.error(`❌ Error updating logo ${id}:`, error)
      throw error
    }

    if (!data || data.length === 0) {
      console.log("⚠️ No fields to update")
      return null
    }

    console.log("✅ Logo updated successfully:", data[0])
    return data[0] as Logo
  } catch (error) {
    console.error(`❌ Error updating logo ${id}:`, error)
    throw error
  }
}

// Delete logo (soft delete)
export async function deleteLogo(id: number) {
  try {
    console.log(`🔄 Deleting logo ${id}`)

    const { data, error } = await supabase
      .from("logo_library")
      .update({ is_active: false, updated_at: new Date() })
      .eq("id", id)
      .select("*")

    if (error) {
      console.error(`❌ Error deleting logo ${id}:`, error)
      throw error
    }

    console.log("✅ Logo deleted successfully:", data![0])
    return data![0] as Logo
  } catch (error) {
    console.error(`❌ Error deleting logo ${id}:`, error)
    throw error
  }
}

// Simplified logo lookup - no fuzzy matching
export async function findLogoByName(name: string, type?: string) {
  try {
    console.log(`🔍 Simple logo lookup: "${name}", type: ${type || "any"}`)

    let query = supabase.from("logo_library").select("*").eq("is_active", true).ilike("display_name", name).limit(1)

    if (type) {
      query = query.eq("type", type)
    }

    const { data, error } = await query

    if (error) {
      console.error(`❌ Error finding logo: ${error}`)
      return undefined
    }

    if (data && data.length > 0) {
      console.log(`✅ Found logo: ${data[0].display_name}`)
      return data[0] as Logo
    }

    console.log(`❌ No logo found for "${name}"`)
    return undefined
  } catch (error) {
    console.error(`❌ Error finding logo: ${error}`)
    return undefined
  }
}

// Auto-match logos for athlete
export async function getLogosForAthlete(collegeName?: string, highSchool?: string, club?: string) {
  const logos = {
    college: null as Logo | null,
    high_school: null as Logo | null,
    club: null as Logo | null,
  }

  try {
    if (collegeName) {
      console.log(`🏛️ Looking for college logo: "${collegeName}"`)
      logos.college = await findLogoByName(collegeName, "college")
      if (logos.college) {
        console.log(`✅ Found college logo: ${logos.college.display_name}`)
      } else {
        console.log(`❌ No college logo found for: "${collegeName}"`)
      }
    }

    if (highSchool) {
      console.log(`🏫 Looking for high school logo: "${highSchool}"`)
      logos.high_school = await findLogoByName(highSchool, "high_school")
      if (logos.high_school) {
        console.log(`✅ Found high school logo: ${logos.high_school.display_name}`)
      } else {
        console.log(`❌ No high school logo found for: "${highSchool}"`)
      }
    }

    if (club) {
      console.log(`🤼 Looking for club logo: "${club}"`)
      logos.club = await findLogoByName(club, "club")
      if (logos.club) {
        console.log(`✅ Found club logo: ${logos.club.display_name}`)
      } else {
        console.log(`❌ No club logo found for: "${club}"`)
      }
    }

    return logos
  } catch (error) {
    console.error("❌ Error getting logos for athlete:", error)
    return logos
  }
}

// Generate standardized file name
export function generateLogoFileName(displayName: string, type: string): string {
  const normalized = displayName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/high-school/g, "hs") // Shorten high school
    .replace(/university/g, "univ") // Shorten university
    .replace(/college/g, "coll") // Shorten college

  return `${normalized}.png`
}

// Get logo statistics
export async function getLogoStats() {
  try {
    console.log("📊 Fetching logo statistics")

    // Get all logos and calculate stats in JavaScript since Supabase aggregation is complex
    const { data, error } = await supabase.from("logo_library").select("type, is_active")

    if (error) {
      console.error("❌ Error fetching logo stats:", error)
      return {}
    }

    const stats = data.reduce(
      (acc, row) => {
        if (!acc[row.type]) {
          acc[row.type] = { total: 0, active: 0 }
        }
        acc[row.type].total++
        if (row.is_active) {
          acc[row.type].active++
        }
        return acc
      },
      {} as Record<string, { total: number; active: number }>,
    )

    console.log("✅ Logo stats:", stats)
    return stats
  } catch (error) {
    console.error("❌ Error fetching logo stats:", error)
    return {}
  }
}
