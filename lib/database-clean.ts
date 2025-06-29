import { createClient } from "@supabase/supabase-js"

// Single database connection
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Clean types
export interface Athlete {
  id: string
  first_name: string
  last_name: string
  email?: string
  weight_class?: number
  graduation_year?: number
  high_school?: string
  nc_united_team?: "Blue" | "Gold" | "Red" | "White" | "Black"
  is_committed: boolean
  college_committed?: string
  profile_image_url?: string
  ai_generated_headline?: string
  ai_generated_bio?: string
  achievements?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Logo {
  id: string
  institution_name: string
  logo_url: string
  aliases: string[]
  institution_type: "college" | "high_school" | "club" | "team"
}

// Clean database operations
export class DB {
  // Athletes
  static async getAthletes(filters?: {
    committed?: boolean
    nc_united_team?: string
    limit?: number
  }) {
    let query = supabase.from("athletes").select("*").eq("is_active", true).order("last_name")

    if (filters?.committed !== undefined) {
      query = query.eq("is_committed", filters.committed)
    }

    if (filters?.nc_united_team) {
      query = query.eq("nc_united_team", filters.nc_united_team)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Athlete[]
  }

  static async getAthlete(id: string) {
    const { data, error } = await supabase.from("athletes").select("*").eq("id", id).single()

    if (error) throw error
    return data as Athlete
  }

  static async createAthlete(athlete: Omit<Athlete, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("athletes").insert(athlete).select().single()

    if (error) throw error
    return data as Athlete
  }

  static async updateAthlete(id: string, updates: Partial<Athlete>) {
    const { data, error } = await supabase.from("athletes").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data as Athlete
  }

  // Logos
  static async getLogo(institutionName: string) {
    const { data, error } = await supabase
      .from("logos")
      .select("*")
      .or(`institution_name.ilike.%${institutionName}%,aliases.cs.{${institutionName}}`)
      .limit(1)
      .single()

    if (error) return null
    return data as Logo
  }
}
