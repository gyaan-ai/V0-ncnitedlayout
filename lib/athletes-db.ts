import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient(supabaseUrl, supabaseKey)

export async function getAthletes() {
  try {
    const { data: athletes, error } = await supabase.from("athletes").select("*")

    if (error) {
      console.error("Error fetching athletes:", error)
      return []
    }

    return athletes || []
  } catch (error) {
    console.error("Unexpected error fetching athletes:", error)
    return []
  }
}

export async function getAthlete(id: string) {
  try {
    const { data: athlete, error } = await supabase.from("athletes").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching athlete with id ${id}:`, error)
      return null
    }

    return athlete || null
  } catch (error) {
    console.error(`Unexpected error fetching athlete with id ${id}:`, error)
    return null
  }
}

export async function createAthlete(firstName: string, lastName: string, dateOfBirth: string, sport: string) {
  try {
    const { data: newAthlete, error } = await supabase
      .from("athletes")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          sport: sport,
        },
      ])
      .select()

    if (error) {
      console.error("Error creating athlete:", error)
      return null
    }

    return newAthlete ? newAthlete[0] : null
  } catch (error) {
    console.error("Unexpected error creating athlete:", error)
    return null
  }
}

export async function updateAthlete(
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  sport: string,
) {
  try {
    const { data: updatedAthlete, error } = await supabase
      .from("athletes")
      .update({
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        sport: sport,
      })
      .eq("id", id)
      .select()

    if (error) {
      console.error(`Error updating athlete with id ${id}:`, error)
      return null
    }

    return updatedAthlete ? updatedAthlete[0] : null
  } catch (error) {
    console.error(`Unexpected error updating athlete with id ${id}:`, error)
    return null
  }
}

export async function deleteAthlete(id: string) {
  try {
    const { error } = await supabase.from("athletes").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting athlete with id ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Unexpected error deleting athlete with id ${id}:`, error)
    return false
  }
}
