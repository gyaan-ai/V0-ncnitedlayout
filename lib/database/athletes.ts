import { supabaseAdmin } from "./client"
import type { Athlete, AthleteFilters, AthleteFormData, PaginatedResponse } from "./types"

export class AthleteService {
  // Get all athletes with optional filtering
  static async getAthletes(filters: AthleteFilters = {}): Promise<PaginatedResponse<Athlete>> {
    let query = supabaseAdmin
      .from("athletes")
      .select("*", { count: "exact" })
      .eq("is_active", true)
      .order("last_name", { ascending: true })

    // Apply filters
    if (filters.nc_united_team) {
      query = query.eq("nc_united_team", filters.nc_united_team)
    }

    if (filters.graduation_year) {
      query = query.eq("graduation_year", filters.graduation_year)
    }

    if (filters.weight_class) {
      query = query.eq("weight_class", filters.weight_class)
    }

    if (filters.is_committed !== undefined) {
      query = query.eq("is_committed", filters.is_committed)
    }

    if (filters.is_featured !== undefined) {
      query = query.eq("is_featured", filters.is_featured)
    }

    if (filters.search) {
      query = query.or(
        `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,high_school.ilike.%${filters.search}%`,
      )
    }

    // Pagination
    const limit = filters.limit || 50
    const offset = filters.offset || 0
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      throw new Error(`Failed to fetch athletes: ${error.message}`)
    }

    return {
      data: data || [],
      total: count || 0,
      page: Math.floor(offset / limit) + 1,
      limit,
      hasMore: (count || 0) > offset + limit,
    }
  }

  // Get single athlete by ID
  static async getAthleteById(id: string): Promise<Athlete | null> {
    const { data, error } = await supabaseAdmin.from("athletes").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") return null // Not found
      throw new Error(`Failed to fetch athlete: ${error.message}`)
    }

    return data
  }

  // Get athlete by profile ID
  static async getAthleteByProfileId(profileId: string): Promise<Athlete | null> {
    const { data, error } = await supabaseAdmin.from("athletes").select("*").eq("profile_id", profileId).single()

    if (error) {
      if (error.code === "PGRST116") return null // Not found
      throw new Error(`Failed to fetch athlete: ${error.message}`)
    }

    return data
  }

  // Create new athlete
  static async createAthlete(athleteData: AthleteFormData): Promise<Athlete> {
    const { data, error } = await supabaseAdmin.from("athletes").insert(athleteData).select().single()

    if (error) {
      throw new Error(`Failed to create athlete: ${error.message}`)
    }

    return data
  }

  // Update athlete
  static async updateAthlete(id: string, updates: Partial<AthleteFormData>): Promise<Athlete> {
    const { data, error } = await supabaseAdmin.from("athletes").update(updates).eq("id", id).select().single()

    if (error) {
      throw new Error(`Failed to update athlete: ${error.message}`)
    }

    return data
  }

  // Delete athlete (soft delete)
  static async deleteAthlete(id: string): Promise<void> {
    const { error } = await supabaseAdmin.from("athletes").update({ is_active: false }).eq("id", id)

    if (error) {
      throw new Error(`Failed to delete athlete: ${error.message}`)
    }
  }

  // Get featured athletes
  static async getFeaturedAthletes(limit = 10): Promise<Athlete[]> {
    const { data, error } = await supabaseAdmin
      .from("athletes")
      .select("*")
      .eq("is_featured", true)
      .eq("is_active", true)
      .eq("is_public", true)
      .order("updated_at", { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to fetch featured athletes: ${error.message}`)
    }

    return data || []
  }

  // Get committed athletes
  static async getCommittedAthletes(limit = 20): Promise<Athlete[]> {
    const { data, error } = await supabaseAdmin
      .from("athletes")
      .select("*")
      .eq("is_committed", true)
      .eq("is_active", true)
      .eq("is_public", true)
      .order("commitment_date", { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to fetch committed athletes: ${error.message}`)
    }

    return data || []
  }

  // Get team roster
  static async getTeamRoster(team: string): Promise<Athlete[]> {
    const { data, error } = await supabaseAdmin
      .from("athletes")
      .select("*")
      .eq("nc_united_team", team)
      .eq("is_active", true)
      .order("weight_class", { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch team roster: ${error.message}`)
    }

    return data || []
  }

  // Search athletes
  static async searchAthletes(searchTerm: string, limit = 20): Promise<Athlete[]> {
    const { data, error } = await supabaseAdmin
      .from("athletes")
      .select("*")
      .or(
        `first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,high_school.ilike.%${searchTerm}%,college_committed.ilike.%${searchTerm}%`,
      )
      .eq("is_active", true)
      .eq("is_public", true)
      .order("last_name", { ascending: true })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to search athletes: ${error.message}`)
    }

    return data || []
  }
}
