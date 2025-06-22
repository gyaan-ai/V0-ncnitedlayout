import { supabase } from "./supabase-only"

export async function getCommits() {
  try {
    const { data: commits, error } = await supabase
      .from("athletes")
      .select("*")
      .eq("is_committed", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return commits || []
  } catch (error) {
    console.error("Error fetching commits:", error)
    return []
  }
}

export async function getAthletes() {
  try {
    const { data: athletes, error } = await supabase
      .from("athletes")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return athletes || []
  } catch (error) {
    console.error("Error fetching athletes:", error)
    return []
  }
}

export async function getAthleteById(id: string) {
  try {
    const { data: athlete, error } = await supabase.from("athletes").select("*").eq("id", id).single()

    if (error) throw error
    return athlete
  } catch (error) {
    console.error("Error fetching athlete:", error)
    return null
  }
}
