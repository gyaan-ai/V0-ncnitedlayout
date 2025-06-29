// Minimal database layer - only what you need
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export interface Athlete {
  id: string
  first_name: string
  last_name: string
  weight_class?: number
  graduation_year?: number
  high_school?: string
  nc_united_team?: string
  is_committed: boolean
  college_committed?: string
  profile_image_url?: string
  ai_generated_bio?: string
}

// Only the functions you actually use
export async function getCommittedAthletes(): Promise<Athlete[]> {
  const { data, error } = await supabase.from("athletes").select("*").eq("is_committed", true).order("last_name")

  if (error) throw error
  return data || []
}

export async function getAthlete(id: string): Promise<Athlete | null> {
  const { data, error } = await supabase.from("athletes").select("*").eq("id", id).single()

  if (error) return null
  return data
}
