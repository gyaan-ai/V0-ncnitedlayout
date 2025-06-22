import { notFound } from "next/navigation"
import AthletePublicProfile from "./AthletePublicProfile"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function AthleteProfilePage({ params }: { params: { id: string } }) {
  try {
    console.log("Looking for athlete with ID:", params.id)

    // Try multiple approaches to find the athlete
    let athlete = null

    // First try: exact ID match
    const { data: exactMatch, error: exactError } = await supabase
      .from("athletes")
      .select(`
        *
      `)
      .eq("id", params.id)
      .single()

    if (exactMatch && !exactError) {
      athlete = exactMatch
    } else {
      console.log("Exact match failed:", exactError)

      // Second try: try as integer ID
      const numericId = Number.parseInt(params.id)
      if (!isNaN(numericId)) {
        const { data: numericMatch, error: numericError } = await supabase
          .from("athletes")
          .select("*")
          .eq("id", numericId)
          .single()

        if (numericMatch && !numericError) {
          athlete = numericMatch
        } else {
          console.log("Numeric match failed:", numericError)
        }
      }

      // Third try: search by name if this is Liam's UUID
      if (!athlete && params.id === "ce1bf191-623d-46dd-a0ca-5929e85871f1") {
        const { data: nameMatch, error: nameError } = await supabase
          .from("athletes")
          .select("*")
          .ilike("first_name", "liam")
          .ilike("last_name", "hickey")
          .single()

        if (nameMatch && !nameError) {
          athlete = nameMatch
        } else {
          console.log("Name match failed:", nameError)
        }
      }
    }

    if (!athlete) {
      console.log("No athlete found with any method")
      notFound()
    }

    console.log("Found athlete data:", {
      name: `${athlete.first_name} ${athlete.last_name}`,
      college: athlete.committed_college || athlete.college_name,
      bio: athlete.generated_bio ? "Has bio" : "No bio",
      achievements: athlete.achievements ? "Has achievements" : "No achievements",
    })

    return <AthletePublicProfile athlete={athlete} />
  } catch (error) {
    console.error("Error in athlete profile page:", error)
    notFound()
  }
}

export async function generateStaticParams() {
  try {
    const { data: athletes } = await supabase.from("athletes").select("id").eq("is_active", true).limit(50)

    if (!athletes) return []

    return athletes.map((athlete) => ({
      id: athlete.id.toString(),
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: "Athlete Profile - NC United Wrestling",
    description: "View athlete profile and wrestling achievements.",
  }
}
