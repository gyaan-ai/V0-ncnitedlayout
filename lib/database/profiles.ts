import { supabaseAdmin } from "./client"
import type { Profile, UserRole, ProfileFormData } from "./types"

export class ProfileService {
  // Get profile by ID
  static async getProfileById(id: string): Promise<Profile | null> {
    const { data, error } = await supabaseAdmin.from("profiles").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") return null // Not found
      throw new Error(`Failed to fetch profile: ${error.message}`)
    }

    return data
  }

  // Get profile by email
  static async getProfileByEmail(email: string): Promise<Profile | null> {
    const { data, error } = await supabaseAdmin.from("profiles").select("*").eq("email", email).single()

    if (error) {
      if (error.code === "PGRST116") return null // Not found
      throw new Error(`Failed to fetch profile: ${error.message}`)
    }

    return data
  }

  // Create new profile
  static async createProfile(profileData: ProfileFormData & { id: string }): Promise<Profile> {
    const { data, error } = await supabaseAdmin.from("profiles").insert(profileData).select().single()

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`)
    }

    return data
  }

  // Update profile
  static async updateProfile(id: string, updates: Partial<ProfileFormData>): Promise<Profile> {
    const { data, error } = await supabaseAdmin.from("profiles").update(updates).eq("id", id).select().single()

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`)
    }

    return data
  }

  // Get profiles by role
  static async getProfilesByRole(role: UserRole): Promise<Profile[]> {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("role", role)
      .eq("is_active", true)
      .order("last_name", { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch profiles: ${error.message}`)
    }

    return data || []
  }

  // Get all coaches
  static async getCoaches(): Promise<Profile[]> {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .in("role", ["college_coach", "hs_coach", "club_coach"])
      .eq("is_active", true)
      .order("last_name", { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch coaches: ${error.message}`)
    }

    return data || []
  }

  // Deactivate profile
  static async deactivateProfile(id: string): Promise<void> {
    const { error } = await supabaseAdmin.from("profiles").update({ is_active: false }).eq("id", id)

    if (error) {
      throw new Error(`Failed to deactivate profile: ${error.message}`)
    }
  }
}
