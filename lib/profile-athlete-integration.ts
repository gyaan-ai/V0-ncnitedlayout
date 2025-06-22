import { createClient } from "@/lib/supabase/client"

/**
 * Syncs a user's profile data to the athlete database
 * This ensures wrestler profiles appear in the recruiting system
 */
export async function syncUserProfileToAthlete(userId: string) {
  try {
    const supabase = createClient()

    // Get the user's profile
    const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (profileError || !profile) {
      throw new Error(`Profile not found: ${profileError?.message}`)
    }

    // Only sync wrestler profiles
    if (profile.role !== "wrestler") {
      console.log("Profile is not a wrestler, skipping sync")
      return
    }

    const roleData = profile.role_data || {}

    // Prepare athlete data
    const athleteData = {
      user_id: userId,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      high_school: roleData.high_school || "",
      graduation_year: roleData.graduation_year || new Date().getFullYear() + 4,
      weight_class: roleData.weight_class || "",
      gender: roleData.gender || "male",
      hometown: roleData.hometown || "",
      club_team: roleData.club_team || "",
      gpa: roleData.gpa || null,
      sat_score: roleData.sat_score || null,
      act_score: roleData.act_score || null,
      profile_photo_url: roleData.profile_photo_url || "",
      bio: roleData.bio || "",
      achievements: roleData.achievements || {},
      college_commit: roleData.college_commit || null,
      parent_contact: roleData.parent_contact || {},
      emergency_contact: roleData.emergency_contact || {},
      nc_united_teams: roleData.nc_united_teams || [],
      recruiting_permissions: roleData.recruiting_permissions || {},
      is_active: true,
      is_featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Check if athlete record already exists
    const { data: existingAthlete } = await supabase.from("athletes").select("id").eq("user_id", userId).single()

    if (existingAthlete) {
      // Update existing athlete record
      const { error: updateError } = await supabase
        .from("athletes")
        .update({
          ...athleteData,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)

      if (updateError) {
        throw new Error(`Failed to update athlete: ${updateError.message}`)
      }

      console.log("✅ Athlete record updated successfully")
    } else {
      // Create new athlete record
      const { error: insertError } = await supabase.from("athletes").insert(athleteData)

      if (insertError) {
        throw new Error(`Failed to create athlete: ${insertError.message}`)
      }

      console.log("✅ Athlete record created successfully")
    }

    return { success: true }
  } catch (error) {
    console.error("❌ Sync error:", error)
    throw error
  }
}

/**
 * Gets an athlete record by user ID
 */
export async function getAthleteByUserId(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("athletes").select("*").eq("user_id", userId).single()

  if (error) {
    console.error("Error fetching athlete:", error)
    return null
  }

  return data
}

/**
 * Gets a user profile by athlete ID
 */
export async function getUserProfileByAthleteId(athleteId: number) {
  const supabase = createClient()

  const { data: athlete, error: athleteError } = await supabase
    .from("athletes")
    .select("user_id")
    .eq("id", athleteId)
    .single()

  if (athleteError || !athlete?.user_id) {
    return null
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", athlete.user_id)
    .single()

  if (profileError) {
    console.error("Error fetching profile:", profileError)
    return null
  }

  return profile
}

/**
 * Checks if an athlete has a linked user account
 */
export async function hasLinkedAccount(athleteId: number): Promise<boolean> {
  const supabase = createClient()

  const { data, error } = await supabase.from("athletes").select("user_id").eq("id", athleteId).single()

  if (error || !data?.user_id) {
    return false
  }

  return true
}
