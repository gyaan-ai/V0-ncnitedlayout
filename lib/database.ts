import { createClient } from "@supabase/supabase-js"

// Single source of truth for database connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side client with full permissions
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Client-side client for browser usage
export const supabaseClient = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Core database types
export interface Athlete {
  id: string
  first_name: string
  last_name: string
  weight_class?: number
  grade?: string
  high_school?: string
  club_team?: string
  nc_united_team?: "blue" | "gold" | "red" | "white" | "black" | null

  // Commitment info
  committed: boolean
  commitment_date?: string
  committed_school?: string
  commitment_level?: "D1" | "D2" | "D3" | "NAIA" | "JUCO"

  // Profile data
  profile_image_url?: string
  bio?: string
  ai_generated_summary?: string

  // Social/Contact
  instagram_handle?: string
  twitter_handle?: string
  youtube_highlight_url?: string

  // Metadata
  created_at: string
  updated_at: string
}

export interface Logo {
  id: string
  institution_name: string
  logo_url: string
  aliases: string[]
  institution_type: "college" | "high_school" | "club" | "team"
  created_at: string
}

// Core database operations
export class Database {
  // Athletes
  static async getAthletes(filters?: {
    committed?: boolean
    nc_united_team?: string
    limit?: number
  }): Promise<Athlete[]> {
    let query = supabaseAdmin.from("athletes").select("*").order("last_name", { ascending: true })

    if (filters?.committed !== undefined) {
      query = query.eq("committed", filters.committed)
    }

    if (filters?.nc_united_team) {
      query = query.eq("nc_united_team", filters.nc_united_team)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  }

  static async getAthleteById(id: string): Promise<Athlete | null> {
    const { data, error } = await supabaseAdmin.from("athletes").select("*").eq("id", id).single()

    if (error) return null
    return data
  }

  static async createAthlete(athlete: Omit<Athlete, "id" | "created_at" | "updated_at">): Promise<Athlete> {
    const { data, error } = await supabaseAdmin
      .from("athletes")
      .insert({
        ...athlete,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateAthlete(id: string, updates: Partial<Athlete>): Promise<Athlete> {
    const { data, error } = await supabaseAdmin
      .from("athletes")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteAthlete(id: string): Promise<void> {
    const { error } = await supabaseAdmin.from("athletes").delete().eq("id", id)

    if (error) throw error
  }

  // Logos
  static async getLogoByInstitution(institutionName: string): Promise<Logo | null> {
    const { data, error } = await supabaseAdmin
      .from("logos")
      .select("*")
      .or(`institution_name.ilike.%${institutionName}%,aliases.cs.{${institutionName}}`)
      .limit(1)
      .single()

    if (error) return null
    return data
  }

  static async createLogo(logo: Omit<Logo, "id" | "created_at">): Promise<Logo> {
    const { data, error } = await supabaseAdmin
      .from("logos")
      .insert({
        ...logo,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}
